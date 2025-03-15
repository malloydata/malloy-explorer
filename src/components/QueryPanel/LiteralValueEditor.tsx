/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {RawLiteralValue} from '@malloydata/malloy-query-builder';

export interface LiteralValueEditorProps {
  value: Malloy.LiteralValue | undefined;
  setValue: (value: RawLiteralValue) => void;
}

export function LiteralValueEditor({value, setValue}: LiteralValueEditorProps) {
  if (!value) {
    return null;
  }

  switch (value.kind) {
    case 'boolean_literal':
      return (
        <input
          type="checkbox"
          checked={value.boolean_value}
          onChange={event => setValue(event.target.checked)}
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
      return '∅';
    case 'number_literal':
      return (
        <input
          value={value.number_value}
          type="number"
          onChange={event => setValue(event.target.valueAsNumber)}
        />
      );
    case 'string_literal':
      return (
        <input
          value={value.string_value}
          onChange={event => setValue(event.target.value)}
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
  }
}
