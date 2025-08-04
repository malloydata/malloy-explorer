/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EditorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker';
import {setMonaco} from './monaco_shim';
import * as monaco from 'monaco-editor-core';

// @ts-expect-error no types
window.MonacoEnvironment = {
  getWorker(_workerId: string, _label: string) {
    return new EditorWorker();
  },
};

setMonaco(monaco);
