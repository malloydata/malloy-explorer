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
import {fontStyles} from '../primitives/styles';

/**
 * The Query Viewing and Editing panel.
 */
export function QueryEditor() {
  const {rootQuery} = useContext(QueryEditorContext);

  if (!rootQuery) {
    console.error('No a stable query available');
    return null;
  }

  const {definition} = rootQuery;

  return (
    <div {...stylex.props(fontStyles.body, styles.main)}>
      <Source definition={definition} />
      <Parameters definition={definition} />
      <Query definition={definition} />
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    gap: 8,
    padding: '4px 12px 12px 12px',
  },
});
