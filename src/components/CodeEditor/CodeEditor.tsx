/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useContext, useEffect, useRef, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Monaco from '../utils/monaco_shim';
import stylex from '@stylexjs/stylex';
import {LSPContext} from '../../contexts/LSPContext';
import {initMonaco} from '../utils/monaco';
import {diagnostics} from '../../lsp';
import {registerModel} from '../../lsp/utils';
import {styles as componentStyles} from '../styles';
import {Button, DropdownMenu, DropdownMenuItem, Icon} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {fontStyles} from '../primitives/styles';

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
  const {setQuery} = useContext(QueryEditorContext);
  const [validStableQuery, setValidStableQuery] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [malloy] = React.useState<string>(value);
  const [ready, setReady] = React.useState(false);
  const {modelDef, modelUri, malloyToQuery} = React.useContext(LSPContext);
  const [editor, setEditor] =
    React.useState<Monaco.editor.IStandaloneCodeEditor>();
  const monaco = Monaco.getMonaco();

  useEffect(() => {
    const load = async () => {
      // TODO: Better handle cleanup
      await initMonaco();
      setReady(true);
    };
    void load();
  }, []);

  useEffect(() => {
    const disposables: Monaco.IDisposable[] = [];
    if (!ready || !editorRef.current || !modelDef || !modelUri) {
      return () => {};
    }

    const updateDiagnostics = async (malloy: string) => {
      const markers = await diagnostics(uriString, malloy);
      setValidStableQuery(markers.length === 0);
      monaco.editor.setModelMarkers(model, 'malloy', markers);
    };

    const uriString = modelUri.toString();
    registerModel(uriString, modelDef);

    const model = monaco.editor.createModel(
      malloy,
      'malloy',
      monaco.Uri.parse(uriString)
    );

    const editor = monaco.editor.create(editorRef.current, {
      model,
      language,
      automaticLayout: true,
      theme: 'light-plus',
      wrappingStrategy: 'simple',
      wordWrap: 'on',
      minimap: {enabled: false},
    });

    setEditor(editor);
    disposables.push(model, editor);

    disposables.push(
      editor.onDidChangeModelContent(async () => {
        const newValue = editor.getValue();
        onChange(newValue);
        updateDiagnostics(newValue);
      })
    );

    void updateDiagnostics(malloy);

    return () => disposables.forEach(disposable => disposable.dispose());
  }, [language, modelUri, monaco, malloy, onChange, ready, modelDef]);

  useEffect(() => {
    if (editor && value !== editor.getValue()) {
      editor.setValue(value);
    }
  }, [editor, value]);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(componentStyles.queryCard, styles.controls)}>
        <div
          {...stylex.props(componentStyles.labelWithIcon, fontStyles.largeBody)}
        >
          <Icon name="malloy" />
          Malloy Editor
        </div>
        {malloyToQuery ? (
          <DropdownMenu
            trigger={
              <Button
                variant="flat"
                icon="meatballs"
                size="compact"
                tooltip="More Actions"
              />
            }
          >
            <DropdownMenuItem
              icon="malloy"
              label="Use Query Editor"
              onClick={() => {
                if (malloy && malloyToQuery && validStableQuery) {
                  const {query} = malloyToQuery(value);
                  setQuery(query);
                }
              }}
              disabled={!validStableQuery}
            />
          </DropdownMenu>
        ) : null}
      </div>
      <div ref={editorRef} {...stylex.props(styles.editor)} />
    </div>
  );
}

const styles = stylex.create({
  container: {
    paddingTop: 4,
    borderTop: '1px solid #CCD3DB',
    width: '100%',
    height: 'calc(100% - 4px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  controls: {
    margin: '4px 12px 0 12px',
    flexGrow: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editor: {
    flexGrow: 1,
  },
});
