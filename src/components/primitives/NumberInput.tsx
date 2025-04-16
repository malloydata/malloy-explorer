/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import * as React from 'react';
import {useEffect, useState} from 'react';

interface NumberInputProps {
  value: number;
  setValue: (value: number) => void;
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
  width?: string;
}

export default function NumberInput({
  value,
  setValue,
  placeholder,
  label,
  autoFocus,
  width,
}: NumberInputProps) {
  const [tempValue, setTempValue] = useState(value.toString());

  useEffect(() => {
    setTempValue(value.toString());
  }, [value]);

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type="number"
        placeholder={placeholder}
        value={tempValue}
        style={{width: width ? width : 'auto'}}
        onChange={event => {
          const raw = event.target.value;
          setTempValue(raw);
          const v = parseFloat(raw);
          if (!Number.isNaN(v)) {
            setValue(v);
          }
        }}
        autoFocus={autoFocus}
        {...stylex.props(styles.numberInput)}
      />
    </div>
  );
}

const styles = stylex.create({
  numberInput: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: 4,
    color: 'rgb(95, 99, 104)',
    padding: '3px 3px 3px 10px',
  },
});
