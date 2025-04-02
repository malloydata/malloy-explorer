/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {ICON_MAP, IconType, SMALL_ICONS} from './utils/icon';
import {iconColors} from './colors.stylex';

type Color = keyof typeof colorVariants;

interface IconProps {
  /**
   * The name of the icon to render.
   */
  name: IconType;
  /**
   * The color of the icon.
   */
  color?: Color;
  /**
   * Custom styles for the icon.
   */
  customStyle?: StyleXStyles;
}

export default function Icon({
  name,
  color = 'primary',
  customStyle,
}: IconProps) {
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
        customStyle
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
    transform: 'scale(1.33)',
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
  warning: {
    color: iconColors.warning,
  },
});
