/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function setAtPath(
  current: Record<string, unknown>,
  path: string[],
  value: unknown
) {
  const newCurrent = {...current};

  let target = newCurrent;
  for (let i = 0; i < path.length - 1; i++) {
    if (typeof target[path[i]] !== 'object') {
      target[path[i]] = {};
    }
    target = target[path[i]] as Record<string, unknown>;
  }
  target[path[path.length - 1]] = value;

  return newCurrent;
}
