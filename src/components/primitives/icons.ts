/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ChevronLeft from '../../assets/chevrons/chevron_left.svg?react';
import ChevronRight from '../../assets/chevrons/chevron_right.svg?react';
import Clear from '../../assets/refinements/clear.svg?react';
import Insert from '../../assets/refinements/insert.svg?react';
import InsertNest from '../../assets/refinements/insert_nest.svg?react';
import Filter from '../../assets/refinements/insert_filter.svg?react';
import ManyToOneIcon from '../../assets/types/type-icon-many-to-one.svg?react';
import OneToManyIcon from '../../assets/types/type-icon-one-to-many.svg?react';
import OneToOneIcon from '../../assets/types/type-icon-one-to-one.svg?react';
import OrderBy from '../../assets/refinements/insert_order_by.svg';
import TypeIconDatabase from '../../assets/types/type-icon-database.svg?react';
import TypeIconNumberMeasure from '../../assets/types/type-icon-number-measure.svg?react';
import TypeIconProjection from '../../assets/types/type-icon-projection.svg?react';
import TypeIconString from '../../assets/types/type-icon-string.svg?react';
import TypeIconArray from '../../assets/types/type-icon-array.svg?react';
import TypeIconBoolean from '../../assets/types/type-icon-on-off.svg?react';
import TypeIconDate from '../../assets/types/type-icon-date.svg?react';
import TypeIconJson from '../../assets/types/type-icon-json.svg?react';
import TypeIconNumber from '../../assets/types/type-icon-number.svg?react';
import TypeIconQuery from '../../assets/types/type-icon-query.svg?react';
import TypeIconSqlNative from '../../assets/types/type-icon-sql-native.svg?react';

export const ICON_MAP = {
  array: TypeIconArray,
  boolean: TypeIconBoolean,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clear: Clear,
  database: TypeIconDatabase,
  date: TypeIconDate,
  dimension: TypeIconString,
  filter: Filter,
  insert: Insert,
  json: TypeIconJson,
  many_to_one: ManyToOneIcon,
  measure: TypeIconNumberMeasure,
  nest: InsertNest,
  number: TypeIconNumber,
  one_to_many: OneToManyIcon,
  one_to_one: OneToOneIcon,
  order_by: OrderBy,
  query: TypeIconQuery,
  sql_native: TypeIconSqlNative,
  string: TypeIconString,
  view: TypeIconProjection,
} as const;

export type IconType = keyof typeof ICON_MAP;

export const SMALL_ICONS: IconType[] = [
  'chevronLeft',
  'chevronRight',
  'database',
  'dimension',
  'measure',
  'view',
];
