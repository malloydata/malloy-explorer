/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {BookmarkedView} from './BookmarkedView';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';

export interface EmptyQueryDisplay {
  views: Array<Malloy.ViewInfo>;
}

export default function EmptyQueryDisplay({views}: EmptyQueryDisplay) {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.pageChild)}>
        <h1 {...stylex.props(fontStyles.emphasized)}>
          Start with a Bookmarked View
        </h1>
        <div {...stylex.props(styles.viewContainer)}>
          {views.slice(0, 3).map(v => (
            <BookmarkedView key={v.name} viewInfo={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  pageChild: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    width: '90%',
  },
});
