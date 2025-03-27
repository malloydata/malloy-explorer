/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {BooleanFilter} from '@malloydata/malloy-filter';
import {SelectorToken, Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';

export type BooleanFilterType =
  | 'is_true'
  | 'is_false'
  | 'is_null'
  | 'is_not_null'
  | 'is_false_or_null';

const BooleanFilterFragments: Record<BooleanFilterType, BooleanFilter> = {
  is_true: {operator: 'true'},
  is_false: {operator: 'false'},
  is_null: {operator: 'null'},
  is_not_null: {operator: 'null', not: true},
  is_false_or_null: {operator: 'false_or_null'},
} as const;

function typeFromFilter(filter: BooleanFilter): BooleanFilterType {
  for (const key in BooleanFilterFragments) {
    const type = key as BooleanFilterType;
    const value = BooleanFilterFragments[type];
    const filterNot = 'not' in filter ? filter.not : false;
    const valueNot = 'not' in value ? value.not : false;
    if (value.operator === filter.operator && valueNot === filterNot) {
      return type;
    }
  }
  throw new Error(`Unhandled boolean filter type ${filter.operator}`);
}

interface BooleanFilterTokenProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  filter: BooleanFilter;
  setFilter: (filter: BooleanFilter) => void;
}

export const BooleanFilterToken: React.FC<BooleanFilterTokenProps> = ({
  fieldInfo,
  filter,
  setFilter,
}) => {
  const changeType = (type: string) => {
    setFilter(BooleanFilterFragments[type as BooleanFilterType]);
  };

  const type = typeFromFilter(filter);

  const typeDropdown = (
    <SelectorToken
      value={type}
      onChange={changeType}
      items={
        [
          {value: 'is_true', label: 'true'},
          {value: 'is_false', label: 'false'},
          {value: 'is_null', label: 'null'},
          {value: 'is_not_null', label: 'not null'},
          {value: 'is_false_or_null', label: 'false or null'},
        ] as {value: BooleanFilterType; label: string}[]
      }
    />
  );

  const icon = atomicTypeToIcon(fieldInfo.type.kind);
  const color = fieldKindToColor(fieldInfo.kind);

  return (
    <TokenGroup color={color}>
      <Token icon={icon} label={fieldInfo.name} />
      {typeDropdown}
    </TokenGroup>
  );
};
