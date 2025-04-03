/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import * as Tooltip from '@radix-ui/react-tooltip';
import Icon from '../Icon';
import {fontStyles, tooltipStyles} from '../styles';
import {IconType} from '../utils/icon';
import {tokenColorVariants, tokenSizeVariants, tokenStyles} from './styles';
import {
  DEFAULT_TOKEN_COLOR,
  DEFAULT_TOKEN_SIZE,
  TokenColor,
  TokenSize,
} from './types';
import {backgroundColors} from '../colors.stylex';

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
   * The size of the token.
   */
  size?: TokenSize;

  /**
   * Called when the token is clicked. Adding this will make the token appear interactive.
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Called when the token is hovered or not hovered.
   */
  onHover?: (isHovered: boolean) => void;

  /**
   * If true, the token will behave as button trigger without requiring an onClick event handler prop.
   */
  asButtonTrigger?: boolean;

  /**
   * The tooltip to show when hovering over the token.
   */
  tooltip?: string | React.ReactElement;

  /**
   * Custom styles for the token.
   */
  customStyle?: StyleXStyles;
}

export default function Token({
  label,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  size = DEFAULT_TOKEN_SIZE,
  onClick,
  onHover,
  asButtonTrigger = false,
  tooltip,
  customStyle,
  ...props
}: TokenProps) {
  const isInteractive = onClick !== undefined || asButtonTrigger;

  const token = (
    <div
      {...stylex.props(
        tokenStyles.main,
        tokenColorVariants[color],
        tokenSizeVariants[size],
        !isInteractive && styles.nonInteractive,
        customStyle
      )}
    >
      {icon && <Icon name={icon} customStyle={tokenStyles.icon} />}
      {isInteractive && (
        <button
          {...stylex.props(styles.button)}
          {...(onClick && {onClick})}
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

  return tooltip ? (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger asChild>{token}</Tooltip.Trigger>
      <Tooltip.Content
        side="bottom"
        align="start"
        sideOffset={4}
        {...stylex.props(
          typeof tooltip === 'string'
            ? tooltipStyles.default
            : tooltipStyles.card
        )}
      >
        {tooltip}
      </Tooltip.Content>
    </Tooltip.Root>
  ) : (
    token
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
  nonInteractive: {
    cursor: 'default',
    background: backgroundColors.token,
  },
});
