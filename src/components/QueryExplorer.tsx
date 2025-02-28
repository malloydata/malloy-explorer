/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {ErrorElement} from './ErrorElement';
import stylex from '@stylexjs/stylex';

import {Query} from './Query';
import {Source} from './Source';
import {Parameters} from './Parameters';
import {QueryContext} from '../contexts/QueryContext';

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

  if (!source || !query) {
    return null;
  }

  return (
    <ErrorElement fallback={<div>Doh!</div>}>
      <div {...stylex.props(queryExplorerStyles.main)}>
        <Source source={source} />
        <Parameters parameters={source.parameters} />
        <Query source={source} query={query} path={[]} />
      </div>
    </ErrorElement>
  );
}
