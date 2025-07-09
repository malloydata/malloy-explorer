/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as QueryBuilder from '@malloydata/malloy-query-builder';
import * as Malloy from '@malloydata/malloy-interfaces';
import type {DrillData} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  QueryPanel,
  MalloyExplorerProvider,
  ResultPanel,
  SourcePanel,
  ResizableCollapsiblePanel,
} from '../src';
import {modelInfo} from './sample_models/example_model';
import {exampleResult} from './sample_models/example_result';
import {topValues} from './sample_models/example_top_values';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const onDrill = (drillData: DrillData) => {
  console.info(drillData);
  window.alert('Drill!');
};

const App = () => {
  const [query, setQuery] = useState<Malloy.Query | undefined>();
  const [focusedNestViewPath, setFocusedNestViewPath] = React.useState<
    string[]
  >([]);

  return (
    <React.StrictMode>
      <MalloyExplorerProvider
        source={source}
        query={query}
        onQueryChange={setQuery}
        focusedNestViewPath={focusedNestViewPath}
        onFocusedNestViewPathChange={setFocusedNestViewPath}
        topValues={topValues}
        onDrill={onDrill}
      >
        <div {...stylex.props(styles.page)}>
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
              <QueryPanel
                runQuery={(source, query) => {
                  const qb = new QueryBuilder.ASTQuery({source, query});
                  window.alert(qb.toMalloy());
                }}
              />
            </ResizableCollapsiblePanel>
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
              options={{showRawQuery: true}}
            />
          </div>
        </div>
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
