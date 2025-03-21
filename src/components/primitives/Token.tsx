/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import Icon from './Icon';
import {iconVars, labelVars} from './token.stylex';
import {iconColors, textColors} from './colors.stylex';
import {fontStyles} from './styles';
import {IconType} from './utils/icon';

export const DEFAULT_TOKEN_COLOR = 'default';

export type TokenColor = keyof typeof colorVariants;

export interface TokenProps {
  /**
   * The label to display on the token.
   */
  label?: string;

  /**
   * The icon to display on the token.
   */
  icon?: IconType;

  /**
   * The color of the token.
   */
  color?: TokenColor;

  /**
   * Called when the token is clicked.
   *
   * @param event The React mouse event.
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Called when the token is hovered or not hovered.
   *
   * @param isHovered Whether the token is currently hovered.
   */
  onHover?: (isHovered: boolean) => void;

  /**
   * Custom styles for the token.
   */
  style?: StyleXStyles;
}

export default function Token({
  label,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  onClick,
  onHover,
  style,
}: TokenProps) {
  return (
    <div {...stylex.props(styles.main, colorVariants[color], style)}>
      {icon && <Icon name={icon} style={styles.icon} />}
      {onClick && (
        <button
          {...stylex.props(styles.button)}
          onClick={onClick}
          {...(onHover && {
            onMouseEnter: () => onHover(true),
            onMouseLeave: () => onHover(false),
          })}
        />
      )}
      {label && (
        <div {...stylex.props(fontStyles.body, styles.label)}>{label}</div>
      )}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    padding: '4px 8px',
    gap: '8px',
    borderRadius: '4px',
    borderWidth: 0,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    background: {
      default: 'rgba(230, 235, 239, 1)',
      ':hover': 'rgba(221, 226, 232, 1)',
    },
  },
  icon: {
    color: iconVars.color,
  },
  label: {
    color: labelVars.color,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    background: 'transparent',
    borderStyle: 'none',
    cursor: 'pointer',
  },
});

const colorVariants = stylex.create({
  default: {
    [iconVars.color]: iconColors.primary,
    [labelVars.color]: textColors.primary,
  },
  purple: {
    [iconVars.color]: iconColors.purple,
    [labelVars.color]: textColors.purple,
  },
  green: {
    [iconVars.color]: iconColors.green,
    [labelVars.color]: textColors.green,
  },
  cyan: {
    [iconVars.color]: iconColors.cyan,
    [labelVars.color]: textColors.cyan,
  },
});
