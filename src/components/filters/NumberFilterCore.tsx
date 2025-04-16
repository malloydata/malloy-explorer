/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {Null, NumberCondition, NumberFilter} from '@malloydata/malloy-filter';
import {PillInput} from './PillInput';
import {useEffect, useState} from 'react';
import ErrorIcon from '../primitives/ErrorIcon';
import {SelectDropdown} from '../primitives/SelectDropdown';
import stylex from '@stylexjs/stylex';

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

export interface NumberFilterCoreProps {
  filter: NumberFilter | null;
  setFilter: (filter: NumberFilter) => void;
}

export const NumberFilterCore: React.FC<NumberFilterCoreProps> = ({
  filter,
  setFilter,
}) => {
  filter ??= {operator: '=', values: []};
  // Maintain the text content of the input inside this component, and only
  // update the parent when the content passes validation.
  const [innerValues, setInnerValues] = useState<string[]>(['0']);
  const [errorMessage, setErrorMessage] = useState('');

  const changeType = (type: string) => {
    const maybeNumberCondition = filter as NumberCondition;

    const newFilter = makeFilterWithNewType(filter, type as NumberFilterType);
    const needsValue = newFilter.operator !== 'null';
    if (
      needsValue &&
      (!maybeNumberCondition.values || maybeNumberCondition.values.length === 0)
    ) {
      (newFilter as NumberCondition).values = ['0'];
    }

    setFilter(newFilter);
  };

  const type = typeFromFilter(filter);
  useEffect(() => {
    // If a new value comes in from the parent, reset our own error message.
    setErrorMessage('');
    const maybeNumberCondition = filter as NumberCondition;
    if (maybeNumberCondition.values) {
      let values = maybeNumberCondition.values;
      if (!values || values.length === 0) {
        values = ['0'];
      }
      setInnerValues(values);
    } else {
      setInnerValues(['0']);
    }
  }, [filter]);

  const validateAndUpdateValues = (values: string[]) => {
    const numberCondition = filter as NumberCondition;

    setInnerValues(values);
    const hasInvalidValues = values.some(v => {
      return isNaN(parseFloat(v));
    });
    if (hasInvalidValues) {
      setErrorMessage('Every value must be numeric.');
    } else if (values.length === 0) {
      setErrorMessage('Requires at least one numeric value.');
    } else {
      setErrorMessage('');
      setFilter({
        ...numberCondition,
        values,
      });
    }
  };

  return (
    <>
      <SelectDropdown
        value={type}
        onChange={changeType}
        options={[
          {value: 'is_equal_to', label: 'is'},
          {value: 'is_not_equal_to', label: 'is not'},
          {value: 'is_greater_than', label: 'is greater than'},
          {value: 'is_less_than', label: 'is less than'},
          {
            value: 'is_greater_than_or_equal_to',
            label: 'is greater than or equal to',
          },
          {
            value: 'is_less_than_or_equal_to',
            label: 'is less than or equal to',
          },
          {value: 'is_null', label: 'is null'},
          {value: 'is_not_null', label: 'is not null'},
        ]}
      />
      {errorMessage ? <ErrorIcon errorMessage={errorMessage} /> : null}
      {getEditor(filter, innerValues, validateAndUpdateValues)}
    </>
  );
};

function getEditor(
  filter: NumberFilter,
  innerValues: string[],
  validateAndUpdateValues: (values: string[]) => void
) {
  switch (filter.operator) {
    case '!=':
    case '=':
      return (
        <NumberEditor
          values={innerValues.map(String)}
          setValues={values => validateAndUpdateValues(values)}
          type="number"
        />
      );
    case '>':
    case '<':
    case '>=':
    case '<=':
      return (
        <SingleNumberEditor
          value={innerValues[0]}
          setValue={value => validateAndUpdateValues([value])}
          type="number"
        />
      );
  }
  return null;
}

interface SingleNumberEditorProps {
  value: string;
  setValue(value: string): void;
  type?: string;
  placeholder?: string;
}

function SingleNumberEditor({value, setValue}: SingleNumberEditorProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
      {...stylex.props(styles.numberInput)}
    />
  );
}

interface NumberEditorProps {
  values: string[];
  setValues(values: string[]): void;
  type?: string;
}

function NumberEditor({values, setValues}: NumberEditorProps) {
  return <PillInput values={values} setValues={setValues} type={'number'} />;
}

// eslint-disable-next-line consistent-return
export function makeFilterWithNewType(
  filter: NumberFilter,
  type: NumberFilterType
): BasicNumberFilter {
  const values = 'values' in filter ? filter.values : [];

  switch (type) {
    case 'is_equal_to':
    case 'is_not_equal_to':
      return {...NumberFilterFragments[type], values} as BasicNumberFilter;
    case 'is_greater_than':
    case 'is_less_than':
    case 'is_greater_than_or_equal_to':
    case 'is_less_than_or_equal_to':
      return {
        ...NumberFilterFragments[type],
        values: values.length > 0 ? [values[0]] : values,
      } as BasicNumberFilter;
    case 'is_null':
    case 'is_not_null':
      return {...NumberFilterFragments[type]} as BasicNumberFilter;
  }
}

const styles = stylex.create({
  numberInput: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: 4,
    color: 'rgb(95, 99, 104)',
    padding: '3px 3px 3px 10px',
  },
});
