/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import * as React from 'react';
import {fontStyles} from '../styles';

export interface ListItemProps {
  /**
   * The label for the list item.
   */
  label: string;

  /**
   * The icon to display at the start of the list item.
   */
  startIcon?: React.ReactElement;

  /**
   * The badge to display in the list item.
   */
  badge?: React.ReactElement;

  /**
   * The icon to display at the end of the list item.
   */
  endIcon?: React.ReactElement;

  onClick: () => void;
}

export default function ListItem({
  label,
  startIcon,
  badge,
  endIcon,
  onClick,
}: ListItemProps) {
  return (
    <div {...stylex.props(styles.main)} onClick={onClick}>
      {startIcon && <>{startIcon}</>}
      <span {...stylex.props(fontStyles.body, styles.label)}>{label}</span>
      {badge && <>{badge}</>}
      {endIcon && <>{endIcon}</>}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    gap: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: {
      ':hover': '#DDE2E8',
    },
  },
  label: {
    flexGrow: 1,
  },
});
