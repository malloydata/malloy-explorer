/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as QB from '@malloydata/malloy-query-builder';
import {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MalloyExplorerProvider, QueryActionBar, QueryEditor} from '../src';
import * as Malloy from '@malloydata/malloy-interfaces';
import {MalloyPreview} from './components/MalloyPreview';
import {RawPreview} from './components/RawPreview';
import {
  modelInfo,
  queries as exampleQueries,
} from './sample_models/example_model';
import {topValues} from './sample_models/example_top_values';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const queries = [undefined, ...exampleQueries];

const App = () => {
  const [queryIdx, setQueryIdx] = useState(
    +(document.location.hash?.slice(1) || 0)
  );
  const [query, setQuery] = useState<Malloy.Query | string | undefined>(
    queries[queryIdx]
  );

  const onQueryChange = React.useCallback(
    (query: Malloy.Query | string | undefined) => {
      console.info('Pushing', query);
      window.history.pushState(
        query,
        window.document.title,
        window.document.location.toString()
      );
    },
    []
  );

  useEffect(() => {
    const popper = (event: PopStateEvent) => {
      console.info('Popped', event.state);
      setQuery(event.state);
    };
    window.addEventListener('popstate', popper);
    return () => window.removeEventListener('popstate', popper);
  }, []);

  useEffect(() => {
    document.location.hash = `#${queryIdx}`;
    setQuery(queries[queryIdx]);
  }, [queryIdx]);

  const [focusedNestViewPath, setFocusedNestViewPath] = React.useState<
    string[]
  >([]);

  return (
    <React.StrictMode>
      <MalloyExplorerProvider
        source={source}
        query={query}
        topValues={topValues}
        onFocusedNestViewPathChange={setFocusedNestViewPath}
        focusedNestViewPath={focusedNestViewPath}
        onQueryChange={onQueryChange}
      >
        <div style={{gap: 8, display: 'flex'}}>
          <div style={{padding: 8, width: 500}}>
            Query: {queryIdx}{' '}
            <button
              onClick={() => setQueryIdx((queryIdx + 1) % queries.length)}
            >
              Change Query
            </button>{' '}
            <button onClick={() => setQuery(queries[queryIdx])}>Reset</button>
            <hr />
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              <QueryActionBar
                runQuery={(source, query) => {
                  const qb = new QB.ASTQuery({source, query});
                  window.alert(qb.toMalloy());
                }}
                runRawQuery={query => {
                  window.alert(query);
                }}
              />
              <QueryEditor />
            </div>
          </div>
          <div style={{width: 'calc(100% - 500px)', padding: 8}}>
            <div>
              <MalloyPreview />
            </div>
            <hr />
            <div>
              <RawPreview />
            </div>
          </div>
        </div>
      </MalloyExplorerProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
