/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {iconVars, labelVars} from './token.stylex';
import Icon from '../Icon';
import {fontStyles} from '../styles';
import {IconType} from '../utils/icon';
import {tokenColorVariants, tokenSizeVariants, tokenStyles} from './styles';
import {
  DEFAULT_TOKEN_COLOR,
  DEFAULT_TOKEN_SIZE,
  TokenColor,
  TokenSize,
} from './types';
import ErrorIcon from '../ErrorIcon';

interface EditableTokenBaseProps<T> {
  /**
   * The current value of the token.
   */
  value: T;
  /**
   * Callback function called when the token's value changes.
   *
   * @param value The new value of the token.
   */
  onChange: (value: T) => void;
  /**
   * Optional callback function called when the token is removed.
   */
  onRemove?: () => void;
  /**
   * Optional icon to display in the token.
   *
   * Must be a key from the ICON_MAP object.
   */
  icon?: IconType;
  /**
   * Optional color of the token.
   */
  color?: TokenColor;
  /**
   * Optional size of the token.
   */
  size?: TokenSize;
  /**
   * Optional custom styles for the token.
   */
  customStyle?: StyleXStyles;
  /**
   * Optional error message to show. If an error message exists, the token will
   * include error styles.
   */
  errorMessage?: string;
}

interface EditableTokenStringProps extends EditableTokenBaseProps<string> {
  type?: 'string';
}
interface EditableTokenNumberProps extends EditableTokenBaseProps<number> {
  type: 'number';
}

export default function EditableToken({
  value,
  onChange,
  onRemove,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  size = DEFAULT_TOKEN_SIZE,
  customStyle,
  type,
  errorMessage,
}: EditableTokenStringProps | EditableTokenNumberProps) {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      onChange(parseFloat(target.value || '0'));
    } else {
      onChange(target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      buttonRef.current == null ||
      event.relatedTarget !== buttonRef.current
    ) {
      setIsFocused(false);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div
        {...stylex.props(
          tokenStyles.main,
          tokenColorVariants[color],
          tokenSizeVariants[size],
          isFocused && styles.focused,
          !!errorMessage && styles.hasError,
          customStyle
        )}
      >
        {icon && <Icon name={icon} customStyle={styles.icon} />}
        <span {...stylex.props(styles.inputWrapper)}>
          <span
            {...stylex.props(fontStyles.body, styles.placeholder)}
            style={{whiteSpaceCollapse: 'preserve'}}
          >
            {value}
          </span>
          <input
            {...stylex.props(styles.input, fontStyles.body)}
            ref={inputRef}
            pattern={type === 'number' ? '^-?[0-9.]*$' : undefined}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size={1}
          />
        </span>
        {onRemove && isFocused && (
          <button
            {...stylex.props(styles.actionButton)}
            ref={buttonRef}
            onClick={onRemove}
            tabIndex={0}
          >
            <Icon name="clear" />
          </button>
        )}
      </div>
      {errorMessage && <ErrorIcon errorMessage={errorMessage} />}
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  focused: {
    background: 'rgba(255, 255, 255, 1)',
    boxShadow:
      '0px 0px 0px 1px rgb(0, 100, 224) inset, 0px 0px 0px 3px rgba(1, 113, 227, 0.3) inset',
  },
  hasError: {
    border: '1px solid red',
  },
  icon: {
    color: iconVars.color,
  },
  inputWrapper: {
    display: 'inline-grid',
  },
  placeholder: {
    background: 'transparent',
    color: 'transparent',
    gridArea: '1 / 1',
    whiteSpace: 'nowrap',
    minWidth: '1px',
  },
  input: {
    color: labelVars.color,
    gridArea: '1 / 1',
    padding: '0px',
    background: 'transparent !important', // :| don't ask
    borderStyle: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    minWidth: '1px',
  },
  actionButton: {
    display: 'inline-flex',
    borderWidth: 0,
    background: 'transparent',
    padding: '0px',
    cursor: 'pointer',
  },
});
