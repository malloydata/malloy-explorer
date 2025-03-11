/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColorStyles, textColorStyles} from './primitive-styles';

interface BadgeProps {
  /**
   * The label displayed on the badge.
   */
  label: string;
  /**
   * The color scheme of the badge, which affects both the background and text colors.
   */
  color: keyof typeof backgroundColorStyles & keyof typeof textColorStyles;
}

export default function Badge({label, color}: BadgeProps) {
  return (
    <span {...stylex.props(styles.main, backgroundColorStyles[color])}>
      <span {...stylex.props(styles.label, textColorStyles[color])}>
        {label}
      </span>
    </span>
  );
}

const styles = stylex.create({
  main: {
    display: 'inline-flex',
    height: '20px',
    minWidth: '20px',
    padding: '2px 4px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
    borderRadius: '9999px',
  },
  label: {
    overflow: 'hidden',
    textAlign: 'center',
    leadingTrim: 'both',
    textEdge: 'cap',
    textOverflow: 'ellipsis',
    fontFamily: 'SF Pro Text',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '-0.24px',
  },
});
