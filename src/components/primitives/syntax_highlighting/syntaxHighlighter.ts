import {MALLOY_GRAMMAR} from './malloyGrammar';
import getTransformers, {TransformerOptions} from './transformers/transformers';

import {
  createHighlighterCore,
  HighlighterCore,
  LanguageRegistration,
} from '@shikijs/core';
import lightPlus from '@shikijs/themes/light-plus';
import darkPlus from '@shikijs/themes/dark-plus';
import sql from '@shikijs/langs/sql';
/**
 * JS engine is smaller and recommended for browser.
 * Textmate grammar regexp are written for the Oniguruma engine written in C
 * Oniguruma regexp is transpiled to js's RegExp here, but may not have full compatibility
 * if encounter issues, switch to the Oniguruma engine and import the wasm binary
 * from shiki
 */
import {createJavaScriptRegexEngine} from '@shikijs/engine-javascript';

export type SupportedLang = 'sql' | 'malloy';
export type SupportedTheme = 'light-plus' | 'dark-plus';

type HighlighterOptions = {} & TransformerOptions;

let highlighter: Promise<HighlighterCore>;
function getHighlighter() {
  if (highlighter) {
    return highlighter;
  }

  highlighter = createHighlighterCore({
    themes: [lightPlus, darkPlus],
    langs: [
      sql,
      {
        name: 'malloy',
        embeddedLangs: ['sql'],
        ...MALLOY_GRAMMAR,
      } as unknown as LanguageRegistration,
    ],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighter;
}

getHighlighter();

export async function highlightPre(
  code: string,
  lang: SupportedLang,
  theme: SupportedTheme,
  {showLineNumbers, lineSpacing}: HighlighterOptions
): Promise<HTMLDivElement> {
  const highlighter = await getHighlighter();
  const highlighted = highlighter.codeToHtml(code, {
    lang: lang,
    theme: theme,
    transformers: getTransformers({
      showLineNumbers: showLineNumbers,
      lineSpacing: lineSpacing,
    }),
  });
  const elem = document.createElement('div');
  elem.innerHTML = highlighted;
  return elem;
}
