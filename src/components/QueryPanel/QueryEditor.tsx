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
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {ScrollableArea} from '../primitives';
import {fontStyles} from '../primitives/styles';

/**
 * The Query Viewing and Editing panel.
 */
export function QueryEditor() {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);

  if (!rootQuery) {
    console.error('Missing <MalloyExplorerProvider>');
    return null;
  }

  return (
    <ScrollableArea>
      <div {...stylex.props(fontStyles.body, styles.main)}>
        <Source rootQuery={rootQuery} />
        <Parameters rootQuery={rootQuery} />
        <Query rootQuery={rootQuery} query={rootQuery} setQuery={setQuery} />
      </div>
    </ScrollableArea>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '4px 12px 12px 12px',
  },
});
