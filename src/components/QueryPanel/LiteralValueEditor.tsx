/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {EditableToken, SelectorToken, Token} from '../primitives';
import {StyleXStyles} from '@stylexjs/stylex';
import {DateLiteralEditor} from './DateLiteralEditor';
import {FilterLiteralEditor} from './FilterLiteralEditor';

export interface LiteralValueEditorProps {
  value: Malloy.LiteralValue | undefined;
  filterType?: Malloy.FilterableTypeType;
  setValue: (value: Malloy.LiteralValue) => void;
  customStyle?: StyleXStyles;
}

export function LiteralValueEditor({
  value,
  filterType,
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
          onChange={value =>
            setValue({kind: 'boolean_literal', boolean_value: value === 'true'})
          }
          customStyle={customStyle}
        />
      );
    case 'date_literal':
    case 'timestamp_literal':
      return (
        <DateLiteralEditor
          value={value}
          setValue={setValue}
          customStyle={customStyle}
        />
      );
    case 'null_literal':
      return <Token label="∅" />;
    case 'number_literal':
      return (
        <EditableToken
          value={value.number_value}
          type="number"
          onChange={value =>
            setValue({kind: 'number_literal', number_value: value})
          }
          customStyle={customStyle}
        />
      );
    case 'string_literal':
      return (
        <EditableToken
          value={value.string_value}
          onChange={value =>
            setValue({kind: 'string_literal', string_value: value})
          }
          customStyle={customStyle}
        />
      );
    case 'filter_expression_literal':
      return (
        <FilterLiteralEditor
          value={value}
          filterType={filterType}
          setValue={setValue}
          customStyle={customStyle}
        />
      );
  }
}
