/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Monaco from '../monaco/monaco_shim';
import {DocumentSymbol as MalloyDocumentSymbol} from '@malloydata/malloy';
import {stubParse} from './stub_compile';
import {getModel} from './utils';

function mapSymbol(
  monaco: typeof Monaco,
  {name, range, type, children}: MalloyDocumentSymbol
): Monaco.languages.DocumentSymbol {
  let kind: Monaco.languages.SymbolKind;
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
    children: children.map(symbol => mapSymbol(monaco, symbol)),
    tags: [],
  };
}

export function provideDocumentSymbols(
  monaco: typeof Monaco,
  textModel: Monaco.editor.ITextModel,
  _token: Monaco.CancellationToken
): Monaco.languages.DocumentSymbol[] {
  const modelDef = getModel(textModel.uri.toString());
  const malloy = textModel.getValue();
  const parse = stubParse(modelDef, malloy);
  return parse.symbols.map(symbol => mapSymbol(monaco, symbol));
}
