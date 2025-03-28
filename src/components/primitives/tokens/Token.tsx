/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import Icon from '../Icon';
import {fontStyles} from '../styles';
import {IconType} from '../utils/icon';
import {tokenColorVariants, tokenStyles} from './styles';
import {DEFAULT_TOKEN_COLOR, TokenColor} from './types';

export interface TokenProps extends React.ComponentProps<'button'> {
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
  customStyle?: StyleXStyles;
}

export default function Token({
  label,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  onClick,
  onHover,
  customStyle,
  ...props
}: TokenProps) {
  return (
    <div
      {...stylex.props(
        tokenStyles.main,
        tokenColorVariants[color],
        customStyle
      )}
    >
      {icon && <Icon name={icon} style={tokenStyles.icon} />}
      {onClick && (
        <button
          {...stylex.props(styles.button)}
          onClick={onClick}
          {...(onHover && {
            onMouseEnter: () => onHover(true),
            onMouseLeave: () => onHover(false),
          })}
          {...props}
        />
      )}
      {label && (
        <div {...stylex.props(fontStyles.body, tokenStyles.label)}>{label}</div>
      )}
    </div>
  );
}

const styles = stylex.create({
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
