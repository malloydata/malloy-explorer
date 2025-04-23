/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {RawLiteralValue} from '@malloydata/malloy-query-builder';
import {EditableToken, SelectorToken, Token} from '../primitives';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import ErrorIcon from '../primitives/ErrorIcon';

export interface LiteralValueEditorProps {
  value: Malloy.LiteralValue | undefined;
  setValue: (value: RawLiteralValue) => void;
  customStyle?: StyleXStyles;
}

export function LiteralValueEditor({
  value,
  setValue,
  customStyle,
}: LiteralValueEditorProps) {
  const [errorMessage, setErrorMessage] = React.useState('');
  if (!value) {
    return null;
  }

  switch (value.kind) {
    case 'boolean_literal':
      return (
        <SelectorToken
          value={value.boolean_value ? 'true' : 'false'}
          items={[
            {label: 'true', value: 'true'},
            {label: 'false', value: 'false'},
          ]}
          onChange={value => setValue(value === 'true')}
          customStyle={customStyle}
        />
      );
    case 'date_literal':
      return (
        <div {...stylex.props(styles.row)}>
          <input
            value={value.date_value.split(' ')[0]}
            type="date"
            onChange={event => {
              if (event.target.valueAsDate) {
                setErrorMessage('');
                setValue({
                  date: event.target.valueAsDate,
                  granularity: 'day',
                });
              } else {
                setErrorMessage('Invalid date');
              }
            }}
          />
          {errorMessage && <ErrorIcon errorMessage={errorMessage} />}
        </div>
      );
    case 'null_literal':
      return <Token label="∅" />;
    case 'number_literal':
      return (
        <EditableToken
          value={value.number_value}
          type="number"
          onChange={value => setValue(value)}
          customStyle={customStyle}
        />
      );
    case 'string_literal':
      return (
        <EditableToken
          value={value.string_value}
          onChange={value => setValue(value)}
          customStyle={customStyle}
        />
      );
    case 'timestamp_literal':
      return (
        <div {...stylex.props(styles.row)}>
          <input
            value={value.timestamp_value}
            type="date"
            onChange={event => {
              if (event.target.valueAsDate) {
                setErrorMessage('');
                setValue({
                  date: event.target.valueAsDate,
                  granularity: 'second',
                });
              } else {
                setErrorMessage('Invalid date');
              }
            }}
          />
          {errorMessage && <ErrorIcon errorMessage={errorMessage} />}
        </div>
      );
    case 'filter_expression_literal':
      return (
        <EditableToken
          value={value.filter_expression_value}
          onChange={value => setValue(value)}
          customStyle={customStyle}
        />
      );
  }
}

const styles = stylex.create({
  row: {
    display: 'flex',
  },
});
