/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactElement} from 'react';
import * as PrimitiveDropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import stylex from '@stylexjs/stylex';
import {Icon, IconType} from '.';
import {fontStyles, tooltipStyles} from './styles';
import {
  backgroundColors,
  iconColors,
  textColors,
  utility,
} from './colors.stylex';
import {iconVars, labelVars, sublabelVars} from './dropdown-menu.stylex';
import {ThemeContext} from './contexts/ThemeContext';

type DropdownMenuChild =
  | React.ReactElement<DropdownMenuItemProps, typeof DropdownMenuItem>
  | React.ReactElement<DropdownSubMenuItemProps, typeof DropdownSubMenuItem>
  | React.ReactElement<DropdownMenuLabelProps, typeof DropdownMenuLabel>
  | null;

interface DropdownMenuProps {
  trigger: ReactElement;
  tooltip?: string | ReactElement;
  onOpenChange?: (open: boolean) => void;
  children: DropdownMenuChild | DropdownMenuChild[];
  tooltipProps?: {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
    alignOffset?: number;
    sideOffset?: number;
  };
}

export function DropdownMenu({
  trigger,
  tooltip,
  onOpenChange,
  children,
  tooltipProps,
}: DropdownMenuProps) {
  const {theme} = React.useContext(ThemeContext);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState<
    boolean | undefined
  >();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setIsTooltipOpen(false);
    }
    onOpenChange?.(open);
  };

  return (
    <PrimitiveDropdownMenu.Root onOpenChange={handleOpenChange}>
      {tooltip ? (
        <Tooltip.Root
          open={isTooltipOpen}
          onOpenChange={setIsTooltipOpen}
          delayDuration={300}
        >
          <Tooltip.Trigger asChild>
            <PrimitiveDropdownMenu.Trigger asChild>
              {trigger}
            </PrimitiveDropdownMenu.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              {...tooltipProps}
              {...stylex.props(
                typeof tooltip === 'string'
                  ? tooltipStyles.default
                  : tooltipStyles.card,
                theme
              )}
            >
              {tooltip}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ) : (
        <PrimitiveDropdownMenu.Trigger asChild>
          {trigger}
        </PrimitiveDropdownMenu.Trigger>
      )}
      <PrimitiveDropdownMenu.Portal>
        <PrimitiveDropdownMenu.Content
          {...stylex.props(fontStyles.body, styles.content, theme)}
          side="bottom"
          align="start"
          sideOffset={4}
          onCloseAutoFocus={e => e.preventDefault()}
        >
          {React.Children.map(children, child => child)}
        </PrimitiveDropdownMenu.Content>
      </PrimitiveDropdownMenu.Portal>
    </PrimitiveDropdownMenu.Root>
  );
}

interface DropdownMenuItemProps {
  icon?: IconType;
  label: string;
  sublabel?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

export function DropdownMenuItem({
  icon,
  label,
  sublabel,
  onClick,
  disabled,
}: DropdownMenuItemProps) {
  return (
    <PrimitiveDropdownMenu.Item
      {...stylex.props(styles.item)}
      onClick={event => {
        onClick?.(event);
      }}
      disabled={disabled}
    >
      {icon && <Icon name={icon} customStyle={styles.icon} />}
      <div {...stylex.props(styles.center)}>
        <span {...stylex.props(fontStyles.body, styles.label)}>{label}</span>
        {sublabel && (
          <span {...stylex.props(fontStyles.supporting, styles.sublabel)}>
            {sublabel}
          </span>
        )}
      </div>
    </PrimitiveDropdownMenu.Item>
  );
}

interface DropdownSubMenuItemProps {
  icon?: IconType;
  label: string;
  sublabel?: string;
  disabled?: boolean;
  children: DropdownMenuChild | DropdownMenuChild[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownSubMenuItem({
  icon,
  label,
  sublabel,
  disabled,
  children,
  open,
  onOpenChange,
}: DropdownSubMenuItemProps) {
  const isControlled = open !== undefined && onOpenChange !== undefined;

  return (
    <PrimitiveDropdownMenu.Sub {...(isControlled && {open})}>
      <PrimitiveDropdownMenu.SubTrigger
        {...stylex.props(styles.item)}
        disabled={disabled}
        {...(isControlled && {onClick: () => onOpenChange(!open)})}
      >
        {icon && <Icon name={icon} customStyle={styles.icon} />}
        <div {...stylex.props(styles.center)}>
          <span {...stylex.props(fontStyles.body, styles.label)}>{label}</span>
          {sublabel && (
            <span {...stylex.props(fontStyles.supporting, styles.sublabel)}>
              {sublabel}
            </span>
          )}
        </div>
        {!isControlled && (
          <Icon name="chevronRight" customStyle={styles.icon} />
        )}
      </PrimitiveDropdownMenu.SubTrigger>
      <PrimitiveDropdownMenu.SubContent
        {...stylex.props(styles.content)}
        sideOffset={5}
      >
        {React.Children.map(children, child => child)}
      </PrimitiveDropdownMenu.SubContent>
    </PrimitiveDropdownMenu.Sub>
  );
}

interface DropdownMenuLabelProps {
  label: string;
}

export function DropdownMenuLabel({label}: DropdownMenuLabelProps) {
  return (
    <PrimitiveDropdownMenu.Label
      {...stylex.props(fontStyles.supporting, styles.menuLabel)}
    >
      {label}
    </PrimitiveDropdownMenu.Label>
  );
}

const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    background: backgroundColors.surface,
    boxShadow: utility.elevationSmall,
    padding: '4px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    gap: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    outline: 'none',
    ':is([data-highlighted])': {background: backgroundColors.overlayHover},
    ':is([data-disabled])': {
      cursor: 'not-allowed',
    },
    [iconVars.color]: {
      default: iconColors.primary,
      ':is([data-disabled])': iconColors.disabled,
    },
    [labelVars.color]: {
      default: textColors.primary,
      ':is([data-disabled])': textColors.disabled,
    },
    [sublabelVars.color]: {
      default: textColors.secondary,
      ':is([data-disabled])': textColors.disabled,
    },
  },
  menuLabel: {
    padding: '4px 8px',
    color: textColors.secondary,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  icon: {
    color: iconVars.color,
  },
  label: {
    flexGrow: 1,
    color: labelVars.color,
  },
  sublabel: {
    flexGrow: 1,
    color: sublabelVars.color,
  },
});
