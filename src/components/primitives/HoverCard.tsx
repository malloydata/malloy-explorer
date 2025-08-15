/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useContext} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {backgroundColors, utility} from './colors.stylex';
import * as React from 'react';
import {fontStyles} from './styles';
import {ThemeContext} from './contexts/ThemeContext';

interface HoverCardProps {
  children: React.ReactNode;
  customStyle?: StyleXStyles;
}

export function HoverCard({children, customStyle}: HoverCardProps) {
  const {theme} = useContext(ThemeContext);
  return (
    <div
      {...stylex.props(styles.container, fontStyles.body, customStyle, theme)}
    >
      {children}
    </div>
  );
}

const styles = stylex.create({
  container: {
    boxShadow: utility.elevationMedium,
    backgroundColor: backgroundColors.surface,
    borderRadius: '12px',
    padding: '12px',

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});
