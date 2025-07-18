/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useRef} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as monaco from 'monaco-editor-core';
import {shikiToMonaco} from '@shikijs/monaco';
import {getHighlighter} from '../primitives/syntax_highlighting/syntaxHighlighter';
import stylex from '@stylexjs/stylex';
import EditorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker';
import {
  diagnostics,
  provideCodeActions,
  provideDefinition,
  provideDocumentSymbols,
  provideHover,
} from '../../lsp';
import {LSPContext} from '../../contexts/LSPContext';
// import MalloyEditorWorker from '../../workers/editor_worker?worker';

// @ts-expect-error no types
window.MonacoEnvironment = {
  getWorker(_workerId: string, _label: string) {
    return new EditorWorker();
  },
};

export interface EditorPanelProps {
  language: string;
  value: string;
  onChange: (value: string | Malloy.Query) => void;
}

export default function EditorPanel({
  language,
  value,
  onChange,
}: EditorPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [malloy] = React.useState<string>(value);
  const [ready, setReady] = React.useState(false);
  const {modelDef} = React.useContext(LSPContext);

  useEffect(() => {
    const load = async () => {
      const highlighter = await getHighlighter();

      monaco.languages.register({id: 'sql'});
      monaco.languages.register({id: 'malloy'});

      shikiToMonaco(highlighter, monaco);

      setReady(true);
    };
    void load();
  }, []);

  useEffect(() => {
    const disposables: monaco.IDisposable[] = [];
    if (!ready || !containerRef.current || !modelDef) {
      return () => {};
    }

    const model = monaco.editor.createModel(malloy, 'malloy');
    const editor = monaco.editor.create(containerRef.current, {
      model,
      language,
      automaticLayout: true,
      theme: 'light-plus',
      wrappingStrategy: 'simple',
      wordWrap: 'on',
      minimap: {enabled: false},
    });

    disposables.push(model, editor);

    disposables.push(
      editor.onDidChangeModelContent(async () => {
        const newValue = editor.getValue();
        onChange(newValue);
        monaco.editor.setModelMarkers(
          model,
          'malloy',
          await diagnostics(modelDef, newValue)
        );
      })
    );

    disposables.push(
      monaco.languages.registerHoverProvider('malloy', {
        provideHover: (...args) => provideHover(modelDef, ...args),
      }),
      monaco.languages.registerDefinitionProvider('malloy', {
        provideDefinition: (...args) => provideDefinition(modelDef, ...args),
      }),
      monaco.languages.registerCodeActionProvider('malloy', {
        provideCodeActions: (...args) => provideCodeActions(modelDef, ...args),
      }),
      monaco.languages.registerDocumentSymbolProvider('malloy', {
        provideDocumentSymbols: (...args) =>
          provideDocumentSymbols(modelDef, ...args),
      })
    );

    return () => disposables.forEach(disposable => disposable.dispose());
  }, [language, modelDef, malloy, onChange, ready]);

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
