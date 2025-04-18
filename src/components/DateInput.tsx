/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import moment from 'moment';
import {useEffect, useState} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {TemporalUnit} from '@malloydata/malloy-filter';

interface DateInputProps {
  value: Date;
  setValue: (value: Date) => void;
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
  units: TemporalUnit;
  onFocus?: () => void;
  onBlur?: () => void;
  isActive?: boolean;
  customStyle?: StyleXStyles;
}

export const formats: Record<TemporalUnit, string> = {
  second: 'YYYY-MM-DD HH:mm:ss',
  minute: 'YYYY-MM-DD HH:mm',
  hour: 'YYYY-MM-DD HH:00',
  day: 'YYYY-MM-DD',
  week: '[WK]YYYY-WW',
  month: 'YYYY-MM',
  quarter: 'YYYY-[Q]Q',
  year: 'YYYY',
};

const regexps: Record<TemporalUnit, RegExp> = {
  second: /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/,
  minute: /\d\d\d\d-\d\d-\d\d \d\d:\d\d/,
  hour: /\d\d\d\d-\d\d-\d\d \d\d:00/,
  day: /\d\d\d\d-\d\d-\d\d/,
  week: /WK\d\d\d\d-\d\d-\d\d/,
  month: /\d\d\d\d-\d\d/,
  quarter: /\d\d\d\d-Q\d/,
  year: /\d\d\d\d/,
};

export const DateInput: React.FC<DateInputProps> = ({
  value,
  setValue,
  placeholder,
  autoFocus,
  units,
  onFocus,
  onBlur,
  customStyle,
}) => {
  const format = formats[units];
  const [tempValue, setTempValue] = useState(moment(value).format(format));

  useEffect(() => {
    setTempValue(moment(value).format(format));
  }, [value, format]);

  return (
    <input
      {...stylex.props(customStyle)}
      type="text"
      placeholder={placeholder || format}
      value={tempValue}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={event => {
        const raw = event.target.value;
        setTempValue(raw);
        const regex = regexps[units];
        if (raw.match(regex)) {
          const m = moment(raw, format);
          if (m.isValid()) {
            setValue(m.toDate());
          }
        }
      }}
      autoFocus={autoFocus}
    />
  );
};
