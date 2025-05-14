/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {mainVars, labelVars} from './badge.stylex';
import {backgroundColors, textColors} from './colors.stylex';
import {fontStyles} from './styles';
import Icon from './Icon';
import {ICON_MAP} from './utils/icon';

const DEFAULT_COLOR = 'gray';

type Color = keyof typeof colorVariants;

interface BadgeProps {
  /**
   * The label displayed on the badge.
   */
  label: string;
  /**
   * The color scheme of the badge, which affects both the background and text colors.
   */
  color?: Color;

  /**
   * Optional icon; displayed to left of badge text
   */
  icon?: keyof typeof ICON_MAP;

  /**
   * Optional additional styling for the badge
   */
  customStyle?: StyleXStyles;
}

export default function Badge({
  label,
  color = DEFAULT_COLOR,
  icon,
  customStyle,
}: BadgeProps) {
  return (
    <div {...stylex.props(styles.main, colorVariants[color], customStyle)}>
      {icon && <Icon color={color} name={icon} />}
      <div
        data-testid="badge-label"
        {...stylex.props(fontStyles.badge, styles.label)}
      >
        {label}
      </div>
    </div>
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
    background: mainVars.background,
  },
  label: {
    overflow: 'hidden',
    textAlign: 'center',
    leadingTrim: 'both',
    textEdge: 'cap',
    textOverflow: 'ellipsis',
    color: labelVars.color,
  },
});

const colorVariants = stylex.create({
  gray: {
    [mainVars.background]: backgroundColors.gray,
    [labelVars.color]: textColors.primary,
  },
  purple: {
    [mainVars.background]: backgroundColors.purple,
    [labelVars.color]: textColors.purple,
  },
  green: {
    [mainVars.background]: backgroundColors.green,
    [labelVars.color]: textColors.green,
  },
  cyan: {
    [mainVars.background]: backgroundColors.cyan,
    [labelVars.color]: textColors.cyan,
  },
});
