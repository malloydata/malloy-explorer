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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import stylex from '@stylexjs/stylex';
import {ReactElement} from 'react';
import ChevronRight from '../assets/chevrons/chevron_right.svg?react';
import {styles} from './styles';
import {Tooltip, TooltipContent, TooltipTrigger} from '@radix-ui/react-tooltip';

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
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  arrow: {
    marginLeft: 16,
  },
});

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
  subMenu?: MenuItem[];
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
              if (item.subMenu) {
                return <SubMenu key={key} item={item} />;
              } else {
                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
                      item.onClick?.({altKey, ctrlKey, metaKey, shiftKey});
                    }}
                    {...stylex.props(menuStyles.item)}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div {...stylex.props(menuStyles.label)}>
                          {item.icon} {item.label}
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
      <DropdownMenuSubTrigger {...stylex.props(menuStyles.item)}>
        <div {...stylex.props(menuStyles.label)}>
          {item.icon} {item.label}
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
                  onClick={({altKey, ctrlKey, metaKey, shiftKey}) => {
                    item.onClick?.({altKey, ctrlKey, metaKey, shiftKey});
                  }}
                  {...stylex.props(menuStyles.item)}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div {...stylex.props(menuStyles.label)}>
                        {item.icon} {item.label}
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
