/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Monaco from '../monaco/monaco_shim';
import {stubParse} from './stub_compile';
import {convertPosition, getModel} from './utils';
import {COMPLETION_DOCS} from './completion_docs';

export function provideCompletionItems(
  textModel: Monaco.editor.ITextModel,
  position: Monaco.Position,
  _context: Monaco.languages.CompletionContext,
  _token: Monaco.CancellationToken
): Monaco.languages.CompletionList {
  const modelDef = getModel(textModel.uri.toString());
  const malloyPosition = convertPosition(position);
  const malloy = textModel.getValue();
  const parse = stubParse(modelDef, malloy);
  const prefix = textModel.getValueInRange({
    startColumn: 0,
    startLineNumber: position.lineNumber,
    endColumn: position.column,
    endLineNumber: position.lineNumber,
  });
  const monaco = Monaco.getMonaco();

  let startColumn = position.column;
  while (startColumn > 0 && prefix.charAt(startColumn - 2).match(/\w/)) {
    startColumn -= 1;
  }

  return {
    suggestions: parse
      .completions(malloyPosition)
      .map<Monaco.languages.CompletionItem>(completion => {
        return {
          insertText: completion.text,
          label: completion.text,
          kind: monaco.languages.CompletionItemKind.Text,
          range: {
            startColumn,
            startLineNumber: position.lineNumber,
            endColumn: position.column,
            endLineNumber: position.lineNumber,
          },
          documentation:
            COMPLETION_DOCS[completion.type]?.[
              completion.text.replace(/:$/, '')
            ],
        };
      }),
  };
}
