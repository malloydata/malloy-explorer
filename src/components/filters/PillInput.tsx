/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {useClickOutside} from '../hooks/useClickOutside';
import {DEFAULT_TOKEN_COLOR, TokenColor} from '../primitives/tokens/types';
import {iconVars, labelVars} from '../primitives/tokens/token.stylex';
import {iconColors, textColors} from '../primitives/colors.stylex';
import ClearIcon from '../../assets/refinements/clear.svg?react';

interface PillInputProps {
  // TODO it should be required that if value is set, setValue is also set...
  value?: string;
  setValue?: (value: string) => void;
  values: string[];
  setValues: (values: string[]) => void;
  autoFocus?: boolean;
  placeholder?: string;
  type?: string;
  focusElement?: RefObject<HTMLDivElement | null>;
  color?: TokenColor;
  customStyle?: StyleXStyles;
}

export const PillInput: React.FC<PillInputProps> = ({
  values,
  setValues,
  autoFocus,
  placeholder,
  type = 'text',
  value: controlledValue,
  setValue: setControlledValue,
  focusElement,
  color = DEFAULT_TOKEN_COLOR,
  customStyle,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const [_focused, setFocused] = useState(false);
  const inp = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedPill, setSelectedPill] = useState<number | undefined>(
    undefined
  );
  const pillRefs = useRef<Array<HTMLDivElement | null>>([]);

  const value = controlledValue || uncontrolledValue;
  const setValue = setControlledValue || setUncontrolledValue;

  const deletePill = useCallback(
    (idx: number) => {
      const newValues = [...values];
      newValues.splice(idx, 1);
      setValues(newValues);
      if (selectedPill === 0) {
        if (values.length === 1) {
          setSelectedPill(undefined);
          inp.current?.focus();
        } else {
          setSelectedPill(0);
        }
      } else {
        setSelectedPill(idx - 1);
      }
    },
    [selectedPill, setValues, values]
  );

  const pills = useMemo(() => {
    pillRefs.current = new Array<HTMLDivElement>(values.length);
    return values.map(
      (value, index): ReactElement<PillProps> => (
        <Pill
          key={value}
          color={color}
          onClick={() => {
            setSelectedPill(index);
          }}
          onDelete={() => deletePill(index)}
          forwardRef={ref => {
            pillRefs.current[index] = ref;
          }}
        >
          {value}
        </Pill>
      )
    );
  }, [color, deletePill, values]);

  useEffect(() => {
    if (selectedPill !== undefined) {
      pillRefs.current[selectedPill]?.focus();
    }
  }, [pills, selectedPill]);

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      if (selectedPill !== undefined) {
        deletePill(selectedPill);
      }
    } else if (event.key === 'ArrowRight') {
      if (selectedPill === values.length - 1) {
        setSelectedPill(undefined);
        inp.current?.focus();
      } else if (selectedPill !== undefined) {
        setSelectedPill(selectedPill + 1);
      }
    } else if (event.key === 'ArrowLeft') {
      if (selectedPill !== undefined && selectedPill > 0) {
        setSelectedPill(selectedPill - 1);
      }
    } else {
      inp.current?.focus();
    }
  };

  const commitValue = () => {
    if (value.length > 0) {
      setValues([...values, value]);
      setValue('');
    }
  };

  useClickOutside(focusElement ? [ref, focusElement] : ref, () => {
    setFocused(false);
    commitValue();
  });

  return (
    <div
      {...stylex.props(styles.outer, customStyle)}
      onKeyUp={onKeyUp}
      onClick={() => inp.current?.focus()}
      ref={ref}
    >
      {pills}
      <input
        {...stylex.props(styles.input)}
        ref={inp}
        type={type}
        placeholder={values.length === 0 ? placeholder : ''}
        value={value}
        size={1}
        onChange={event => {
          setValue(event.target.value);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            if (value !== '') {
              commitValue();
              event.stopPropagation();
              event.preventDefault();
            }
          }
        }}
        onKeyUp={event => {
          if (event.key === 'Backspace') {
            if (value === '' && values.length > 0) {
              commitValue();
              inp.current?.blur();
              setSelectedPill(values.length - 1);
            }
          } else if (event.key === 'ArrowLeft') {
            if (
              inp.current?.selectionStart === 0 ||
              inp.current?.selectionStart === null
            ) {
              commitValue();
              inp.current?.blur();
              setSelectedPill(values.length - 1);
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }}
        onFocus={() => {
          setFocused(true);
          setSelectedPill(undefined);
        }}
        autoFocus={autoFocus}
      />
    </div>
  );
};

interface PillProps {
  onClick: () => void;
  onDelete: () => void;
  children: ReactNode;
  forwardRef: (ref: HTMLDivElement | null) => void;
  color?: TokenColor;
}

const Pill = ({
  children,
  color = DEFAULT_TOKEN_COLOR,
  forwardRef,
  onClick,
  onDelete,
}: PillProps) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      ref={forwardRef}
      {...stylex.props(styles.pill, colorVariants[color])}
    >
      {children}
      <div title="Remove" {...stylex.props(styles.remove)}>
        <ClearIcon onClick={() => onDelete()} {...stylex.props(styles.clear)} />
      </div>
    </div>
  );
};

const styles = stylex.create({
  outer: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 'normal',
    borderRadius: 4,
    border: '1px solid rgba(230, 235, 239, 1)',
    padding: '2px 3px',
    outline: 'none',
    display: 'flex',
    overflow: 'hidden',
    gap: 3,
    flexWrap: 'nowrap',
    borderColor: {
      default: 'none',
      ':focus': '#4285F4',
    },
  },

  input: {
    border: 'none',
    outline: 'none',
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#fff',
    minWidth: 95,
    padding: '3.75px 7px',
    flexGrow: 1,
  },

  pill: {
    backgroundColor: 'rgba(230, 235, 239, 1)',
    borderRadius: 5,
    color: labelVars.color,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '1px 5px',
    textTransform: 'none',
    cursor: 'pointer',
    height: 20,
  },

  remove: {
    display: 'inline-flex',
  },

  clear: {
    width: 14,
    height: 14,
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
