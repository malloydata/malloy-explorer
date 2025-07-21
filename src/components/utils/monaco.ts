/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as monaco from 'monaco-editor-core';
import {shikiToMonaco} from '@shikijs/monaco';
import {getHighlighter} from '../primitives/syntax_highlighting/syntaxHighlighter';
import {initLsp} from '../../lsp';
import {HighlighterCore} from '@shikijs/types';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export async function initMonaco(): Promise<monaco.IDisposable> {
  if (highlighterPromise) {
    // TODO: Better handle cleanup for multiple invocations
    return {dispose: () => {}};
  }
  highlighterPromise = getHighlighter();
  const highlighter = await highlighterPromise;

  monaco.languages.register({id: 'sql'});
  monaco.languages.register({id: 'malloy'});

  shikiToMonaco(highlighter, monaco);

  return initLsp();
}
