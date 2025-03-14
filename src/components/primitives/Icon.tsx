/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {iconColorStyles} from './primitive-styles';
import {ICON_MAP, SMALL_ICONS} from './icons';

type IconName = keyof typeof ICON_MAP;

interface IconProps {
  /**
   * The name of the icon to render.
   */
  name: IconName;
  /**
   * The color of the icon.
   */
  color?: keyof typeof iconColorStyles;
  /**
   * Custom styles for the icon.
   */
  style?: StyleXStyles;
}

export default function Icon({name, color, style}: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      {...stylex.props(
        styles.main,
        iconColorStyles[color ?? 'primary'],
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
