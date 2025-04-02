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
import {MalloyExplorerProvider, ResultPanel, SourcePanel} from '../src';
import * as Malloy from '@malloydata/malloy-interfaces';
import {modelInfo} from './sample_models/example_model';
import stylex from '@stylexjs/stylex';
import {QueryPanel} from '../src/components/QueryPanel';
import {fontStyles} from '../src/components/primitives/styles';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  const [query, setQuery] = useState<Malloy.Query | undefined>();
  return (
    <React.StrictMode>
      <MalloyExplorerProvider source={source} query={query} setQuery={setQuery}>
        <div {...stylex.props(styles.page)}>
          <div {...stylex.props(fontStyles.body, styles.banner)}>
            WARNING: This page shows all the components beside each other, but
            they do not actually work correctly yet.
          </div>
          <div {...stylex.props(styles.content)}>
            <SourcePanel source={source} query={query} setQuery={setQuery} />
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
            <ResultPanel
              source={source}
              draftQuery={query}
              setDraftQuery={setQuery}
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
});
