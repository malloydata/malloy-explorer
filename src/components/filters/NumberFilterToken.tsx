/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Null, NumberCondition, NumberFilter} from '@malloydata/malloy-filter';
import {SelectorToken, Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {PillInput} from './PillInput';
import {TokenColor} from '../primitives/tokens/types';
import {useState} from 'react';

type NumberFilterType =
  | 'is_equal_to'
  | 'is_greater_than'
  | 'is_less_than'
  | 'is_greater_than_or_equal_to'
  | 'is_less_than_or_equal_to'
  | 'is_null'
  // TODO: Figure out how to type this correctly as a NumberOperation
  // | 'is_between'
  | 'is_not_equal_to'
  | 'is_not_null';

type BasicNumberFilterFragments = Omit<NumberCondition, 'values'> | Null;

type BasicNumberFilter = NumberCondition | Null;

const NumberFilterFragments: Record<
  NumberFilterType,
  BasicNumberFilterFragments
> = {
  is_equal_to: {operator: '='},
  is_not_equal_to: {operator: '=', not: true},
  is_greater_than: {operator: '>'},
  is_less_than: {operator: '<'},
  is_greater_than_or_equal_to: {operator: '>='},
  is_less_than_or_equal_to: {operator: '<='},
  // is_between: {operator: 'to'},
  is_null: {operator: 'null'},
  is_not_null: {operator: 'null', not: true},
} as const;

function typeFromFilter(filter: NumberFilter): NumberFilterType {
  for (const key in NumberFilterFragments) {
    const type = key as NumberFilterType;
    const value = NumberFilterFragments[type];
    const filterNot = 'not' in filter ? filter.not : false;
    const valueNot = 'not' in value ? value.not : false;
    if (value.operator === filter.operator && valueNot === filterNot) {
      return type;
    }
  }
  throw new Error(`Unhandled number filter type ${filter.operator}`);
}

export interface NumberFilterBuilderProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  filter: NumberFilter | null;
  setFilter: (filter: NumberFilter) => void;
}

export const NumberFilterToken: React.FC<NumberFilterBuilderProps> = ({
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
      numberFilterChangeType(currentFilter, type as NumberFilterType)
    );
  };

  const updateFilter = (newFilter: NumberFilter) => {
    setCurrentFilter(newFilter);
    setFilter(newFilter);
  };

  const type = typeFromFilter(currentFilter);

  const typeDropdown = (
    <SelectorToken
      value={type}
      onChange={changeType}
      items={[
        {value: 'is_equal_to', label: 'is'},
        {value: 'is_not_equal_to', label: 'is not'},
        {value: 'is_greater_than', label: 'is greater than'},
        {value: 'is_less_than', label: 'is less than'},
        {
          value: 'is_greater_than_or_equal_to',
          label: 'is greater than or equal to',
        },
        {value: 'is_less_than_or_equal_to', label: 'is less than or equal to'},
        {value: 'is_null', label: 'is null'},
        {value: 'is_not_null', label: 'is not null'},
      ]}
    />
  );

  const icon = atomicTypeToIcon(fieldInfo.type.kind);
  const color = fieldKindToColor(fieldInfo.kind);

  let editor = <span></span>;

  switch (currentFilter.operator) {
    case '!=':
    case '=':
      editor = (
        <NumberEditor
          color={color}
          values={currentFilter.values.map(String)}
          setValues={values =>
            updateFilter({
              ...currentFilter,
              values,
            })
          }
          type="number"
        />
      );
      break;
    case '>':
    case '<':
    case '>=':
    case '<=':
      editor = (
        <SingleNumberEditor
          color={color}
          value={currentFilter.values[0]}
          setValue={value =>
            updateFilter({
              ...currentFilter,
              values: [value],
            })
          }
          type="number"
        />
      );
      break;
    case 'null':
      // Defaults to
      break;
  }

  return (
    <TokenGroup color={color}>
      <Token icon={icon} label={fieldInfo.name} />
      {typeDropdown}
      {editor}
    </TokenGroup>
  );
};

interface SingleNumberEditorProps {
  color?: TokenColor;
  value: string;
  setValue(value: string): void;
  type?: string;
  placeholder?: string;
}

function SingleNumberEditor({color, value, setValue}: SingleNumberEditorProps) {
  return (
    <input
      type="number"
      color={color}
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}

interface NumberEditorProps {
  color?: TokenColor;
  values: string[];
  setValues(values: string[]): void;
  type?: string;
}

function NumberEditor({color, values, setValues}: NumberEditorProps) {
  return (
    <PillInput
      color={color}
      values={values}
      setValues={setValues}
      type={'number'}
    />
  );
}

// eslint-disable-next-line consistent-return
export function numberFilterChangeType(
  filter: NumberFilter,
  type: NumberFilterType
): BasicNumberFilter {
  const values = 'values' in filter ? filter.values : [];

  switch (type) {
    case 'is_equal_to':
    case 'is_not_equal_to':
    case 'is_greater_than':
    case 'is_less_than':
    case 'is_greater_than_or_equal_to':
    case 'is_less_than_or_equal_to':
      return {...NumberFilterFragments[type], values} as BasicNumberFilter;
    case 'is_null':
    case 'is_not_null':
      return {...NumberFilterFragments[type]} as BasicNumberFilter;
  }
}
