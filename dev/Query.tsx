/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MalloyPreview, QueryExplorer, RawPreview} from '../src';
import {ErrorElement} from '../src/components/ErrorElement';
import {QueryContext} from '../src/contexts/QueryContext';
import * as Malloy from '@malloydata/malloy-interfaces';
import {modelInfo, queries} from './example_model';
import {TooltipProvider} from '@radix-ui/react-tooltip';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  const [queryIdx, setQueryIdx] = useState(
    +(document.location.hash?.slice(1) || 0)
  );
  const [query, setQuery] = useState<Malloy.Query>(queries[queryIdx]);

  useEffect(() => {
    document.location.hash = `#${queryIdx}`;
    setQuery(queries[queryIdx]);
  }, [queryIdx]);

  return (
    <TooltipProvider>
      <QueryContext.Provider value={{query, setQuery, source}}>
        <div style={{width: 500}}>
          Query: {queryIdx}{' '}
          <button onClick={() => setQueryIdx((queryIdx + 1) % queries.length)}>
            Change Query
          </button>{' '}
          <button onClick={() => setQuery(queries[queryIdx])}>Reset</button>
          <hr />
          <ErrorElement fallback={<div>Oops</div>}>
            <QueryExplorer />
          </ErrorElement>
          <hr />
          <MalloyPreview source={source} query={query} />
          <hr />
          <RawPreview source={source} query={query} />
        </div>
      </QueryContext.Provider>
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
