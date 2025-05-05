/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {IconType} from './utils/icon';
import Icon from './Icon';
import {iconColors, textColors} from './colors.stylex';
import {iconVars, labelVars} from './button.stylex';
import {fontStyles, tooltipStyles} from './styles';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

const DEFAULT_VARIANT = 'default';
const DEFAULT_SIZE = 'default';

type Variant = keyof typeof colorVariants;

type Size = keyof typeof sizeVariants;

interface ButtonProps extends React.ComponentProps<'button'> {
  /**
   * The variant of the button.
   */
  variant?: Variant;

  /**
   * The size of the button.
   */
  size?: Size;

  /**
   * The label to display on the button.
   */
  label?: string;

  /**
   * The tooltip to show when hovering over the button. All buttons without a label need a tooltip.
   */
  tooltip?: string;

  /**
   * The icon to be shown either to the left of the label or centered (if label is not provided).
   */
  icon?: IconType;

  /**
   * The click event handler for the button.
   *
   * @param event - The React mouse event.
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Whether the button is disabled.
   */
  isDisabled?: boolean;

  /**
   * Custom styling
   */
  customStyle?: StyleXStyles;
}

export default function Button({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  icon,
  label,
  tooltip,
  isDisabled = false,
  customStyle,
  ...props
}: ButtonProps) {
  const button = (
    <button
      {...stylex.props(
        styles.main,
        colorVariants[variant],
        sizeVariants[size],
        customStyle
      )}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      <div {...stylex.props(styles.content)}>
        {icon && <Icon name={icon} customStyle={styles.icon} />}
        {label && (
          <div
            {...stylex.props(
              variant === 'primary' ? fontStyles.emphasized : fontStyles.body,
              styles.label
            )}
          >
            {label}
          </div>
        )}
      </div>
      {isDisabled && <div {...stylex.props(styles.disabledOverlay)}></div>}
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            sideOffset={8}
            {...stylex.props(fontStyles.body, tooltipStyles.default)}
          >
            {tooltip}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    );
  } else {
    return button;
  }
}

const styles = stylex.create({
  main: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: '8px',
    borderRadius: '8px',
    borderWidth: 0,
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    flexShrink: 0,
    userSelect: 'none',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    color: iconVars.color,
  },
  label: {
    color: labelVars.color,
    whiteSpace: 'nowrap',
  },
  disabledOverlay: {
    position: 'absolute',
    left: '0px',
    right: '0px',
    background: 'rgba(255, 255, 255, 0.5)',
    pointerEvents: 'none',
    borderRadius: '8px',
    width: '100%',
    height: '100%',
  },
});

const colorVariants = stylex.create({
  default: {
    background: {
      default: 'rgba(230, 235, 239, 1)',
      ':hover': 'rgba(221, 226, 232, 1)',
      ':active': 'rgba(204, 211, 219, 1)',
    },
    [iconVars.color]: {
      default: iconColors.primary,
      ':disabled': iconColors.disabled,
    },
    [labelVars.color]: {
      default: textColors.primary,
      ':disabled': textColors.secondary,
    },
  },
  flat: {
    background: {
      default: 'transparent',
      ':hover': 'rgba(0, 0, 0, 0.05)',
      ':active': 'rgba(0, 0, 0, 0.1)',
    },
    [iconVars.color]: {
      default: iconColors.primary,
      ':disabled': iconColors.disabled,
    },
    [labelVars.color]: {
      default: textColors.primary,
      ':disabled': textColors.secondary,
    },
  },
  primary: {
    background: {
      default: 'rgba(0, 100, 224, 1)',
      ':hover': 'rgba(4, 87, 203, 1)',
      ':active': 'rgba(0, 76, 188, 1)',
    },
    [iconVars.color]: {
      default: iconColors.primaryOnMedia,
      ':disabled': iconColors.primaryOnMedia,
    },
    [labelVars.color]: {
      default: textColors.primaryOnDarkMedia,
      ':disabled': textColors.primaryOnDarkMedia,
    },
  },
});

const sizeVariants = stylex.create({
  default: {
    height: '36px',
    padding: '8px 12px',
  },
  compact: {
    height: '28px',
    padding: '4px 8px',
  },
});
