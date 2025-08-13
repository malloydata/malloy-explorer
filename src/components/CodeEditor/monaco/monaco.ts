/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Monaco from './monaco_shim';
import {shikiToMonaco} from '@shikijs/monaco';
import {getHighlighter} from '../../primitives/syntax_highlighting/syntaxHighlighter';
import {initLsp} from '../lsp';
import {HighlighterCore} from '@shikijs/types';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export async function initMonaco(): Promise<Monaco.IDisposable> {
  const monaco = Monaco.getMonaco();

  if (highlighterPromise) {
    // TODO: Better handle cleanup for multiple invocations
    return {dispose: () => {}};
  }
  highlighterPromise = getHighlighter();
  const highlighter = await highlighterPromise;

  monaco.languages.register({id: 'sql'});
  monaco.languages.register({id: 'malloy'});

  shikiToMonaco(highlighter, monaco);

  monaco.languages.setLanguageConfiguration(
    'malloy',
    MALLOY_LANGUAGE_CONFIGURATION
  );

  return initLsp();
}

const MALLOY_LANGUAGE_CONFIGURATION: Monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: '--',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    {open: '{', close: '}'},
    {open: '[', close: ']'},
    {open: '(', close: ')'},
    {open: '"', close: '"', notIn: ['string']},
    {open: "'", close: "'"},
    {open: '/*', close: ' */', notIn: ['string']},
  ],
  surroundingPairs: [
    {open: '{', close: '}'},
    {open: '[', close: ']'},
    {open: '(', close: ')'},
    {open: '"', close: '"'},
    {open: "'", close: "'"},
  ],
} as const;
