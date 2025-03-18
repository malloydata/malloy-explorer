/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import * as React from 'react';
import ListItem, {ListItemProps} from './ListItem';

interface ListProps {
  /**
   * The list items to render.
   */
  children: React.ReactElement<ListItemProps, typeof ListItem>[];
}

export default function List({children}: ListProps) {
  return (
    <div {...stylex.props(styles.main)}>
      {React.Children.map(children, child => child)}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});
