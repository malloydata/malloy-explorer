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
  StringMatch,
} from '@malloydata/malloy-filter';
import {PillInput} from './PillInput';
import {TokenColor} from '../primitives/tokens/types';
import {RefObject, useRef, useState} from 'react';
import {filterStyles} from './styles';
import {SelectDropdown} from '../primitives/SelectDropdown';
import {ValueList} from '../QueryPanel/AddMenu/ValueList';
import stylex from '@stylexjs/stylex';

export type BasicStringFilter =
  | StringCondition
  | StringMatch
  | Null
  | StringEmpty;

type BasicStringFilterFragments =
  | Omit<StringCondition, 'values'>
  | Omit<StringMatch, 'escaped_values'>
  | Null
  | StringEmpty;

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

function typeFromFilter(filter: BasicStringFilter): StringFilterType {
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

export interface StringFilterCoreProps {
  filter: BasicStringFilter | null;
  setFilter: (filter: BasicStringFilter) => void;
  field: Malloy.FieldInfo;
  path: string[];
}

export const StringFilterCore: React.FC<StringFilterCoreProps> = ({
  filter,
  setFilter,
  field,
  path,
}) => {
  filter ??= {operator: '=', values: []};
  const [searchValue, setSearchValue] = useState('');
  const valueListRef = useRef<HTMLDivElement>(null);

  const type = typeFromFilter(filter);

  const [currentFilter, setCurrentFilter] = useState(filter);
  const changeType = (type: string) => {
    updateFilter(
      stringFilterChangeType(currentFilter, type as StringFilterType)
    );
  };

  const updateFilter = (newFilter: BasicStringFilter) => {
    setCurrentFilter(newFilter);
    setFilter(newFilter);
  };

  return (
    <>
      <SelectDropdown
        key="type"
        value={type}
        onChange={changeType}
        options={[
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
        customStyle={filterStyles.filterTypeDropdown}
      />
      {currentFilter.operator === '=' ||
      currentFilter.operator === 'starts' ||
      currentFilter.operator === 'ends' ||
      currentFilter.operator === 'contains' ? (
        <>
          <StringEditor
            key="editor"
            values={currentFilter.values}
            setValues={values => updateFilter({...currentFilter, values})}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            focusElement={valueListRef}
          />
          <ValueList
            ref={valueListRef}
            search={searchValue}
            fieldPath={[...path, field.name].join('.')}
            onClick={value => {
              if (value.fieldValue) {
                updateFilter({
                  ...currentFilter,
                  values: [...currentFilter.values, value.fieldValue],
                });
                setSearchValue('');
              }
            }}
            customStyle={styles.valueList}
          />
        </>
      ) : currentFilter.operator === '~' ? (
        <StringEditor
          key="editor"
          values={currentFilter.escaped_values}
          setValues={escaped_values =>
            updateFilter({...currentFilter, escaped_values})
          }
          escape={true}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      ) : null}
    </>
  );
};

interface StringEditorProps {
  color?: TokenColor;
  values: string[];
  setValues(values: string[]): void;
  escape?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  focusElement?: RefObject<HTMLDivElement | null>;
}

function StringEditor({
  color,
  values,
  setValues,
  searchValue,
  setSearchValue,
  focusElement,
}: StringEditorProps) {
  return (
    <PillInput
      color={color}
      values={values}
      setValues={setValues}
      value={searchValue}
      setValue={setSearchValue}
      focusElement={focusElement}
    />
  );
}

function escapeValue(val: string) {
  return val.replace(/(["%_^])/g, '^$1');
}

function unescapeValue(val: string) {
  return val.replace(/\^(["%_^])/g, '$1');
}

// eslint-disable-next-line consistent-return
export function stringFilterChangeType(
  filter: BasicStringFilter,
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

const styles = stylex.create({
  valueList: {
    maxHeight: 200,
    overflow: 'auto',
  },
});
