/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import stylex from '@stylexjs/stylex';

import {Query} from './Query';
import {Source} from './Source';
import {Parameters} from './Parameters';
import {QueryContext} from '../contexts/QueryContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';

export interface QueryExplorerProps {}

const queryExplorerStyles = stylex.create({
  main: {
    fontFamily: 'monospace',
    lineHeight: 1.8,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

export function QueryExplorer({}: QueryExplorerProps) {
  const {source, query} = useContext(QueryContext);
  const rootQuery = useQueryBuilder(source, query);

  if (!source || !query || !rootQuery) {
    return null;
  }

  return (
    <div {...stylex.props(queryExplorerStyles.main)}>
      <Source rootQuery={rootQuery} />
      <Parameters rootQuery={rootQuery} />
      <Query rootQuery={rootQuery} query={rootQuery} />
    </div>
  );
}
