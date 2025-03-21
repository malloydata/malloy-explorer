import * as React from 'react';
import {DEFAULT_TOKEN_COLOR, TokenColor} from './Token';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {iconVars, labelVars} from './token.stylex';
import {iconColors, textColors} from './colors.stylex';
import Icon from './Icon';
import {fontStyles} from './styles';
import {IconType} from './utils/icon';

interface EditableTokenProps {
  /**
   * The current value of the token.
   */
  value: string;
  /**
   * Callback function called when the token's value changes.
   *
   * @param value The new value of the token.
   */
  onChange: (value: string) => void;
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
   * Optional custom styles for the token.
   */
  style?: StyleXStyles;
}

export default function EditableToken({
  value,
  onChange,
  onRemove,
  icon,
  color = DEFAULT_TOKEN_COLOR,
  style,
}: EditableTokenProps) {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
    <div
      {...stylex.props(
        styles.main,
        colorVariants[color],
        isFocused && styles.focused,
        style
      )}
    >
      {icon && <Icon name={icon} style={styles.icon} />}
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
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
  );
}

const styles = stylex.create({
  main: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    padding: '4px 8px',
    borderRadius: '4px',
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    background: {
      default: 'rgba(230, 235, 239, 1)',
      ':hover': 'rgba(221, 226, 232, 1)',
    },
  },
  focused: {
    background: 'rgba(255, 255, 255, 1)',
    boxShadow:
      '0px 0px 0px 1px rgb(0, 100, 224) inset, 0px 0px 0px 3px rgba(1, 113, 227, 0.3) inset',
  },
  icon: {
    color: iconVars.color,
    marginRight: '8px',
  },
  inputWrapper: {
    display: 'inline-grid',
    width: 'min-content',
  },
  placeholder: {
    background: 'transparent',
    color: 'transparent',
    gridArea: '1 / 1',
    whiteSpace: 'nowrap',
  },
  input: {
    color: labelVars.color,
    gridArea: '1 / 1',
    minWidth: '13.5px',
    padding: '0px',
    background: 'transparent',
    borderStyle: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
  },
  actionButton: {
    display: 'inline-flex',
    borderWidth: 0,
    background: 'transparent',
    padding: '0px',
    marginLeft: '4px',
    cursor: 'pointer',
  },
});

const colorVariants = stylex.create({
  default: {
    [iconVars.color]: iconColors.primary,
    [labelVars.color]: textColors.primary,
  },
  purple: {
    [iconVars.color]: iconColors.purple,
    [labelVars.color]: textColors.purple,
  },
  green: {
    [iconVars.color]: iconColors.green,
    [labelVars.color]: textColors.green,
  },
  cyan: {
    [iconVars.color]: iconColors.cyan,
    [labelVars.color]: textColors.cyan,
  },
});
