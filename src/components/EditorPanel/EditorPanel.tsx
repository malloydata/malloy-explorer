import React, {useEffect, useRef} from 'react';
import * as monaco from 'monaco-editor-core';
import {shikiToMonaco} from '@shikijs/monaco';
import {getHighlighter} from '../primitives/syntax_highlighting/syntaxHighlighter';
// @ts-expect-error no types
import EditorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker';
import stylex from '@stylexjs/stylex';

export interface EditorPanelProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export default function EditorPanel({
  language,
  value,
  onChange,
}: EditorPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const load = async () => {
      const highlighter = await getHighlighter();

      // @ts-expect-error no types
      window.MonacoEnvironment = {
        getWorker(_workerId: string, _label: string) {
          return new EditorWorker();
        },
      };

      // Register the languageIds first. Only registered languages will be highlighted.
      monaco.languages.register({id: 'sql'});
      monaco.languages.register({id: 'malloy'});

      shikiToMonaco(highlighter, monaco);
    };
    void load();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const editor = monaco.editor.create(containerRef.current, {
        value,
        language,
        automaticLayout: true,
        theme: 'light-plus',
        wrappingStrategy: 'simple',
        wordWrap: 'on',
        minimap: {enabled: false},
      });

      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        onChange(newValue);
      });

      return () => editor.dispose();
    }

    return () => {};
  }, [language, value, onChange]);

  return <div ref={containerRef} {...stylex.props(styles.container)} />;
}

const styles = stylex.create({
  container: {
    paddingTop: 4,
    borderTop: '1px solid #CCD3DB',
    width: '100%',
    height: 'calc(100% - 4px)',
  },
});
