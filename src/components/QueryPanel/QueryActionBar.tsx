/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {useQueryBuilder} from '../../hooks/useQueryBuilder';
import {Button} from '../primitives';

/**
 * Source
 */
export interface QueryActionBarProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  clearQuery: () => void;
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
}

export function QueryActionBar({
  source,
  query,
  clearQuery,
  runQuery,
}: QueryActionBarProps) {
  const rootQuery = useQueryBuilder(source, query);
  return (
    <div {...stylex.props(styles.queryCard, actionBarStyles.root)}>
      <div {...stylex.props(actionBarStyles.title)}>Query</div>
      <div {...stylex.props(actionBarStyles.buttons)}>
        <Button
          onClick={() => clearQuery()}
          isDisabled={!rootQuery || rootQuery?.isEmpty()}
          label="Clear"
          variant="flat"
        />
        <Button
          icon="chevronRight"
          onClick={() => query && runQuery(source, query)}
          isDisabled={!rootQuery?.isRunnable()}
          label="Run"
          variant="primary"
        />
      </div>
    </div>
  );
}

const actionBarStyles = stylex.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    gap: 8,
  },
});
