/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class EditorWorker {
  static editorWorkerInstance: EditorWorker | null = null;

  private constructor() {
    console.info('Editor worker initialized');

    globalThis.addEventListener('message', ev => {
      console.info('globalThis received message:', ev.data);
    });
  }

  static init() {
    if (!EditorWorker.editorWorkerInstance) {
      EditorWorker.editorWorkerInstance = new EditorWorker();
    }
    return EditorWorker.editorWorkerInstance;
  }
}

EditorWorker.init();
