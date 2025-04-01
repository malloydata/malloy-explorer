/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as QueryBuilder from '@malloydata/malloy-query-builder';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useMemo} from 'react';
import {flattenFieldsTree} from '../utils';

export function useOperations(
  segment: QueryBuilder.ASTSegmentViewDefinition | undefined,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const isGroupByAllowed = useMemo(() => {
    if (!segment) {
      return false;
    }

    const fieldName = field.name;
    const inputSchemaFields = segment.getInputSchema().fields;
    const filteredFieldItems = flattenFieldsTree(inputSchemaFields).filter(
      item => item.field.kind === 'dimension'
    );
    return (
      filteredFieldItems.some(
        item =>
          item.field.name === fieldName &&
          item.path.join('.') === path.join('.')
      ) && !segment.hasField(field.name, path)
    );
  }, [segment, field, path]);

  const isAggregateAllowed = useMemo(() => {
    if (!segment) {
      return false;
    }

    const fieldName = field.name;
    const inputSchemaFields = segment.getInputSchema().fields;
    const filteredFieldItems = flattenFieldsTree(inputSchemaFields).filter(
      item => item.field.kind === 'measure'
    );
    return (
      filteredFieldItems.some(
        item =>
          item.field.name === fieldName &&
          item.path.join('.') === path.join('.')
      ) && !segment.hasField(field.name, path)
    );
  }, [segment, field, path]);

  const isOrderByAllowed = useMemo(() => {
    if (!segment) {
      return false;
    }

    const fieldName = field.name;
    const outputSchemaFields = segment.getOutputSchema().fields;
    return outputSchemaFields
      .filter(field => field.kind === 'dimension')
      .filter(field => ORDERABLE_TYPES.includes(field.type.kind))
      .some(field => field.name === fieldName);
  }, [segment, field]);

  return {isAggregateAllowed, isGroupByAllowed, isOrderByAllowed};
}

const ORDERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;
