/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactElement} from 'react';
import * as PrimitiveDropdownMenu from '@radix-ui/react-dropdown-menu';
import stylex from '@stylexjs/stylex';
import {Icon, IconType} from '.';
import {fontStyles} from './styles';
import {iconColors, textColors} from './colors.stylex';
import {iconVars, labelVars, sublabelVars} from './dropdown-menu.stylex';

type Modifiers = Pick<
  React.MouseEvent,
  'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'
>;

type DropdownMenuChild =
  | React.ReactElement<DropdownMenuItemProps, typeof DropdownMenuItem>
  | React.ReactElement<DropdownSubMenuItemProps, typeof DropdownSubMenuItem>
  | React.ReactElement<DropdownMenuLabelProps, typeof DropdownMenuLabel>;

interface DropdownMenuProps {
  trigger: ReactElement;
  onOpenChange?: (open: boolean) => void;
  children: DropdownMenuChild | DropdownMenuChild[];
}

export function DropdownMenu({
  trigger,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  return (
    <PrimitiveDropdownMenu.Root onOpenChange={onOpenChange}>
      <PrimitiveDropdownMenu.Trigger asChild>
        {trigger}
      </PrimitiveDropdownMenu.Trigger>
      <PrimitiveDropdownMenu.Portal>
        <PrimitiveDropdownMenu.Content
          {...stylex.props(fontStyles.body, styles.content)}
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
  onClick?: (modifiers: Modifiers) => void;
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
      onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
        onClick?.({altKey, ctrlKey, metaKey, shiftKey});
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
}

export function DropdownSubMenuItem({
  icon,
  label,
  sublabel,
  disabled,
  children,
}: DropdownSubMenuItemProps) {
  return (
    <PrimitiveDropdownMenu.Sub>
      <PrimitiveDropdownMenu.SubTrigger
        {...stylex.props(styles.item)}
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
        <Icon name="chevronRight" customStyle={styles.icon} />
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
    background: 'rgba(255, 255, 255, 1)',
    boxShadow:
      '0px 2px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
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
    ':is([data-highlighted])': {
      background: 'rgba(0, 0, 0, 0.05)',
    },
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
