/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from '../primitives/colors.stylex';
import * as Malloy from '@malloydata/malloy-interfaces';
import {QueryActionBar} from './QueryActionBar';
import {QueryEditor} from './QueryEditor';
import CodeEditor from '../CodeEditor';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {ThemeContext} from '../primitives/contexts/ThemeContext';

interface QueryPanelProps {
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
  runQueryString?: (source: Malloy.SourceInfo, query: string) => void;
}

export default function QueryPanel({
  runQuery,
  runQueryString,
}: QueryPanelProps) {
  const {theme} = useContext(ThemeContext);
  const {query, setQuery} = useContext(QueryEditorContext);

  return (
    <div {...stylex.props(styles.main, theme)}>
      <QueryActionBar runQuery={runQuery} runQueryString={runQueryString} />
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
    background: backgroundColors.app,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: backgroundColors.divider,
  },
});
