/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState, useRef, JSX} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {Popover} from './Popover';
import {useClickOutside} from '../hooks/useClickOutside';
import Icon from './Icon';

interface SelectDropdownProps<T> {
  autoFocus?: boolean;
  value: T | undefined;
  placeholder?: string;
  onChange?: (newValue: T) => void;
  options: {label: string | JSX.Element; value: T; divider?: boolean}[];
  disabled?: boolean;
  valueEqual?: (a: T, b: T) => boolean;
  width?: number | string;
  style?: StyleXStyles;
}

const styles = stylex.create({
  wrapper: {
    position: 'relative',
  },
  inputBox: {
    backgroundColor: 'transparent',
    fontSize: 'var(--malloy-composer-fontSize, 14px)',
    border: '1px solid var(--malloy-composer-form-background, #efefef)',
    borderRadius: '4px',
    padding: '3px 10px',
    cursor: 'pointer',
    color: 'var(--malloy-composer-form-foreground, #5f6368)',
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'none',
    alignItems: 'center',
    fontFamily: 'var(--malloy-composer-fontFamily, sans-serif)',
    width: '100%',
  },
  inputBoxHover: {
    border: '1px solid var(--malloy-composer-form-border, #ececed)',
  },
  inputBoxFocus: {
    boxShadow: 'none',
    border: '1px solid var(--malloy-composer-form-focus, #4285f4)',
    outline: 'none',
  },
  inputBoxDisabled: {
    cursor: 'default',
    backgroundColor: 'var(--malloy-composer-form-disabledBackground, #f6f6f6)',
  },
  optionDiv: {
    padding: '0px 10px',
    height: '30px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: 'var(--malloy-composer-form-foreground, #5f6368)',
    display: 'flex',
    alignItems: 'center',
  },
  optionDivHover: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
  },
  optionSpan: {
    marginLeft: '8px',
  },
  checkIcon: {
    verticalAlign: 'text-top',
    width: '20px',
    minWidth: '20px',
    opacity: '70%',
    visibility: 'hidden',
    color: 'var(--malloy-composer-form-foreground, #5f6368)',
  },
  checkIconSelected: {
    visibility: 'visible',
  },
  optionRadio: {
    width: '0',
    height: '0',
  },
  selectListDiv: {
    fontSize: 'var(--malloy-composer-fontSize, 14px)',
    fontFamily: 'var(--malloy-composer-fontFamily, sans-serif)',
    textTransform: 'none',
    fontWeight: 'normal',
    width: '100%',
    padding: '10px 0',
    overflowY: 'auto',
    maxHeight: '400px',
  },
  optionDivider: {
    borderTop: '1px solid var(--malloy-composer-form-border, #ececec)',
    width: '100%',
    margin: '5px 0',
  },
});

export const SelectDropdown = <T,>({
  autoFocus,
  value,
  onChange,
  options,
  placeholder = 'Select',
  disabled = false,
  valueEqual = (a: T, b: T) => a === b,
  width = 200,
  style,
}: SelectDropdownProps<T>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperElement = useRef<HTMLDivElement>(null);
  const label =
    (value !== undefined &&
      options.find(option => valueEqual(option.value, value))?.label) ||
    placeholder;

  const select = (value: T) => {
    onChange?.(value);
    setOpen(false);
  };

  useClickOutside(wrapperElement, () => {
    setOpen(false);
  });

  return (
    <div {...stylex.props(styles.wrapper, style)} ref={wrapperElement}>
      <button
        type="button"
        autoFocus={autoFocus}
        {...stylex.props(
          styles.inputBox,
          isHovered ? styles.inputBoxHover : null,
          isFocused ? styles.inputBoxFocus : null,
          disabled ? styles.inputBoxDisabled : null
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) setOpen(true);
        }}
        disabled={disabled}
      >
        {label}
        <Icon name={'chevronDown'} />
      </button>
      <Popover
        open={open}
        setOpen={setOpen}
        placement="bottom-start"
        width={width}
        maxHeight={500}
      >
        <SelectList
          options={options}
          value={value}
          valueEqual={valueEqual}
          onChange={select}
        />
      </Popover>
    </div>
  );
};

interface SelectListProps<T> {
  value: T | undefined;
  options: {label: string | JSX.Element; value: T; divider?: boolean}[];
  valueEqual?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
  style?: StyleXStyles;
}

export function SelectList<T>({
  options,
  value,
  onChange,
  valueEqual = (a: T, b: T) => a === b,
  style,
}: SelectListProps<T>): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div {...stylex.props(styles.selectListDiv, style)}>
      {options.reduce<JSX.Element[]>((result, option, index) => {
        const isSelected =
          value !== undefined && valueEqual(value, option.value);
        if (option.divider) {
          result.push(
            <div
              {...stylex.props(styles.optionDivider)}
              key={'divider' + index}
            />
          );
        }
        result.push(
          <label
            key={index}
            {...stylex.props(
              styles.optionDiv,
              hoveredIndex === index ? styles.optionDivHover : null
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onChange(option.value)}
          >
            <input
              {...stylex.props(styles.optionRadio)}
              type="radio"
              defaultChecked={isSelected}
            />
            <Icon
              name="checkmark"
              {...stylex.props(
                styles.checkIcon,
                isSelected ? styles.checkIconSelected : null
              )}
            />
            <span {...stylex.props(styles.optionSpan)}>{option.label}</span>
          </label>
        );
        return result;
      }, [])}
    </div>
  );
}

interface DropdownMenuProps {
  options: {
    label: string | JSX.Element;
    onSelect: (event: React.MouseEvent) => void;
    divider?: boolean;
  }[];
  style?: StyleXStyles;
}

export function DropdownMenu({options, style}: DropdownMenuProps): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div {...stylex.props(styles.selectListDiv, style)}>
      {options.reduce<JSX.Element[]>((result, option, index) => {
        if (option.divider) {
          result.push(
            <div
              {...stylex.props(styles.optionDivider)}
              key={'divider' + index}
            />
          );
        }
        result.push(
          <label
            key={index}
            {...stylex.props(
              styles.optionDiv,
              hoveredIndex === index ? styles.optionDivHover : null
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={event => option.onSelect(event)}
          >
            <span {...stylex.props(styles.optionSpan)}>{option.label}</span>
          </label>
        );
        return result;
      }, [])}
    </div>
  );
}
