/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex, {StyleXStyles} from '@stylexjs/stylex';
import * as React from 'react';
import {fontStyles} from './styles';

interface HoverCardProps {
  children: React.ReactNode;
  customStyle?: StyleXStyles;
}

export function HoverCard({children, customStyle}: HoverCardProps) {
  return (
    <div {...stylex.props(styles.container, fontStyles.body, customStyle)}>
      {children}
    </div>
  );
}

const styles = stylex.create({
  container: {
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '12px',

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});
