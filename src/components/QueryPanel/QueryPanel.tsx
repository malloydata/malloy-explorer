/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';
import {QueryActionBar} from './QueryActionBar';
import {QueryEditor} from './QueryEditor';
import CodeEditor from '../CodeEditor';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

interface QueryPanelProps {
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
  runRawQuery?: (source: Malloy.SourceInfo, query: string) => void;
}

export default function QueryPanel({runQuery, runRawQuery}: QueryPanelProps) {
  const {query, setQuery} = useContext(QueryEditorContext);

  return (
    <div {...stylex.props(styles.main)}>
      <QueryActionBar runQuery={runQuery} runRawQuery={runRawQuery} />
      {typeof query === 'string' ? (
        <CodeEditor language="malloy" value={query} onChange={setQuery} />
      ) : (
        <QueryEditor />
      )}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'rgba(255, 255, 255, 1)',
    borderRight: '1px solid rgba(204, 211, 219, 1)',
  },
});
