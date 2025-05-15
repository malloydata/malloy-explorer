/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {useMemo} from 'react';
import {flattenFieldsTree} from '../utils';
import {
  getSegmentIfPresent,
  segmentHasFieldInOutputSpace,
  segmentHasOrderBy,
} from '../../utils/segment';
import {
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';

function toFullName(path: string[] | undefined, name: string): string {
  return [...(path || []), name].join('.');
}

export function useOperations(
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const fullName = toFullName(path, field.name);
  const flattenedFields = useMemo(() => {
    const {fields} = getInputSchemaFromViewParent(view);
    const inputPath = path.join('.');
    return flattenFieldsTree(fields).filter(fieldItem => {
      return fieldItem.path.join('.') === inputPath;
    });
  }, [path, view]);

  const matchingFieldItem = flattenedFields.find(
    fieldItem => field.name === fieldItem.field.name
  );

  const groupByDisabledReason = useMemo(() => {
    const segment = getSegmentIfPresent(view);

    if (matchingFieldItem?.field.kind !== 'dimension') {
      return 'Grouping is only available on a dimenion.';
    }
    if (segment?.hasField(field.name, path)) {
      return 'Cannot group by a field already in the view.';
    }
    if (!isNotAnnotatedFilteredField(field)) {
      return 'This field is annotated with #NO_UI.';
    }
    return '';
  }, [view, matchingFieldItem?.field.kind, field, path]);

  const aggregateDisabledReason = useMemo(() => {
    if (matchingFieldItem?.field.kind !== 'measure') {
      return 'Aggregation only supports measure fields.';
    }

    const segment = getSegmentIfPresent(view);
    if (segment?.hasField(field.name, path)) {
      return 'This field is already used in the query.';
    }

    if (!isNotAnnotatedFilteredField(field)) {
      return 'This field is annotated with #NO_UI.';
    }

    return '';
  }, [matchingFieldItem?.field.kind, view, field, path]);

  const filterDisabledReason = useMemo(() => {
    if (!matchingFieldItem) {
      return `Unexpected Error: Could not find a field ${fullName}.`;
    }
    if (!['dimension', 'measure'].includes(matchingFieldItem.field.kind)) {
      return `Filtering is only available for a dimension or measure.`;
    }
    if (
      !FILTERABLE_TYPES.includes(
        (matchingFieldItem.field as Malloy.DimensionInfo).type.kind
      )
    ) {
      return 'Filtering only supports string, boolean, number, date and time fields.';
    }

    return '';
  }, [fullName, matchingFieldItem]);

  const orderByDisabledReason = useMemo(() => {
    if (!matchingFieldItem) {
      return `Unexpected Error: Could not find a field ${fullName}.`;
    }
    const segment = getSegmentIfPresent(view);
    if (segment && segmentHasOrderBy(segment, path, field.name)) {
      return 'Query is already ordered by this field.';
    }
    const outputSchemaFields = view.getOutputSchema().fields;

    if (!segment || !segmentHasFieldInOutputSpace(segment, path, field.name)) {
      return 'Order by is only available for fields in the output.';
    }
    if (
      !outputSchemaFields.some(
        fieldInfo => matchingFieldItem.field.name === fieldInfo.name
      )
    ) {
      return 'Order By is only available for fields already in the output.';
    }
    if (matchingFieldItem.field.kind !== 'dimension') {
      return 'Order By is only available for dimension fields.';
    }
    if (
      !ORDERABLE_TYPES.includes(
        (matchingFieldItem.field as Malloy.DimensionInfo).type.kind
      )
    ) {
      return 'Order By only supports string, boolean, number, date and time fields.';
    }

    return '';
  }, [matchingFieldItem, view, path, field.name, fullName]);

  return {
    isGroupByAllowed: !groupByDisabledReason,
    groupByDisabledReason,
    isAggregateAllowed: !aggregateDisabledReason,
    aggregateDisabledReason,
    isFilterAllowed: !filterDisabledReason,
    filterDisabledReason,
    isOrderByAllowed: !orderByDisabledReason,
    orderByDisabledReason,
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
