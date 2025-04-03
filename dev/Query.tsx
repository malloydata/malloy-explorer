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
  const [query, setQuery] = useState<Malloy.Query | undefined>(
    queries[queryIdx]
  );

  useEffect(() => {
    document.location.hash = `#${queryIdx}`;
    setQuery(queries[queryIdx]);
  }, [queryIdx]);

  return (
    <React.StrictMode>
      <MalloyExplorerProvider
        source={source}
        query={query}
        setQuery={setQuery}
        topValues={topValues}
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
                source={source}
                query={query}
                clearQuery={() => setQuery(undefined)}
                runQuery={(source, query) => {
                  const qb = new QB.ASTQuery({source, query});
                  window.alert(qb.toMalloy());
                }}
              />
              <QueryEditor source={source} query={query} setQuery={setQuery} />
            </div>
          </div>
          <div>
            <MalloyPreview source={source} query={query} />
            <hr />
            {query ? (
              <RawPreview source={source} query={query} />
            ) : (
              <div>No query</div>
            )}
          </div>
        </div>
      </MalloyExplorerProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
