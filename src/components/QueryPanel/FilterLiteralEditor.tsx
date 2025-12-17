/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {StyleXStyles} from '@stylexjs/stylex';
import {FilterPopover} from '../filters/FilterPopover';
import {parsedToLabels} from '../utils/filters';
import {
  BooleanFilterExpression,
  NumberFilterExpression,
  StringFilterExpression,
  TemporalFilterExpression,
} from '@malloydata/malloy-filter';
import {Token} from '../primitives';
import {ParsedFilter} from '@malloydata/malloy-query-builder';

interface FilterLiteralEditorProps {
  filterType: Malloy.FilterableTypeType;
  value: Malloy.LiteralValueWithFilterExpressionLiteral;
  setValue: (value: Malloy.LiteralValue) => void;
  customStyle?: StyleXStyles;
}

export function FilterLiteralEditor({
  filterType,
  value,
  setValue,
}: FilterLiteralEditorProps) {
  let filter: ParsedFilter | null = null;

  switch (filterType) {
    case 'string_type':
      {
        const {parsed} = StringFilterExpression.parse(
          value.filter_expression_value
        );
        filter = {kind: 'string', parsed};
      }
      break;
    case 'number_type':
      {
        const {parsed} = NumberFilterExpression.parse(
          value.filter_expression_value
        );
        filter = {kind: 'number', parsed};
      }
      break;
    case 'boolean_type':
      {
        const {parsed} = BooleanFilterExpression.parse(
          value.filter_expression_value
        );
        filter = {kind: 'boolean', parsed};
      }
      break;
    case 'date_type':
      {
        const {parsed} = TemporalFilterExpression.parse(
          value.filter_expression_value
        );
        filter = {kind: 'date', parsed};
      }
      break;
    case 'timestamp_type':
      {
        const {parsed} = TemporalFilterExpression.parse(
          value.filter_expression_value
        );
        filter = {kind: 'timestamp', parsed};
      }
      break;
    case 'timestamptz_type': {
      const {parsed} = TemporalFilterExpression.parse(
        value.filter_expression_value
      );
      filter = {kind: 'timestamptz', parsed};
    }
  }

  const {op, value: filterValue} = parsedToLabels(
    filter,
    value.filter_expression_value
  );

  const label = `${op} ${filterValue}`;

  const fieldInfo: Malloy.FieldInfo = {
    kind: 'dimension',
    name: 'parameter',
    type: {kind: filterType},
  };

  const setFilter = (parsed: ParsedFilter) => {
    switch (parsed.kind) {
      case 'string':
        setValue({
          kind: 'filter_expression_literal',
          filter_expression_value: StringFilterExpression.unparse(
            parsed.parsed
          ),
        });
        break;
      case 'boolean':
        setValue({
          kind: 'filter_expression_literal',
          filter_expression_value: BooleanFilterExpression.unparse(
            parsed.parsed
          ),
        });
        break;
      case 'number':
        setValue({
          kind: 'filter_expression_literal',
          filter_expression_value: NumberFilterExpression.unparse(
            parsed.parsed
          ),
        });
        break;
      case 'date':
      case 'timestamp':
      case 'timestamptz':
        setValue({
          kind: 'filter_expression_literal',
          filter_expression_value: TemporalFilterExpression.unparse(
            parsed.parsed
          ),
        });
        break;
    }
  };

  return (
    <FilterPopover
      fieldInfo={fieldInfo}
      path={[]}
      filter={filter}
      setFilter={setFilter}
      trigger={<Token label={label} />}
      layoutProps={{align: 'start', side: 'bottom', sideOffset: 1}}
    />
  );
}
