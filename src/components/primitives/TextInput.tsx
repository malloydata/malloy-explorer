import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {fontStyles} from './styles';
import {IconType} from './utils/icon';
import Icon from './Icon';

const DEFAULT_SIZE = 'default';

type Size = keyof typeof sizeVariants;

interface TextInputProps {
  /**
   * The current value of the text input.
   */
  value: string;
  /**
   * A hint to the user about what to enter in the text input.
   */
  placeholder?: string;
  /**
   * The size of the text input.
   */
  size?: Size;
  /**
   * An icon to display inside the text input.
   */
  icon?: IconType;
  /**
   * Called when the text input's value changes.
   *
   * @param value The new value of the text input.
   */
  onChange: (value: string) => void;
  /**
   * Whether to display a clear button in the text input.
   */
  hasClear?: boolean;
  /**
   * Called when a key is pressed while the input element has focus.
   *
   * @param event The keyboard event that triggered this callback.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Custom styles to apply to the component.
   *
   * Use this prop to override or extend the default styles of the component.
   */
  customStyle?: StyleXStyles;
}

export default function TextInput({
  value,
  placeholder,
  size = DEFAULT_SIZE,
  icon,
  onChange,
  onKeyDown,
  hasClear = false,
  customStyle,
}: TextInputProps) {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

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
      event.target.focus();
    }
  };

  return (
    <div
      {...stylex.props(
        styles.main,
        isFocused && styles.focused,
        sizeVariants[size],
        customStyle
      )}
    >
      {icon && <Icon name={icon} color="secondary" />}
      <input
        {...stylex.props(fontStyles.body, styles.input)}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      {hasClear && (
        <button
          {...stylex.props(
            fontStyles.supporting,
            styles.actionButton,
            value === '' && styles.hidden
          )}
          ref={buttonRef}
          onClick={() => onChange('')}
          tabIndex={0}
        >
          Clear
        </button>
      )}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'rgba(255, 255, 255, 1)',
    borderRadius: '8px',
    border: '1px solid rgba(204, 211, 219, 1)',
    boxShadow: {
      default: null,
      ':hover': 'rgba(204, 211, 219, 0.3) 0px 0px 0px 3px inset',
    },
    gap: '8px',
  },
  focused: {
    borderColor: 'rgb(0, 100, 224)',
    boxShadow: 'rgba(1, 113, 227, 0.3) 0px 0px 0px 3px inset',
  },
  input: {
    flexGrow: 1,
    height: '20px',
    minWidth: '1px',
    padding: '0px',
    background: 'transparent',
    borderStyle: 'none',
    outline: 'none',
    '::placeholder': {
      color: 'rgba(78, 96, 111, 1)',
    },
  },
  actionButton: {
    display: 'inline-flex',
    borderWidth: 0,
    background: 'transparent',
    padding: '0px',
    marginLeft: '4px',
    cursor: 'pointer',
    color: 'rgba(0, 100, 224, 1)',
  },
  hidden: {
    visibility: 'hidden',
  },
});

const sizeVariants = stylex.create({
  default: {
    padding: '8px 12px',
  },
  compact: {
    padding: '4px 8px',
  },
});
