/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ModelDef} from '@malloydata/malloy';
import * as Monaco from '../monaco/monaco_shim';
import {
  provideCodeActions,
  provideCompletionItems,
  provideDefinition,
  provideDocumentSymbols,
  provideHover,
} from '.';

export function convertPosition(position: Monaco.Position) {
  return {
    line: position.lineNumber - 1,
    character: position.column,
  };
}

const ModelMap: Record<string, ModelDef> = {};

export function registerModel(modelUri: string, modelDef: ModelDef) {
  ModelMap[modelUri] = modelDef;
}

export function getModel(modelUri: string): ModelDef {
  if (modelUri in ModelMap) {
    return ModelMap[modelUri];
  }
  throw new Error(`Unknown model ${modelUri}`);
}

export function initLsp(): Monaco.IDisposable {
  const monaco = Monaco.getMonaco();

  const disposables: Monaco.IDisposable[] = [];
  disposables.push(
    monaco.languages.registerHoverProvider('malloy', {
      provideHover,
    }),
    monaco.languages.registerDefinitionProvider('malloy', {
      provideDefinition,
    }),
    monaco.languages.registerCodeActionProvider('malloy', {
      provideCodeActions,
    }),
    monaco.languages.registerDocumentSymbolProvider('malloy', {
      provideDocumentSymbols,
    }),
    monaco.languages.registerCompletionItemProvider('malloy', {
      provideCompletionItems,
    })
  );

  return {
    dispose: () => disposables.forEach(disposable => disposable.dispose()),
  };
}
