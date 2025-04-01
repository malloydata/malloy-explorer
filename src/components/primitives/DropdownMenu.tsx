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
import {styles} from '../styles';
import {Tooltip, TooltipContent, TooltipTrigger} from '@radix-ui/react-tooltip';
import {Label} from '../Label';
import {Icon, IconType} from '.';

type Modifiers = Pick<
  React.MouseEvent,
  'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'
>;

type DropdownMenuChild =
  | React.ReactElement<DropdownMenuItemProps, typeof DropdownMenuItem>
  | React.ReactElement<DropdownSubMenuItemProps, typeof DropdownSubMenuItem>;

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
          {...stylex.props(menuStyles.content)}
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
  detail?: ReactElement;
  onClick?: (modifiers: Modifiers) => void;
  disabled?: boolean;
}

export function DropdownMenuItem({
  icon,
  label,
  detail,
  onClick,
  disabled,
}: DropdownMenuItemProps) {
  return (
    <PrimitiveDropdownMenu.Item
      {...stylex.props(menuStyles.item)}
      onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
        onClick?.({altKey, ctrlKey, metaKey, shiftKey});
      }}
      disabled={disabled}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div {...stylex.props(menuStyles.label)}>
            {icon && <Icon name={icon} />}
            <Label>{label}</Label>
          </div>
        </TooltipTrigger>
        {detail ? (
          <TooltipContent {...stylex.props(styles.tooltip)} side="right">
            {detail}
          </TooltipContent>
        ) : null}
      </Tooltip>
    </PrimitiveDropdownMenu.Item>
  );
}

type DropdownSubMenuItemChild =
  | React.ReactElement<DropdownMenuItemProps, typeof DropdownMenuItem>
  | React.ReactElement<DropdownSubMenuItemProps, typeof DropdownSubMenuItem>;

interface DropdownSubMenuItemProps {
  icon?: ReactElement;
  label: string;
  disabled?: boolean;
  children: DropdownSubMenuItemChild | DropdownSubMenuItemChild[];
}

export function DropdownSubMenuItem({
  icon,
  label,
  disabled,
  children,
}: DropdownSubMenuItemProps) {
  return (
    <PrimitiveDropdownMenu.Sub>
      <PrimitiveDropdownMenu.SubTrigger
        disabled={disabled}
        {...stylex.props(menuStyles.item)}
      >
        <div {...stylex.props(menuStyles.label)}>
          {icon}
          <Label>{label}</Label>
        </div>
        <div {...stylex.props(menuStyles.arrow)}>
          <Icon name="chevronRight" />
        </div>
      </PrimitiveDropdownMenu.SubTrigger>
      <PrimitiveDropdownMenu.SubContent {...stylex.props(menuStyles.content)}>
        {React.Children.map(children, child => child)}
      </PrimitiveDropdownMenu.SubContent>
    </PrimitiveDropdownMenu.Sub>
  );
}

const colors = {
  background: 'white',
  shadowElevation: 'rgba(39, 33, 33, 0.1)',
  hover: 'lightgrey',
  text: '#050505',
  disabledText: '#A4B0BC',
};

const menuStyles = stylex.create({
  content: {
    background: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    boxShadow: `0px 2px 12px 0px ${colors.shadowElevation}`,
    fontFamily: 'sans-serif',
  },
  item: {
    color: {
      default: colors.text,
      ':is([data-disabled])': colors.disabledText,
    },
    padding: 8,
    cursor: 'default',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 3,
    backgroundColor: {
      ':hover': colors.hover,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: '100%',
    gap: 8,
  },
  arrow: {
    marginLeft: 16,
  },
});
