/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactElement} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import stylex from '@stylexjs/stylex';
import ChevronRight from '../assets/chevrons/chevron_right.svg?react';
import {styles} from './styles';
import {Tooltip, TooltipContent, TooltipTrigger} from '@radix-ui/react-tooltip';
import {Label} from './Label';

export type Modifiers = Pick<
  React.MouseEvent,
  'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'
>;

export interface MenuItem {
  icon?: ReactElement;
  label: string;
  detail?: ReactElement;
  onClick?: (modifiers: Modifiers) => void;
  when?: () => boolean;
  disable?: () => boolean;
  subMenu?: MenuItem[];
}

export interface MenuProps {
  trigger: ReactElement;
  items: MenuItem[];
  onOpenChange?: (open: boolean) => void;
}

export function Menu({trigger, items, onOpenChange}: MenuProps) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          {...stylex.props(menuStyles.content)}
          side="bottom"
          align="start"
          sideOffset={4}
          onCloseAutoFocus={e => e.preventDefault()}
        >
          {items.map((item, key) => {
            if (item.when?.() ?? true) {
              if (item.subMenu) {
                return <SubMenu key={key} item={item} />;
              } else {
                if (item.onClick) {
                  return (
                    <DropdownMenuItem
                      key={key}
                      onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
                        item.onClick?.({altKey, ctrlKey, metaKey, shiftKey});
                      }}
                      {...stylex.props(menuStyles.item)}
                      disabled={item.disable?.()}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div {...stylex.props(menuStyles.label)}>
                            {item.icon}
                            <Label>{item.label}</Label>
                          </div>
                        </TooltipTrigger>
                        {item.detail ? (
                          <TooltipContent
                            {...stylex.props(styles.tooltip)}
                            side="right"
                          >
                            {item.detail}
                          </TooltipContent>
                        ) : null}
                      </Tooltip>
                    </DropdownMenuItem>
                  );
                } else {
                  if (item.label === '-') {
                    return (
                      <DropdownMenuSeparator
                        key={key}
                        {...stylex.props(menuStyles.separator)}
                      />
                    );
                  } else {
                    return (
                      <DropdownMenuLabel key={key}>
                        {item.label}
                      </DropdownMenuLabel>
                    );
                  }
                }
              }
            }
            return null;
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

interface SubMenuProps {
  item: MenuItem;
}

function SubMenu({item}: SubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        disabled={item.disable?.()}
        {...stylex.props(menuStyles.item)}
      >
        <div {...stylex.props(menuStyles.label)}>
          {item.icon}
          <Label>{item.label}</Label>
        </div>
        <div {...stylex.props(menuStyles.arrow)}>
          <ChevronRight {...stylex.props(styles.icon)} />
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent {...stylex.props(menuStyles.content)}>
        {item.subMenu?.map((item, key) => {
          if (item.when?.() ?? true) {
            if (item.subMenu) {
              return <SubMenu key={key} item={item} />;
            } else {
              return (
                <DropdownMenuItem
                  key={key}
                  disabled={item.disable?.()}
                  onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
                    item.onClick?.({altKey, ctrlKey, metaKey, shiftKey});
                  }}
                  {...stylex.props(menuStyles.item)}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div {...stylex.props(menuStyles.label)}>
                        {item.icon}
                        <Label>{item.label}</Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      {...stylex.props(styles.tooltip)}
                      side="right"
                    >
                      {item.detail}
                    </TooltipContent>
                  </Tooltip>
                </DropdownMenuItem>
              );
            }
          }
          return null;
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
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
  separator: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.disabledText,
  },
});
