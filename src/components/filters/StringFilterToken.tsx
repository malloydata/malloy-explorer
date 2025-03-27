/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  Null,
  StringCondition,
  StringEmpty,
  StringFilter,
  StringMatch,
} from '@malloydata/malloy-filter';
import {SelectorToken, Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {PillInput} from './PillInput';
import {TokenColor} from '../primitives/tokens/types';
import {useState} from 'react';

type StringFilterType =
  | 'is_equal_to'
  | 'starts_with'
  | 'ends_with'
  | 'contains'
  | 'matches'
  | 'is_blank'
  | 'is_null'
  | 'is_not_equal_to'
  | 'does_not_start_with'
  | 'does_not_end_with'
  | 'does_not_contain'
  | 'does_not_match'
  | 'is_not_blank'
  | 'is_not_null';

type BasicStringFilterFragments =
  | Omit<StringCondition, 'values'>
  | Omit<StringMatch, 'escaped_values'>
  | Null
  | StringEmpty;

type BasicStringFilter = StringCondition | StringMatch | Null | StringEmpty;

const StringFilterFragments: Record<
  StringFilterType,
  BasicStringFilterFragments
> = {
  is_equal_to: {operator: '='},
  starts_with: {operator: 'starts'},
  ends_with: {operator: 'ends'},
  contains: {operator: 'contains'},
  matches: {operator: '~'},
  is_blank: {operator: 'empty'},
  is_null: {operator: 'null'},
  is_not_equal_to: {operator: '=', not: true},
  does_not_start_with: {operator: 'starts', not: true},
  does_not_end_with: {operator: 'ends', not: true},
  does_not_contain: {operator: 'contains', not: true},
  does_not_match: {operator: '~', not: true},
  is_not_blank: {operator: 'empty', not: true},
  is_not_null: {operator: 'null', not: true},
} as const;

function typeFromFilter(filter: StringFilter): StringFilterType {
  for (const key in StringFilterFragments) {
    const type = key as StringFilterType;
    const value = StringFilterFragments[type];
    const filterNot = 'not' in filter ? filter.not : false;
    const valueNot = 'not' in value ? value.not : false;
    if (value.operator === filter.operator && valueNot === filterNot) {
      return type;
    }
  }
  throw new Error(`Unhandled string filter type ${filter.operator}`);
}

export interface StringFilterBuilderProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  filter: StringFilter | null;
  setFilter: (filter: StringFilter) => void;
}

export const StringFilterToken: React.FC<StringFilterBuilderProps> = ({
  fieldInfo,
  filter,
  setFilter,
}) => {
  filter ??= {operator: '=', values: []};
  // Keep a copy of the filter locally so when we enter an invalid state and
  // lose context we can still maintain the UI.
  const [currentFilter, setCurrentFilter] = useState(filter);
  const changeType = (type: string) => {
    updateFilter(
      stringFilterChangeType(currentFilter, type as StringFilterType)
    );
  };

  const updateFilter = (newFilter: StringFilter) => {
    setCurrentFilter(newFilter);
    setFilter(newFilter);
  };

  const type = typeFromFilter(currentFilter);

  const typeDropdown = (
    <SelectorToken
      key="field"
      value={type}
      onChange={changeType}
      items={[
        {value: 'is_equal_to', label: 'is'},
        {value: 'starts_with', label: 'starts with'},
        {value: 'ends_with', label: 'ends with'},
        {value: 'contains', label: 'contains'},
        {value: 'is_blank', label: 'is blank'},
        {value: 'is_null', label: 'is null'},
        {value: 'matches', label: 'matches'},
        {value: 'is_not_equal_to', label: 'is not'},
        {value: 'does_not_start_with', label: 'does not start with'},
        {value: 'does_not_end_with', label: 'does not end with'},
        {value: 'does_not_contain', label: 'does not contain'},
        {value: 'is_not_blank', label: 'is not blank'},
        {value: 'is_not_null', label: 'is not null'},
        {value: 'does_not_match', label: 'does not match'},
      ]}
    />
  );

  const icon = atomicTypeToIcon(fieldInfo.type.kind);
  const color = fieldKindToColor(fieldInfo.kind);

  const tokens = [
    <Token key="type" icon={icon} label={fieldInfo.name} />,
    typeDropdown,
  ];

  switch (currentFilter.operator) {
    case '=':
    case 'starts':
    case 'ends':
    case 'contains':
      tokens.push(
        <StringEditor
          key="editor"
          color={color}
          values={currentFilter.values}
          setValues={values => updateFilter({...currentFilter, values})}
        />
      );
      break;
    case '~':
      tokens.push(
        <StringEditor
          key="editor"
          color={color}
          values={currentFilter.escaped_values}
          setValues={escaped_values =>
            updateFilter({...currentFilter, escaped_values})
          }
          escape={true}
        />
      );
  }

  return <TokenGroup color={color}>{tokens}</TokenGroup>;
};

interface StringEditorProps {
  color?: TokenColor;
  values: string[];
  setValues(values: string[]): void;
  escape?: boolean;
}

function StringEditor({color, values, setValues}: StringEditorProps) {
  return <PillInput color={color} values={values} setValues={setValues} />;
}

function escapeValue(val: string) {
  return val.replace(/(["%_^])/g, '^$1');
}

function unescapeValue(val: string) {
  return val.replace(/\^(["%_^])/g, '$1');
}

// eslint-disable-next-line consistent-return
export function stringFilterChangeType(
  filter: StringFilter,
  type: StringFilterType
): BasicStringFilter {
  const values =
    'values' in filter
      ? filter.values
      : 'escaped_values' in filter
        ? filter.escaped_values.map(unescapeValue)
        : [];

  switch (type) {
    case 'is_equal_to':
    case 'is_not_equal_to':
    case 'starts_with':
    case 'does_not_start_with':
    case 'contains':
    case 'does_not_contain':
    case 'ends_with':
    case 'does_not_end_with':
      return {...StringFilterFragments[type], values} as BasicStringFilter;
    case 'is_blank':
    case 'is_not_blank':
    case 'is_null':
    case 'is_not_null':
      return {...StringFilterFragments[type]} as BasicStringFilter;
    case 'matches':
    case 'does_not_match':
      return {
        ...StringFilterFragments[type],
        escaped_values: values.map(escapeValue),
      } as BasicStringFilter;
  }
}
