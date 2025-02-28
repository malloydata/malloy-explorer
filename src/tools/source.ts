/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

export function findField(
  source: Malloy.SourceInfo,
  name: string | string[]
): Malloy.FieldInfo | undefined {
  if (!Array.isArray(name)) {
    name = name.split('.');
  }
  const [head, ...rest] = name;
  let field = source.schema.fields.find(field => field.name === head);
  if (rest.length && field) {
    if (field.kind === 'join') {
      field = findField(field, rest);
    }
  }
  return field;
}

export function findDimension(
  source: Malloy.SourceInfo,
  name: string
): Malloy.FieldInfoWithDimension | undefined {
  const field = findField(source, name);
  if (field?.kind === 'dimension') {
    return field;
  }
}
