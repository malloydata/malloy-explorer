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

export function initLsp(monaco: typeof Monaco): Monaco.IDisposable {
  const disposables: Monaco.IDisposable[] = [];
  disposables.push(
    monaco.languages.registerHoverProvider('malloy', {
      provideHover,
    }),
    monaco.languages.registerDefinitionProvider('malloy', {
      provideDefinition: (...args) => provideDefinition(monaco, ...args),
    }),
    monaco.languages.registerCodeActionProvider('malloy', {
      provideCodeActions,
    }),
    monaco.languages.registerDocumentSymbolProvider('malloy', {
      provideDocumentSymbols: (...args) =>
        provideDocumentSymbols(monaco, ...args),
    }),
    monaco.languages.registerCompletionItemProvider('malloy', {
      provideCompletionItems: (...args) =>
        provideCompletionItems(monaco, ...args),
    })
  );

  return {
    dispose: () => disposables.forEach(disposable => disposable.dispose()),
  };
}
