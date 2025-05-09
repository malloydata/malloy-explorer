/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTLimitViewOperation,
  ASTNestViewOperation,
  ASTOrderByViewOperation,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ParsedFilter,
} from '@malloydata/malloy-query-builder';
import {ViewParent, findUniqueFieldName, getViewDefinition} from './fields';

export function segmentHasLimit(segment: ASTSegmentViewDefinition) {
  return (
    segment.operations.items.find(
      operation => operation instanceof ASTLimitViewOperation
    ) !== undefined
  );
}

export function segmentHasOrderBy(
  segment: ASTSegmentViewDefinition,
  name: string
) {
  return (
    segment.operations.items.find(
      operation =>
        operation instanceof ASTOrderByViewOperation && operation.name === name
    ) !== undefined
  );
}

export function segmentNestNo(
  segment: ASTSegmentViewDefinition,
  name?: string
) {
  return segment.operations.items.reduce((acc, operation) => {
    if (operation instanceof ASTNestViewOperation) {
      if (name) {
        if (operation.name === name) {
          do {
            acc += 1;
          } while (segment.hasFieldNamed(`${name} ${acc}`));
        }
      } else {
        return acc + 1;
      }
    }
    return acc;
  }, 1);
}

export function addGroupBy(
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const type = field.kind === 'dimension' ? field.type.kind : 'string';
  const segment = view.getOrAddDefaultSegment();
  const {fields} = view.getOutputSchema();
  let rename: string | undefined;
  if (fields.find(f => f.name === field.name)) {
    rename = findUniqueFieldName(fields, field.name, path);
  }
  if (type === 'date_type') {
    segment.addDateGroupBy(field.name, path, 'day');
  } else if (type === 'timestamp_type') {
    segment.addTimestampGroupBy(field.name, path, 'second');
  } else {
    segment.addGroupBy(field.name, path, rename);
  }
}

export function addAggregate(
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const segment = view.getOrAddDefaultSegment();
  const {fields} = view.getOutputSchema();
  let rename: string | undefined;
  if (fields.find(f => f.name === field.name)) {
    rename = findUniqueFieldName(fields, field.name, path);
  }
  segment.addAggregate(field.name, path, rename);
}

export function addNest(view: ViewParent, field: Malloy.FieldInfo) {
  const segment = view.getOrAddDefaultSegment();
  const {fields} = view.getOutputSchema();
  let rename: string | undefined;
  if (fields.find(f => f.name === field.name)) {
    rename = findUniqueFieldName(fields, field.name);
  }
  segment.addNest(field.name, rename);
}

export function addOrderBy(
  view: ViewParent,
  field: Malloy.FieldInfo,
  direction: Malloy.OrderByDirection = 'desc'
) {
  const segment = view.getOrAddDefaultSegment();
  segment.addOrderBy(field.name, direction);
}

export function addFilter(
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[],
  filter: ParsedFilter
) {
  const segment = view.getOrAddDefaultSegment();
  if (field.kind === 'dimension') {
    segment.addWhere(field.name, path, filter);
  } else {
    segment.addHaving(field.name, path, filter);
  }
}

export function getSegmentIfPresent(
  parent: ViewParent
): ASTSegmentViewDefinition | undefined {
  const definition = getViewDefinition(parent);
  if (definition instanceof ASTSegmentViewDefinition) {
    return definition;
  } else if (definition instanceof ASTRefinementViewDefinition) {
    if (definition.refinement instanceof ASTSegmentViewDefinition) {
      return definition.refinement;
    }
  }
  return undefined;
}
