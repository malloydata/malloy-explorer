/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useRef} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as monaco from 'monaco-editor-core';
import stylex from '@stylexjs/stylex';
import {LSPContext} from '../../contexts/LSPContext';
import {initMonaco} from '../utils/monaco';
import {diagnostics} from '../../lsp';
import {registerModel} from '../../lsp/utils';

export interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | Malloy.Query) => void;
}

export default function CodeEditor({
  language,
  value,
  onChange,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [malloy] = React.useState<string>(value);
  const [ready, setReady] = React.useState(false);
  const {modelDef, modelUri} = React.useContext(LSPContext);

  useEffect(() => {
    const load = async () => {
      // TODO: Better handle cleanup
      await initMonaco();
      setReady(true);
    };
    void load();
  }, []);

  useEffect(() => {
    const disposables: monaco.IDisposable[] = [];
    if (!ready || !containerRef.current || !modelDef || !modelUri) {
      return () => {};
    }

    const uriString = modelUri.toString();
    registerModel(uriString, modelDef);

    const model = monaco.editor.createModel(
      malloy,
      'malloy',
      monaco.Uri.parse(uriString)
    );

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
          await diagnostics(uriString, newValue)
        );
      })
    );

    return () => disposables.forEach(disposable => disposable.dispose());
  }, [language, modelUri, malloy, onChange, ready, modelDef]);

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
