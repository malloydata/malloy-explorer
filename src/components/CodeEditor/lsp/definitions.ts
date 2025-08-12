/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {DocumentRange} from '@malloydata/malloy';
import * as Monaco from '../monaco/monaco_shim';
import {stubCompile} from './stub_compile';
import {convertPosition, getModel} from './utils';

export async function provideDefinition(
  textModel: Monaco.editor.ITextModel,
  position: Monaco.Position,
  _token: Monaco.CancellationToken
): Promise<Monaco.languages.Definition> {
  const monaco = Monaco.getMonaco();
  const modelDef = getModel(textModel.uri.toString());
  try {
    const malloy = textModel.getValue();
    const model = await stubCompile(modelDef, malloy);
    const reference = model.getReference(convertPosition(position));
    const location = reference?.definition.location;
    if (location) {
      return [
        {
          uri: monaco.Uri.parse(location.url),
          range: convertRange(location.range),
        },
      ];
    } else {
      const importLocation = model.getImport(convertPosition(position));
      if (importLocation) {
        const documentStart = {
          start: {line: 0, character: 0},
          end: {line: 0, character: 0},
        };
        return [
          {
            originSelectionRange: convertRange(importLocation.location.range),
            targetSelectionRange: convertRange(documentStart),
            uri: monaco.Uri.parse(importLocation.importURL),
            range: convertRange(documentStart),
          },
        ];
      }
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

function convertRange(range: DocumentRange): Monaco.IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  };
}
