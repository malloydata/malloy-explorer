/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {AtomicTypeType} from '@malloydata/malloy-interfaces';
import {IconType} from '../primitives';

export function atomicTypeToIcon(type: AtomicTypeType): IconType {
  return atomicTypeMap[type];
}

export function fieldKindToColor(
  kind: 'dimension' | 'measure' | 'join' | 'view'
) {
  return fieldKindMap[kind];
}

export function relationshipToIcon(
  relationship: Malloy.Relationship
): IconType {
  return relationshipMap[relationship];
}

const atomicTypeMap: Record<AtomicTypeType, IconType> = {
  array_type: 'array',
  string_type: 'string',
  date_type: 'date',
  boolean_type: 'boolean',
  number_type: 'number',
  json_type: 'json',
  record_type: 'json',
  sql_native_type: 'sql_native',
  timestamp_type: 'date',
} as const;

const fieldKindMap = {
  view: 'purple',
  dimension: 'cyan',
  measure: 'green',
  join: undefined,
} as const;

const relationshipMap = {
  many: 'many_to_one',
  cross: 'one_to_many',
  one: 'one_to_one',
} as const;
