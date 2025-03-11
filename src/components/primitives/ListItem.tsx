/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import * as React from 'react';

interface ListItemProps {
  /**
   * The unique key for the list item.
   */
  key: string;
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
}

export default function ListItem({
  key,
  label,
  startIcon,
  badge,
  endIcon,
}: ListItemProps) {
  return (
    <div key={key} {...stylex.props(styles.main)}>
      {startIcon && <>{startIcon}</>}
      <span {...stylex.props(styles.label)}>{label}</span>
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
    height: '20px',
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
    fontFamily: 'SF Pro Text',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
});
