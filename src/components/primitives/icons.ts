/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ChevronRight from '../../assets/chevrons/chevron_right.svg?react';
import Insert from '../../assets/refinements/insert.svg?react';
import InsertNest from '../../assets/refinements/insert_nest.svg?react';
import TypeIconDatabase from '../../assets/types/type-icon-database.svg?react';
import TypeIconNumberMeasure from '../../assets/types/type-icon-number-measure.svg?react';
import TypeIconProjection from '../../assets/types/type-icon-projection.svg?react';
import TypeIconString from '../../assets/types/type-icon-string.svg?react';

export const ICON_MAP = {
  chevronRight: ChevronRight,
  database: TypeIconDatabase,
  dimension: TypeIconString,
  insert: Insert,
  measure: TypeIconNumberMeasure,
  nest: InsertNest,
  view: TypeIconProjection,
} as const;

export const SMALL_ICONS: (keyof typeof ICON_MAP)[] = [
  'chevronRight',
  'database',
  'dimension',
  'measure',
  'view',
];
