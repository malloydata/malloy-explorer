/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as monaco from 'monaco-editor-core';

export function convertPosition(position: monaco.Position) {
  return {
    line: position.lineNumber - 1,
    character: position.column,
  };
}
