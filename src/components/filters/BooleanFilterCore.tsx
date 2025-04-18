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
import stylex from '@stylexjs/stylex';

type BooleanFilterOperator = BooleanFilter['operator'];

type BooleanFilterType = BooleanFilterOperator | '-null';

interface BooleanFilterOption {
  value: BooleanFilterType;
  label: string;
}

function typeFromFilter(filter: BooleanFilter): BooleanFilterType {
  if (filter.operator === 'null' && filter.not) {
    return '-null';
  }
  return filter.operator;
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
    const filter =
      type === '-null'
        ? {operator: 'null' as BooleanFilterOperator, not: true}
        : {operator: type};
    setFilter(filter);
  };

  return (
    <div {...stylex.props(filterStyles.editor)}>
      <SelectDropdown
        value={type}
        onChange={onChangeType}
        options={
          [
            {value: 'true', label: 'is true'},
            {value: 'false', label: 'is false'},
            {value: 'null', label: 'is null'},
            {value: '-null', label: 'is not null'},
            {value: 'false_or_null', label: 'is false or null'},
          ] as BooleanFilterOption[]
        }
        customStyle={filterStyles.filterTypeDropdown}
      />
    </div>
  );
}
