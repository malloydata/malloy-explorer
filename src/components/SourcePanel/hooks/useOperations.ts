/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {useMemo} from 'react';
import {flattenFieldsTree} from '../utils';
import {getSegmentIfPresent, segmentHasOrderBy} from '../../utils/segment';
import {
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';

export function useOperations(
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const dimensionFields = useMemo(() => {
    const {fields} = getInputSchemaFromViewParent(view);
    return new Set(
      flattenFieldsTree(fields)
        .filter(({field}) => field.kind === 'dimension')
        .map(({field}) => field.name)
    );
  }, [view]);

  const measureFields = useMemo(() => {
    const {fields} = getInputSchemaFromViewParent(view);
    return new Set(
      flattenFieldsTree(fields)
        .filter(({field}) => field.kind === 'measure')
        .map(({field}) => field.name)
    );
  }, [view]);

  const isGroupByAllowed = useMemo(() => {
    if (!view) {
      return false;
    }

    const segment = getSegmentIfPresent(view);

    return (
      dimensionFields.has(field.name) &&
      !segment?.hasField(field.name, path) &&
      isNotAnnotatedFilteredField(field)
    );
  }, [view, field, path, dimensionFields]);

  const isAggregateAllowed = useMemo(() => {
    if (!view) {
      return false;
    }

    const segment = getSegmentIfPresent(view);

    return (
      measureFields.has(field.name) &&
      !segment?.hasField(field.name, path) &&
      isNotAnnotatedFilteredField(field)
    );
  }, [view, field, path, measureFields]);

  const isFilterAllowed = useMemo(() => {
    if (!view) {
      return false;
    }
    const fieldName = field.name;
    const inputSchemaFields = getInputSchemaFromViewParent(view).fields;

    return inputSchemaFields
      .filter(field => field.kind === 'dimension' || field.kind === 'measure')
      .filter(field => FILTERABLE_TYPES.includes(field.type.kind))
      .some(field => field.name === fieldName);
  }, [view, field]);

  const isOrderByAllowed = useMemo(() => {
    if (!view) {
      return false;
    }

    const fieldName = field.name;
    const outputSchemaFields = view.getOutputSchema().fields;
    const segment = getSegmentIfPresent(view);

    return outputSchemaFields
      .filter(field => field.kind === 'dimension')
      .filter(field => ORDERABLE_TYPES.includes(field.type.kind))
      .filter(field => !segment || !segmentHasOrderBy(segment, field.name))
      .some(field => field.name === fieldName);
  }, [view, field]);

  return {
    isGroupByAllowed,
    isAggregateAllowed,
    isFilterAllowed,
    isOrderByAllowed,
  };
}

const FILTERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'boolean_type',
  'number_type',
  'date_type',
  'timestamp_type',
] as const;

const ORDERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;
