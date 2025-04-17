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
import {StyleXStyles} from '@stylexjs/stylex';

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
        <input
          value={value.date_value}
          type="date"
          onChange={event =>
            setValue({
              date: event.target.valueAsDate ?? new Date(),
              granularity: 'day',
            })
          }
        />
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
        <input
          value={value.timestamp_value}
          type="date"
          onChange={event =>
            setValue({
              date: event.target.valueAsDate ?? new Date(),
              granularity: 'second',
            })
          }
        />
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
