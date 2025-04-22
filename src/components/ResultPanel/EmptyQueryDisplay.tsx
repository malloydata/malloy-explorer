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
  onSelectView: (view: Malloy.ViewInfo) => void;
}

export default function EmptyQueryDisplay({
  views,
  onSelectView,
}: EmptyQueryDisplay) {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.pageChild)}>
        <div {...stylex.props(styles.header, fontStyles.emphasized)}>
          Start with a Bookmarked View
        </div>
        <div {...stylex.props(styles.viewContainer)}>
          {views.slice(0, 3).map(v => (
            <BookmarkedView
              key={v.name}
              viewInfo={v}
              onClick={() => {
                onSelectView(v);
              }}
            />
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
    overflow: 'auto',
  },
  pageChild: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: '16px',
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
