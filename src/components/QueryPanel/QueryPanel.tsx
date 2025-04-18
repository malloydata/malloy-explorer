/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';
import {QueryActionBar} from './QueryActionBar';
import {QueryEditor} from './QueryEditor';
import {ScrollableArea} from '../primitives';

interface QueryPanelProps {
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
}

export default function QueryPanel({runQuery}: QueryPanelProps) {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.header)}>
        <QueryActionBar runQuery={runQuery} />
      </div>
      <ScrollableArea>
        <div {...stylex.props(styles.content)}>
          <QueryEditor />
        </div>
      </ScrollableArea>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 1)',
    borderRight: '1px solid rgba(204, 211, 219, 1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 12px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 12px 12px 12px',
    gap: '8px',
  },
});
