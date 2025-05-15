/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTAggregateViewOperation,
  ASTGroupByViewOperation,
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
  path: string[] | undefined,
  name: string
) {
  return !!segment.operations.items.find(operation => {
    if (operation instanceof ASTOrderByViewOperation) {
      return areReferencesEqual(
        path,
        name,
        operation.fieldReference.path,
        operation.fieldReference.name
      );
    }
    return false;
  });
}

function areReferencesEqual(
  path1: string[] | undefined,
  name1: string,
  path2: string[] | undefined,
  name2: string
) {
  return name1 === name2 && (path1 || []).join('.') === (path2 || []).join('.');
}

// An item is in the output space if it is part of a group_by, a select or an aggregate
export function segmentHasFieldInOutputSpace(
  segment: ASTSegmentViewDefinition,
  path: string[],
  name: string
) {
  const match = segment.operations.items.find(operation => {
    if (operation instanceof ASTGroupByViewOperation) {
      if (operation.field.node.expression.kind === 'field_reference') {
        const isEqual = areReferencesEqual(
          path,
          name,
          operation.field.node.expression.path,
          operation.field.node.expression.name
        );

        return isEqual;
      }
    } else if (operation instanceof ASTAggregateViewOperation) {
      if (operation.field.node.expression.kind === 'field_reference') {
        const isEqual = areReferencesEqual(
          path,
          name,
          operation.field.node.expression.path,
          operation.field.node.expression.name
        );

        return isEqual;
      }
    }
    return false;
  });

  return !!match;
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
  if (!parent) {
    return undefined;
  }

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
