/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';

interface CardProps {
  /**
   * Optional header content for the Card.
   */
  header?: React.ReactNode;

  children: React.ReactNode;

  style?: StyleXStyles;
}

export default function Card({header, children, style}: CardProps) {
  return (
    <div {...stylex.props(styles.container, style)}>
      <div {...stylex.props(styles.header)}>{header}</div>
      <div {...stylex.props(styles.content)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  content: {paddingTop: '8px', flexGrow: '1', display: 'flex'},
  header: {padding: '0px'},
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF',
    borderRadius: '12px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#CCD3DB',
    padding: '12px',
    flexShrink: 0,
  },
});
