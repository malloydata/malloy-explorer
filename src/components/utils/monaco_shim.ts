/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from 'monaco-editor-core';
import * as monaco from 'monaco-editor-core';

export type Monaco = typeof monaco;

let malloyMonacoInstance: Monaco | undefined;

export function getMonaco(): Monaco {
  if (!malloyMonacoInstance) {
    throw new Error('getMonaco() called before setMonaco()');
  }
  return malloyMonacoInstance;
}

export function setMonaco(monaco: Monaco) {
  malloyMonacoInstance = monaco;
}
