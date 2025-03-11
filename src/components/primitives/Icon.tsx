/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex from '@stylexjs/stylex';
import {iconColorStyles} from './primitive-styles';

import ChevronRight from '../../assets/chevrons/chevron_right.svg?react';
import TypeIconDatabase from '../../assets/types/type-icon-database.svg?react';
import TypeIconNumberMeasure from '../../assets/types/type-icon-number-measure.svg?react';
import TypeIconProjection from '../../assets/types/type-icon-projection.svg?react';
import TypeIconString from '../../assets/types/type-icon-string.svg?react';

const ICON_MAP = {
  chevronRight: ChevronRight,
  database: TypeIconDatabase,
  dimension: TypeIconString,
  measure: TypeIconNumberMeasure,
  view: TypeIconProjection,
} as const;

type IconName = keyof typeof ICON_MAP;

interface IconProps {
  /**
   * The name of the icon to render.
   */
  name: IconName;
  /**
   * The color of the icon.
   */
  color: keyof typeof iconColorStyles;
}

export default function Icon({name, color}: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent {...stylex.props(styles.main, iconColorStyles[color])} />
  );
}

const styles = stylex.create({
  main: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    transform: 'scale(1.5)',
  },
});
