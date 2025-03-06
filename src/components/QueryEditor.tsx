/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';

import {Query} from './Query';
import {Source} from './Source';
import {Parameters} from './Parameters';
import {useQueryBuilder} from '../hooks/useQueryBuilder';

export interface QueryEditorProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
}

const queryExplorerStyles = stylex.create({
  main: {
    fontFamily: 'monospace',
    lineHeight: 1.8,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

/**
 * The Query Viewing and Editing panel. Takes a `SourceInfo` object
 * and an optional `Query` object.
 *
 * Wrap in a [QueryEditorContext] with a `setQuery` method to support editing.
 *
 * @param source The source object to be used for query building.
 * @param query A query to be edited. Omit for a new query.
 * @returns
 */
export function QueryEditor({source, query}: QueryEditorProps) {
  const rootQuery = useQueryBuilder(source, query);

  if (!rootQuery) {
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
