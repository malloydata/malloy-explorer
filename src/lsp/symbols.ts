/*
 * Copyright 2023 Google LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as monaco from 'monaco-editor-core';
import {
  DocumentSymbol as MalloyDocumentSymbol,
  ModelDef,
} from '@malloydata/malloy';
import {stubParse} from './stub_compile';

function mapSymbol({
  name,
  range,
  type,
  children,
}: MalloyDocumentSymbol): monaco.languages.DocumentSymbol {
  let kind: monaco.languages.SymbolKind;
  let detail = type;
  switch (type) {
    case 'explore':
      kind = monaco.languages.SymbolKind.Namespace;
      detail = 'source';
      break;
    case 'query':
      kind = monaco.languages.SymbolKind.Class;
      break;
    case 'join':
      kind = monaco.languages.SymbolKind.Interface;
      break;
    case 'unnamed_query':
      kind = monaco.languages.SymbolKind.Class;
      break;
    default:
      kind = monaco.languages.SymbolKind.Field;
  }
  return {
    name: name || 'unnamed',
    range: {
      startLineNumber: range.start.line + 1,
      startColumn: range.start.character + 1,
      endLineNumber: range.end.line + 1,
      endColumn: range.end.character + 1,
    },
    detail,
    kind,
    selectionRange: {
      startLineNumber: range.start.line + 1,
      startColumn: range.start.character + 1,
      endLineNumber: range.end.line + 1,
      endColumn: range.end.character + 1,
    },
    children: children.map(mapSymbol),
    tags: [],
  };
}

export function provideDocumentSymbols(
  modelDef: ModelDef,
  textModel: monaco.editor.ITextModel,
  _token: monaco.CancellationToken
): monaco.languages.DocumentSymbol[] {
  const malloy = textModel.getValue();
  const parse = stubParse(modelDef, malloy);
  return parse.symbols.map(mapSymbol);
}
