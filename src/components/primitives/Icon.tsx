/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {ICON_MAP, SMALL_ICONS} from './icons';
import {iconColors} from './colors.stylex';

type IconName = keyof typeof ICON_MAP;

type Color = keyof typeof colorVariants;

interface IconProps {
  /**
   * The name of the icon to render.
   */
  name: IconName;
  /**
   * The color of the icon.
   */
  color?: Color;
  /**
   * Custom styles for the icon.
   */
  style?: StyleXStyles;
}

export default function Icon({name, color = 'primary', style}: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      {...stylex.props(
        styles.main,
        colorVariants[color],
        SMALL_ICONS.includes(name) && styles.scaleUp,
        style
      )}
    />
  );
}

const styles = stylex.create({
  main: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    overflow: 'visible',
  },
  scaleUp: {
    transform: 'scale(1.5)',
  },
});

const colorVariants = stylex.create({
  primary: {
    color: iconColors.primary,
  },
  secondary: {
    color: iconColors.secondary,
  },
  disabled: {
    color: iconColors.disabled,
  },
  primaryOnMedia: {
    color: iconColors.primaryOnMedia,
  },
  gray: {
    color: iconColors.gray,
  },
  purple: {
    color: iconColors.purple,
  },
  green: {
    color: iconColors.green,
  },
  cyan: {
    color: iconColors.cyan,
  },
});
