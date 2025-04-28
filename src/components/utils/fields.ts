/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTView,
} from '@malloydata/malloy-query-builder';
import {hasExplorerFilterFieldAnnotation} from './annotations';

export type ViewParent = ASTArrowQueryDefinition | ASTView;

/**
 *
 * @param field
 * @returns
 */
export function sortFieldInfoOrder(field: Malloy.FieldInfo): 0 | 1 | 2 | 3 {
  if (field.kind === 'join') {
    return 3;
  } else if (field.kind === 'view') {
    return 2;
  } else if (field.kind === 'dimension') {
    return 1;
  } else {
    return 0;
  }
}

export function sortFieldInfos(fields: Malloy.FieldInfo[]): Malloy.FieldInfo[] {
  return fields.sort((a, b) => {
    const orderA = sortFieldInfoOrder(a);
    const orderB = sortFieldInfoOrder(b);

    return orderA === orderB ? a.name.localeCompare(b.name) : orderB - orderA;
  });
}

const INDEX_FIELDS = [
  'fieldName',
  'fieldPath',
  'fieldValue',
  'fieldType',
  'fieldRange',
  'weight',
] as const;

export function isIndexView(field: Malloy.FieldInfoWithView) {
  const allFields = new Set([
    ...INDEX_FIELDS,
    ...field.schema.fields.map(field => field.name),
  ]);
  // Complete overlap of fields
  return allFields.size === INDEX_FIELDS.length;
}

export function getViewDefinition(parent: ViewParent) {
  return parent instanceof ASTArrowQueryDefinition
    ? parent.view
    : parent.definition;
}

export function getInputSchemaFromViewParent(
  parent: ViewParent
): Malloy.Schema {
  const definition = getViewDefinition(parent);
  return definition.getInputSchema();
}

export function isNotAnnotatedFilteredField(field: Malloy.FieldInfo) {
  return !hasExplorerFilterFieldAnnotation(field.annotations ?? []);
}

export function findUniqueFieldName(
  fields: Malloy.FieldInfo[],
  rename: string,
  path: string[] = []
) {
  if (!fields.find(field => field.name === rename)) {
    return rename;
  }
  if (path.length) {
    const parts = [...path];
    while (parts.length) {
      const part = parts.pop();
      rename = `${part} ${rename}`;
      if (!fields.find(field => field.name === rename)) {
        return rename;
      }
    }
  }
  let idx = 2;
  while (fields.find(field => field.name === `${rename} ${idx}`)) {
    idx++;
  }
  return `${rename} ${idx}`;
}
