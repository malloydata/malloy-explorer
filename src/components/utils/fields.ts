/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

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
  } else if (field.kind === 'measure') {
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
