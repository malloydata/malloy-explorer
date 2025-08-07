/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

export interface WriteStream {
  write: (text: string) => void;
  close: () => void;
}

export abstract class DataWriter {
  constructor(
    readonly stream: WriteStream,
    readonly result: Malloy.Result
  ) {}

  abstract process(
    data: AsyncIterableIterator<Malloy.DataWithRecordCell>
  ): Promise<void>;
}

export class JSONWriter extends DataWriter {
  async process(
    data: AsyncIterableIterator<Malloy.DataWithRecordCell>
  ): Promise<void> {
    this.stream.write('[\n');
    for await (const row of data) {
      const json = JSON.stringify(
        toObject(this.result.schema, row.record_value),
        null,
        2
      );
      const jsonLines = json.split('\n');
      for (let i = 0; i < jsonLines.length; i++) {
        const line = jsonLines[i];
        this.stream.write(`  ${line}`);
        if (i < jsonLines.length - 1) {
          this.stream.write('\n');
        }
      }
      this.stream.write(',\n');
    }
    this.stream.write('\n]\n');
    this.stream.close();
  }
}

// Represents a csv cell/table.
type CellMatrix = {
  rows: string[];
  length: number;
  width: number;
};

/**
 * CSV writer class that handles nested data.
 * This writer creates CSV using a DFS traversal of the result dataset.
 * Each trivial column value is converted to a CSV of 1x1 matrix and all the
 * columns are merged together to create a CSV that represents 1 QueryDataRow.
 * Since this follows DFS, each non trivial data is rendered into a NxM matrix
 * where N is the number of rows in the nested data and M is the number of
 * columns it has.
 * For any row with X number of columns, we end up with X number of NxM matrices
 * where the value of N,M pair may be different for each column.
 * We then merge the matrices so that we end up with a larger matrix of size
 * Max(N)xSum(M) by taking one row of csv from each matrix at a time. For any
 * matrix with N<Max(N), we add a row of empty CSV cells of size N.
 */
export class CSVWriter extends DataWriter {
  private readonly columnSeparator = ',';
  private readonly rowSeparator = '\n';
  private readonly quoteCharacter = '"';
  private readonly includeHeader = true;
  private readonly emptyCell = '';

  private escape(value: string) {
    const hasInnerQuote = value.includes(this.quoteCharacter);
    const hasInnerCommas = value.includes(this.columnSeparator);
    const hasNewline = value.includes(this.rowSeparator);
    const needsQuoting = hasInnerCommas || hasInnerQuote || hasNewline;
    if (hasInnerQuote) {
      value = value.replace(
        new RegExp(this.quoteCharacter, 'g'),
        this.quoteCharacter + this.quoteCharacter
      );
    }

    if (needsQuoting) {
      value = this.quoteCharacter + value + this.quoteCharacter;
    }

    return value;
  }

  // Re-using the old stringify method for sanity.
  private stringify(value: Malloy.Cell): string {
    switch (value.kind) {
      case 'string_cell':
        return this.escape(value.string_value);
      case 'boolean_cell':
        return JSON.stringify(value.boolean_value);
      case 'number_cell':
        return JSON.stringify(value.number_value);
      case 'date_cell':
        return value.date_value;
      case 'timestamp_cell':
        return value.timestamp_value;
      case 'json_cell':
        return this.escape(value.json_value);
      case 'null_cell':
        return this.emptyCell;
      case 'sql_native_cell':
        return this.escape(value.sql_native_value);
    }
    return '';
  }

  // Extra weight to be added because of nested tables inside the cells.
  private getColWeight(fields: Malloy.DimensionInfo[]) {
    let numKeys = 0;
    for (const field of fields) {
      numKeys = numKeys + 1;
      if (
        field.type.kind === 'array_type' &&
        field.type.element_type.kind === 'record_type'
      ) {
        const weight = this.getColWeight(field.type.element_type.fields) - 1;
        numKeys = numKeys + weight;
      }
    }
    return numKeys;
  }

  // Get header row along with extra empty spaces for nested children.
  private getHeaderRow(fields: Malloy.DimensionInfo[]): CellMatrix {
    const csv: string[] = [];
    let width = 0;
    for (const field of fields) {
      csv.push(this.escape(field.name));
      width++;
      if (
        field.type.kind === 'array_type' &&
        field.type.element_type.kind === 'record_type'
      ) {
        const numKeys = this.getColWeight(field.type.element_type.fields) - 1;
        width = width + numKeys;
        for (let i = 0; i < numKeys; i++) {
          csv.push(this.emptyCell);
        }
      }
    }
    return {rows: [csv.join(this.columnSeparator)], length: 1, width};
  }

  // Merge the child matrices i.e. merge the columns into one bigger matrix i.e. CSV.
  private mergeMatrices(matrices: CellMatrix[]): CellMatrix {
    const maxLength = Math.max(...matrices.map(matrix => matrix.length));
    const matrixWidth = matrices.reduce((sum, matrix) => sum + matrix.width, 0);
    const csvMatrix: string[] = [];
    for (let i = 0; i < maxLength; i++) {
      const csvRow: string[] = [];
      for (const matrix of matrices) {
        if (i < matrix.length) {
          csvRow.push(matrix.rows[i]);
        } else {
          // Add empty cells.
          const emptyCells: string[] = Array(matrix.width).fill(this.emptyCell);
          csvRow.push(...emptyCells);
        }
      }
      csvMatrix.push(csvRow.join(this.columnSeparator));
    }
    return {
      rows: csvMatrix,
      length: maxLength,
      width: matrixWidth,
    };
  }

  // Gets CSV for a data cell that has nested data.
  private getChildMatrix(
    fields: Malloy.DimensionInfo[],
    value: Malloy.Cell
  ): CellMatrix {
    if (value.kind !== 'array_cell') {
      return {
        rows: ['Invalid data found, value is not an array'],
        length: 1,
        width: 1,
      };
    } else if (value.array_value.length === 0) {
      return {
        rows: [''],
        length: 1,
        width: 1,
      };
    }
    const csvMatrix: string[] = [];

    const header = this.getHeaderRow(fields);
    // Header has 1 row.
    csvMatrix.push(...header.rows);
    const width = header.width;
    let rowCount = 1;

    for (const row of value.array_value) {
      if (row.kind === 'record_cell') {
        const rowMatrix = this.getRowMatrix(fields, row.record_value);
        rowCount = rowCount + rowMatrix.length;
        csvMatrix.push(...rowMatrix.rows);
      }
    }

    return {rows: csvMatrix, length: rowCount, width: width};
  }

  // Creates CSV content for one row of data.
  private getRowMatrix(fields: Malloy.DimensionInfo[], row: Malloy.Cell[]) {
    const matrices: CellMatrix[] = [];
    for (let idx = 0; idx < fields.length; idx++) {
      const field = fields[idx];
      const val = row[idx];
      if (
        field.type.kind === 'array_type' &&
        field.type.element_type.kind === 'record_type'
      ) {
        const cell = this.getChildMatrix(field.type.element_type.fields, val);
        matrices.push(cell);
      } else {
        const cell = {
          rows: [this.stringify(val)],
          length: 1,
          width: 1,
        };
        matrices.push(cell);
      }
    }
    return this.mergeMatrices(matrices);
  }

  async process(
    data: AsyncIterableIterator<Malloy.DataWithRecordCell>
  ): Promise<void> {
    let headerDefined = false;
    for await (const row of data) {
      const fields = this.result.schema.fields.filter(
        field => field.kind === 'dimension'
      );
      if (!headerDefined && this.includeHeader) {
        const header: CellMatrix = this.getHeaderRow(fields);
        this.stream.write(header.rows[0]);
        this.stream.write(this.rowSeparator);
        headerDefined = true;
      }
      const rowCsv = this.getRowMatrix(fields, row.record_value);
      for (const line of rowCsv.rows) {
        this.stream.write(line);
        this.stream.write(this.rowSeparator);
      }
    }
    this.stream.close();
  }
}

function toObject(
  schema: Malloy.Schema,
  data: Malloy.Cell[]
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (let idx = 0; idx < schema.fields.length; idx++) {
    const field = schema.fields[idx];
    const value = data[idx];
    switch (value.kind) {
      case 'string_cell':
        result[field.name] = value.string_value;
        break;
      case 'boolean_cell':
        result[field.name] = value.boolean_value;
        break;
      case 'date_cell':
        result[field.name] = value.date_value;
        break;
      case 'timestamp_cell':
        result[field.name] = value.timestamp_value;
        break;
      case 'number_cell':
        result[field.name] = value.number_value;
        break;
      case 'json_cell':
        result[field.name] = value.json_value;
        break;
      case 'record_cell':
        if (field.kind === 'join') {
          result[field.name] = toObject(field.schema, value.record_value);
        }
        break;
      case 'array_cell':
        // result[key] = ;
        break;
      case 'null_cell':
        result[field.name] = null;
        break;
      case 'sql_native_cell':
        result[field.name] = value.sql_native_value;
        break;
    }
  }
  return result;
}
