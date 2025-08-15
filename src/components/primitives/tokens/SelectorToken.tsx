/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {IconType} from '../utils/icon';
import Icon from '../Icon';
import {fontStyles} from '../styles';
import {tokenColorVariants, tokenSizeVariants, tokenStyles} from './styles';
import {backgroundColors, iconColors} from '../colors.stylex';
import {
  DEFAULT_TOKEN_COLOR,
  DEFAULT_TOKEN_SIZE,
  TokenColor,
  TokenSize,
} from './types';
import TextInput from '../TextInput';

export interface SelectorTokenItem<T extends string> {
  label: string;
  value: T;
}

export interface SelectorTokenProps<T extends string> {
  value: T | undefined;
  onChange: (value: T) => void;
  icon?: IconType;
  color?: TokenColor;
  size?: TokenSize;
  items: SelectorTokenItem<T>[];
  isSearchable?: boolean;
  customStyle?: StyleXStyles;
}

export default function SelectorToken<T extends string>({
  value,
  onChange,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  size = DEFAULT_TOKEN_SIZE,
  items,
  isSearchable = false,
  customStyle,
}: SelectorTokenProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const filteredItems = React.useMemo(() => {
    if (searchQuery) {
      return items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [items, searchQuery]);

  const handleValueChange = (value: T) => {
    onChange(value);
  };

  const label = items.find(item => item.value === value)?.label;

  return (
    <Select.Root
      value={value}
      onValueChange={handleValueChange}
      required={true}
    >
      <Select.Trigger
        {...stylex.props(
          tokenStyles.main,
          styles.selectTrigger,
          tokenColorVariants[color],
          tokenSizeVariants[size],
          customStyle
        )}
      >
        {icon && <Icon name={icon} customStyle={tokenStyles.icon} />}
        <Select.Value asChild>
          <div {...stylex.props(fontStyles.body, tokenStyles.label)}>
            {label}
          </div>
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content side="bottom" position="popper" sideOffset={4}>
          <Select.Viewport {...stylex.props(styles.selectViewport)}>
            {isSearchable && (
              <TextInput
                value={searchQuery}
                onChange={v => setSearchQuery(v)}
                placeholder="Search"
                size="compact"
                icon="search"
                hasClear={true}
                customStyle={styles.searchInput}
                onKeyDown={event => {
                  const excludedKeys = ['ArrowUp', 'ArrowDown'];
                  if (!excludedKeys.includes(event.key)) {
                    setTimeout(() => {
                      (event.target as HTMLElement).focus();
                    }, 10);
                  }
                }}
              />
            )}
            <Select.Group {...stylex.props(styles.selectGroup)}>
              {filteredItems.map(item => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  selectedValue={value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

interface SelectItemProps<T> extends React.ComponentProps<typeof Select.Item> {
  value: string;
  selectedValue: T | undefined;
}

function SelectItem<T>({
  children,
  value,
  selectedValue,
  ...props
}: SelectItemProps<T>) {
  return (
    <Select.Item
      {...stylex.props(fontStyles.body, styles.selectItem)}
      value={value}
      {...props}
    >
      {value === selectedValue ? (
        <Icon name="radioChecked" customStyle={styles.radioChecked} />
      ) : (
        <Icon name="radioUnchecked" customStyle={styles.radioUnchecked} />
      )}
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

const styles = stylex.create({
  selectTrigger: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  selectViewport: {
    borderRadius: '12px',
    background: backgroundColors.surface,
    boxShadow:
      '0px 2px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300px',
    padding: '4px',
    gap: '2px',
    overflow: 'auto',
  },
  selectItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    gap: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    outline: 'none',
    ':is([data-highlighted])': {background: backgroundColors.overlayHover},
    ':is([data-state="checked"])': {
      background: {
        default: backgroundColors.accentDeemphasized,
        ':is([data-highlighted])': backgroundColors.accentDeemphasized,
      },
    },
  },
  radioChecked: {
    color: iconColors.accent,
  },
  radioUnchecked: {
    color: iconColors.gray,
  },
  searchInput: {
    borderRadius: '12px',
  },
});
