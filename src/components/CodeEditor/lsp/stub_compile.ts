/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Malloy,
  MalloyQueryData,
  Model,
  ModelDef,
  Parse,
  Runtime,
  SQLSourceDef,
  TableSourceDef,
  URLReader,
} from '@malloydata/malloy';
import {BaseConnection} from '@malloydata/malloy/connection';

const DEFAULT_DIALECT = 'duckdb';

export class StubReader implements URLReader {
  async readURL(_url: URL): Promise<string> {
    throw new Error('Stub reader cannot read files');
  }
}

export class StubConnection extends BaseConnection {
  name = 'stub';

  constructor(public dialectName: string = DEFAULT_DIALECT) {
    super();
  }

  getDigest(): string {
    return 'stub';
  }

  runSQL(): Promise<MalloyQueryData> {
    throw new Error('Stub connection cannot run SQL.');
  }

  fetchSelectSchema(_sqlSource: SQLSourceDef): Promise<SQLSourceDef | string> {
    throw new Error('Stub connection cannot fetch schemas.');
  }

  fetchTableSchema(
    _tableName: string,
    _tablePath: string
  ): Promise<TableSourceDef | string> {
    throw new Error('Stub connection cannot fetch schemas.');
  }
}

const urlReader = new StubReader();
const connection = new StubConnection();
const runtime = new Runtime({urlReader, connection});

export async function stubCompile(
  modelDef: ModelDef,
  malloy: string
): Promise<Model> {
  return await runtime
    ._loadModelFromModelDef(modelDef)
    .extendModel(malloy, {noThrowOnError: true})
    .getModel();
}

export function stubParse(_modelDef: ModelDef, source: string): Parse {
  return Malloy.parse({source});
}
