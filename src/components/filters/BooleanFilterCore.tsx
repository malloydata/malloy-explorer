/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {BooleanFilter} from '@malloydata/malloy-filter';
import {SelectDropdown} from '../primitives/SelectDropdown';
import {filterStyles} from './styles';

const BooleanFilterFragments: Record<BooleanFilterType, BooleanFilter> = {
  is_true: {operator: 'true'},
  is_false: {operator: 'false'},
  is_null: {operator: 'null'},
  is_not_null: {operator: 'null', not: true},
  is_false_or_null: {operator: 'false_or_null'},
} as const;

export type BooleanFilterType =
  | 'is_true'
  | 'is_false'
  | 'is_null'
  | 'is_not_null'
  | 'is_false_or_null';

function typeFromFilter(filter: BooleanFilter): BooleanFilterType {
  for (const key in BooleanFilterFragments) {
    const type = key as BooleanFilterType;
    const value = BooleanFilterFragments[type];
    const filterNot = filter.not ?? false;
    const valueNot = value.not ?? false;
    if (value.operator === filter.operator && valueNot === filterNot) {
      return type;
    }
  }
  throw new Error(`Unhandled boolean filter type ${filter.operator}`);
}

export interface BooleanFilterDialogProps {
  filter: BooleanFilter;
  setFilter: (filter: BooleanFilter) => void;
}

export function BooleanFilterCore({
  filter,
  setFilter,
}: BooleanFilterDialogProps) {
  const type = typeFromFilter(filter);
  const onChangeType = (type: BooleanFilterType) => {
    setFilter(BooleanFilterFragments[type]);
  };

  return (
    <>
      <SelectDropdown
        value={type}
        onChange={onChangeType}
        options={
          [
            {value: 'is_true', label: 'is true'},
            {value: 'is_false', label: 'is false'},
            {value: 'is_null', label: 'is null'},
            {value: 'is_not_null', label: 'is not null'},
            {value: 'is_false_or_null', label: 'is false or null'},
          ] as {value: BooleanFilterType; label: string}[]
        }
        customStyle={filterStyles.filterTypeDropdown}
      />
    </>
  );
}
