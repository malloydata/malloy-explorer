/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  highlightPre,
  SupportedLang,
  SupportedTheme,
} from './syntax_highlighting/syntaxHighlighter';
import {LineSpacing} from './syntax_highlighting/transformers/lineSpacingTransformer';
import DOMElement from './DOMElement';

interface CodeBlockProps {
  /**
   * Code to be highlighted & displayed.
   */
  code: string;
  /**
   * Language used for syntax highlighting.
   */
  language: SupportedLang;
  /**
   * Display theme. Defaults 'light-plus'.
   */
  theme?: SupportedTheme;
  /**
   * Include 1-indexed line numbering. Defaults true.
   */
  lineNumbers?: boolean;
  /**
   * Line spacing. Defaults double.
   */
  spacing?: LineSpacing;
}

export default function CodeBlock({
  code,
  language,
  theme,
  lineNumbers,
  spacing,
}: CodeBlockProps) {
  const [codeEl, setCodeEl] = useState<HTMLElement>();

  useEffect(() => {
    let canceled = false;

    const updateCode = async () => {
      const html = await highlightPre(code, language, theme ?? 'light-plus', {
        showLineNumbers: lineNumbers ?? true,
        lineSpacing: spacing ?? 'double',
      });

      if (canceled) return;
      setCodeEl(html);
    };

    updateCode();

    return () => {
      canceled = true;
    };
  }, [code, language, lineNumbers, spacing, theme]);

  return <div>{codeEl && <DOMElement element={codeEl} />}</div>;
}
