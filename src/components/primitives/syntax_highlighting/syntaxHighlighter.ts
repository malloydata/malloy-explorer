import {MALLOY_GRAMMAR} from './malloyGrammar';
import {createHighlighter, HighlighterCore, LanguageRegistration} from 'shiki';
import {LineSpacing} from './transformers/lineSpacingTransformer';
import getTransformers from './transformers/transformers';

const STANDARD_LANGS = ['json', 'sql', 'md'] as const;
const SUPPORTED_THEMES = ['light-plus', 'dark-plus'] as const;

export type SupportedLang = (typeof STANDARD_LANGS)[number] | 'malloy';
export type SupportedTheme = (typeof SUPPORTED_THEMES)[number];

type HighlighterOptions = {
  lineSpacing?: LineSpacing;
  showLineNumbers?: boolean;
};

let highlighter: Promise<HighlighterCore>;
function getHighlighter() {
  if (highlighter) {
    return highlighter;
  }

  highlighter = createHighlighter({
    themes: [...SUPPORTED_THEMES],
    langs: [
      ...STANDARD_LANGS,
      {
        name: 'malloy',
        embeddedLangs: ['sql'],
        ...MALLOY_GRAMMAR,
      } as LanguageRegistration,
    ],
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
      showLineNumbers: showLineNumbers ?? true,
      lineSpacing: lineSpacing ?? 'double',
    }),
  });
  const elem = document.createElement('div');
  elem.innerHTML = highlighted;
  return elem;
}
