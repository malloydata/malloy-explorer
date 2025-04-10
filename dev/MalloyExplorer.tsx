/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as QueryBuilder from '@malloydata/malloy-query-builder';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  ExplorerPanelsContext,
  QueryPanel,
  ResizeBar,
  MalloyExplorerProvider,
  ResultPanel,
  SourcePanel,
} from '../src';
import {modelInfo} from './sample_models/example_model';
import {exampleResult} from './sample_models/example_result';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  const [query, setQuery] = useState<Malloy.Query | undefined>();
  const [isSourcePanelOpen, setIsSourcePanelOpen] = useState(true);
  const [sourcePanelWidth, setSourcePanelWidth] = useState(280);
  const [queryPanelWidth, setQueryPanelWidth] = useState(360);

  return (
    <React.StrictMode>
      <MalloyExplorerProvider source={source} query={query} setQuery={setQuery}>
        <ExplorerPanelsContext.Provider
          value={{
            isSourcePanelOpen,
            setIsSourcePanelOpen,
          }}
        >
          <div {...stylex.props(styles.page)}>
            <div {...stylex.props(styles.content)}>
              {isSourcePanelOpen && (
                <div
                  {...stylex.props(styles.panel)}
                  style={{width: `${sourcePanelWidth}px`}}
                >
                  <SourcePanel
                    source={source}
                    query={query}
                    setQuery={setQuery}
                  />
                  <ResizeBar
                    minWidth={180}
                    width={sourcePanelWidth}
                    onWidthChange={setSourcePanelWidth}
                  />
                </div>
              )}

              <div
                {...stylex.props(styles.panel)}
                style={{width: `${queryPanelWidth}px`}}
              >
                <QueryPanel
                  source={source}
                  query={query}
                  setQuery={setQuery}
                  runQuery={(source, query) => {
                    const qb = new QueryBuilder.ASTQuery({source, query});
                    window.alert(qb.toMalloy());
                  }}
                  showSource={false}
                />
                <ResizeBar
                  minWidth={230}
                  width={queryPanelWidth}
                  onWidthChange={setQueryPanelWidth}
                />
              </div>

              <ResultPanel
                source={source}
                draftQuery={query}
                setDraftQuery={setQuery}
                submittedQuery={
                  query
                    ? {
                        executionState: 'finished',
                        response: {
                          result: exampleResult,
                        },
                        query,
                        queryResolutionStartMillis: Date.now(),
                        onCancel: () => {},
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </ExplorerPanelsContext.Provider>
      </MalloyExplorerProvider>
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
    backgroundColor: 'rgba(225, 240, 255, 1)',
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
