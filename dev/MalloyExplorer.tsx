/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as monaco from 'monaco-editor-core';
import * as Malloy from '@malloydata/malloy-interfaces';
import '../src/components/CodeEditor/monaco/monaco_worker';
import stylex from '@stylexjs/stylex';
import {darkThemes} from '../src/components/primitives/colors.stylex';
import {useCallback, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  QueryPanel,
  MalloyExplorerProvider,
  ResultPanel,
  SourcePanel,
  ResizableCollapsiblePanel,
  SubmittedQuery,
  CodeEditorContext,
} from '../src';
import {topValues} from './sample_models/example_top_values';
import {initCodeEditorContext, runQuery} from './utils/runtime';
import {malloyToQuery, ModelDef, modelDefToModelInfo} from '@malloydata/malloy';

const modelUri = new URL(
  '../malloy-samples/faa/flights.malloy',
  window.document.location.toString()
);

const App = () => {
  const [query, setQuery] = useState<Malloy.Query | string | undefined>();
  const [model, setModel] = useState<Malloy.ModelInfo | undefined>();
  const [modelDef, setModelDef] = useState<ModelDef>();
  const [source, setSource] = useState<Malloy.SourceInfo | undefined>();
  const [focusedNestViewPath, setFocusedNestViewPath] = useState<string[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState<SubmittedQuery>();

  useEffect(() => {
    const compile = async () => {
      const modelDef = await initCodeEditorContext(modelUri);
      setModelDef(modelDef);
      const model = modelDefToModelInfo(modelDef);
      setModel(model);
      setSource(model.entries.at(-1));
    };
    compile();
  }, []);

  const onRunQuery = useCallback(
    (_source: Malloy.SourceInfo, query: Malloy.Query | string) => {
      const submittedQuery = {
        executionState: 'compiling' as const,
        query,
        queryResolutionStartMillis: Date.now(),
        onCancel: () => {},
      };
      setSubmittedQuery(submittedQuery);
      runQuery(modelUri, query).then(({result}) =>
        setSubmittedQuery({
          ...submittedQuery,
          executionState: 'finished' as const,
          response: {
            result,
          },
        })
      );
    },
    []
  );

  if (!model || !source) {
    return null;
  }

  return (
    <React.StrictMode>
      <CodeEditorContext.Provider
        value={{monaco, modelDef, modelUri, malloyToQuery}}
      >
        <MalloyExplorerProvider
          source={source}
          query={query}
          onQueryChange={setQuery}
          focusedNestViewPath={focusedNestViewPath}
          onFocusedNestViewPathChange={setFocusedNestViewPath}
          topValues={topValues}
        >
          <div {...stylex.props(styles.page, ...darkThemes)}>
            <div {...stylex.props(styles.content)}>
              <ResizableCollapsiblePanel
                isInitiallyExpanded={true}
                initialWidth={280}
                minWidth={180}
                icon="database"
                title={source.name}
              >
                <SourcePanel onRefresh={() => {}} />
              </ResizableCollapsiblePanel>
              <ResizableCollapsiblePanel
                isInitiallyExpanded={true}
                initialWidth={360}
                minWidth={280}
                icon="filterSliders"
                title="Query"
              >
                <QueryPanel runQuery={onRunQuery} runQueryString={onRunQuery} />
              </ResizableCollapsiblePanel>
              <ResultPanel
                source={source}
                draftQuery={query}
                setDraftQuery={setQuery}
                submittedQuery={submittedQuery}
                options={{showRawQuery: true}}
              />
            </div>
          </div>
        </MalloyExplorerProvider>
      </CodeEditorContext.Provider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  banner: {
    height: '30px',
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '2px 10px',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    height: '100%',
    overflowY: 'auto',
  },
  panel: {
    position: 'relative',
    height: '100%',
    flex: '0 0 auto',
  },
});
