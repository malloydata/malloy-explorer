/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import moment from 'moment';
import {RefObject, useEffect, useState} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {Moment, TemporalUnit} from '@malloydata/malloy-filter';

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
  forwardRef?: RefObject<HTMLInputElement | null>;
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
  isActive,
  customStyle,
  forwardRef,
}) => {
  const format = formats[units];
  const [tempValue, setTempValue] = useState(moment.utc(value).format(format));

  useEffect(() => {
    setTempValue(moment.utc(value).format(format));
  }, [value, format]);

  return (
    <input
      {...stylex.props(customStyle, isActive ? styles.active : null)}
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
          const m = moment.utc(raw, format);
          if (m.isValid()) {
            setValue(m.toDate());
          }
        }
      }}
      autoFocus={autoFocus}
      ref={forwardRef}
    />
  );
};

export function guessUnits(moment: Moment, isDateTime: boolean): TemporalUnit {
  if (moment.moment === 'literal') {
    const {literal} = moment;
    for (const unit in regexps) {
      const temporalUnit = unit as TemporalUnit;
      if (literal.match(regexps[temporalUnit])) {
        return temporalUnit;
      }
    }
  }
  // TODO - handle other Moment types
  return isDateTime ? 'second' : 'day';
}

const styles = stylex.create({
  active: {
    backgroundColor: 'rgb(240, 246, 255)',
  },
});
