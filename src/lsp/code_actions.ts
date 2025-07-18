/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {LogMessage, MalloyError, ModelDef} from '@malloydata/malloy';
import * as monaco from 'monaco-editor-core';
import {stubCompile} from './stub_compile';

export async function provideCodeActions(
  modelDef: ModelDef,
  textModel: monaco.editor.ITextModel,
  range: monaco.Range,
  _context: monaco.languages.CodeActionContext,
  _token: monaco.CancellationToken
): Promise<monaco.languages.CodeActionList> {
  const malloy = textModel.getValue();
  const problems: LogMessage[] = [];
  try {
    const model = await stubCompile(modelDef, malloy);
    if (model?.problems) {
      problems.push(...model.problems);
    }
  } catch (error) {
    if (error instanceof MalloyError) {
      problems.push(...error.problems);
    }
  }

  const actions: monaco.languages.CodeAction[] = [];

  for (const problem of problems) {
    if (problem.at?.range) {
      const par = problem.at.range;
      if (
        par.start.line + 1 === range.startLineNumber &&
        par.start.character + 1 === range.startColumn &&
        par.end.line + 1 === range.endLineNumber &&
        par.end.character + 1 === range.endColumn &&
        problem.replacement
      ) {
        const edit: monaco.languages.WorkspaceEdit = {
          edits: [
            {
              resource: textModel.uri,
              textEdit: {range, text: problem.replacement},
              versionId: undefined,
            },
          ],
        };

        const codeAction: monaco.languages.CodeAction = {
          title: `Replace with ${problem.replacement}`,
          kind: 'quickfix',
          edit,
        };
        actions.push(codeAction);
      }
    }
  }

  return {actions, dispose: () => {}};
}
