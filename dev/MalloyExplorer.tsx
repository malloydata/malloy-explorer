/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as QueryBuilder from '@malloydata/malloy-query-builder';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  MalloyExplorerProvider,
  QueryActionBar,
  QueryEditor,
  ResultPanel,
  SourcePanel,
} from '../src';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  modelInfo,
  queries as exampleQueries,
} from './sample_models/example_model';
import stylex from '@stylexjs/stylex';

const App = () => {
  const [source, _setSource] = useState<Malloy.SourceInfo>(
    modelInfo.entries.at(-1) as Malloy.SourceInfo
  );
  const [query, setQuery] = useState<Malloy.Query | undefined>(
    exampleQueries[0]
  );

  return (
    <MalloyExplorerProvider>
      <div {...stylex.props(styles.banner)}>
        WARNING: This page shows all the components beside each other, but they
        do not actually work correctly yet.
      </div>
      <div {...stylex.props(styles.page)}>
        <div {...stylex.props(styles.sourceColumn)}>
          <SourcePanel source={source} />
        </div>
        <div {...stylex.props(styles.queryColumn)}>
          <QueryActionBar
            source={source}
            query={query}
            clearQuery={() => setQuery(undefined)}
            runQuery={(source, query) => {
              const qb = new QueryBuilder.ASTQuery({source, query});
              const malloyText = qb.toMalloy();
              console.info(malloyText);
            }}
          />
          <QueryEditor source={source} query={query} setQuery={setQuery} />
        </div>
        <div {...stylex.props(styles.resultsColumn)}>
          <ResultPanel
            source={source}
            draftQuery={query}
            setDraftQuery={q => setQuery(q)}
            submittedQuery={undefined}
          />
        </div>
      </div>
    </MalloyExplorerProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
  },
  sourceColumn: {},
  queryColumn: {
    flex: '0 0 360px',
  },
  resultsColumn: {
    flex: '1 1 auto',
  },
  banner: {
    height: '30px',
    backgroundColor: 'rgba(225, 240, 255, 1)',
    display: 'flex',
    padding: '2px 10px',
    alignItems: 'center',
  },
});
