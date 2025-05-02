/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useRef, useState} from 'react';
import {DateInput, formats} from '../DateInput';
import moment from 'moment';
import {tokenStyles} from '../primitives/tokens/styles';
import * as Popover from '@radix-ui/react-popover';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {DatePicker} from '../primitives';
import ErrorIcon from '../primitives/ErrorIcon';
import {
  LiteralValueWithDateLiteral,
  LiteralValueWithTimestampLiteral,
} from '@malloydata/malloy-interfaces';
import {useClickOutside} from '../hooks/useClickOutside';

interface DateLiteralEditorProps {
  value: LiteralValueWithDateLiteral | LiteralValueWithTimestampLiteral;
  setValue: (value: Malloy.LiteralValue) => void;
  customStyle?: StyleXStyles;
}

export function DateLiteralEditor({
  value,
  setValue,
  customStyle,
}: DateLiteralEditorProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const picker = useRef<HTMLDivElement>(null);

  const isDate = value.kind === 'date_literal';
  const date = isDate ? value.date_value : value.timestamp_value;
  const units = isDate ? 'day' : 'second';

  const onSetValue = (date: Date) => {
    if (date) {
      setErrorMessage('');
      if (isDate) {
        setValue({
          kind: 'date_literal',
          date_value: moment.utc(date).format(formats['day']),
        });
      } else {
        setValue({
          kind: 'timestamp_literal',
          timestamp_value: moment.utc(date).format(formats['second']),
        });
      }
    } else {
      setErrorMessage('Invalid date');
    }
  };

  useClickOutside([input, picker], () => {
    setOpen(false);
  });

  return (
    <Popover.Root open={open} onOpenChange={() => {}}>
      <Popover.Trigger asChild>
        <div {...stylex.props(tokenStyles.main, styles.wrapper, customStyle)}>
          <DateInput
            value={moment.utc(date).toDate()}
            setValue={onSetValue}
            units={units}
            onFocus={() => setOpen(true)}
            customStyle={{
              ...styles.input,
              ...(isDate ? styles.dateInput : styles.timestampInput),
            }}
            forwardRef={input}
          />
        </div>
      </Popover.Trigger>
      {errorMessage && <ErrorIcon errorMessage={errorMessage} />}
      <Popover.Portal>
        <Popover.Content align="center" asChild>
          <DatePicker
            value={moment.utc(date).toDate()}
            setValue={onSetValue}
            units={units}
            maxLevel={units}
            customStyle={styles.datePicker}
            forwardRef={picker}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const styles = stylex.create({
  input: {
    border: 'none',
    height: 26,
    backgroundColor: {
      default: 'transparent',
      ':focus': 'white',
    },
  },
  dateInput: {
    width: '5.5em',
  },
  timestampInput: {
    width: '10em',
  },
  wrapper: {},
  datePicker: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 260,
  },
});
