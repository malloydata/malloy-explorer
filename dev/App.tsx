/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MalloyPreview, QueryExplorer, RawPreview} from '../src';
import {QueryContext} from '../src/contexts/QueryContext';
import * as Malloy from '@malloydata/malloy-interfaces';
import {modelInfo, queries} from './example_model';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  const [queryIdx, setQueryIdx] = useState(0);
  const [query, setQuery] = useState<Malloy.Query>(queries[queryIdx]);

  useEffect(() => {
    setQuery(queries[queryIdx]);
  }, [queryIdx]);

  return (
    <QueryContext.Provider value={{query, setQuery, source}}>
      <div style={{width: 500}}>
        <button onClick={() => setQueryIdx((queryIdx + 1) % queries.length)}>
          Change Query
        </button>{' '}
        <span>{queryIdx}</span>
        <hr />
        <QueryExplorer />
        <hr />
        <MalloyPreview source={source} query={query} />
        <hr />
        <RawPreview source={source} query={query} />
      </div>
    </QueryContext.Provider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
