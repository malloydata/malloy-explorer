/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import stylex from '@stylexjs/stylex';
import {ReactElement} from 'react';

const menuStyles = stylex.create({
  trigger: {
    border: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
  },
  content: {
    background: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: '5px 5px 5px gray',
    fontFamily: 'sans-serif',
    margin: 8,
    padding: 8,
  },
  item: {
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
    cursor: 'default',
    userSelect: 'none',
  },
});

export type Modifiers = Pick<
  React.MouseEvent,
  'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'
>;

export interface MenuItem {
  icon?: ReactElement;
  label: string;
  onClick?: (modifiers: Modifiers) => void;
  when?: () => boolean;
}

export interface MenuProps {
  icon: ReactElement;
  items: MenuItem[];
  title?: string;
}

export function Menu({icon, items, title}: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...stylex.props(menuStyles.trigger)}>
        {icon}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent {...stylex.props(menuStyles.content)}>
          {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
          {items.map((item, key) => {
            if (item.when?.() ?? true) {
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
                    item.onClick?.({altKey, ctrlKey, metaKey, shiftKey});
                  }}
                  {...stylex.props(menuStyles.item)}
                >
                  {item.icon} {item.label}
                </DropdownMenuItem>
              );
            }
            return null;
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
