/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Token} from '../primitives';
import {StyleXStyles} from '@stylexjs/stylex';

interface LiteralValueEditorProps {
  value: Malloy.LiteralValue | undefined;
  customStyle?: StyleXStyles;
}

export function LiteralValue({value, customStyle}: LiteralValueEditorProps) {
  if (!value) {
    return <Token label="∅" />;
  }

  switch (value.kind) {
    case 'boolean_literal':
      return (
        <Token
          label={value.boolean_value ? 'true' : 'false'}
          customStyle={customStyle}
        />
      );
    case 'date_literal':
    case 'timestamp_literal':
      return <Token label={'TODO'} customStyle={customStyle} />;
    case 'null_literal':
      return <Token label="∅" />;
    case 'number_literal':
      return (
        <Token
          label={value.number_value.toLocaleString()}
          customStyle={customStyle}
        />
      );
    case 'string_literal':
      return <Token label={value.string_value} customStyle={customStyle} />;
    case 'filter_expression_literal':
      return (
        <Token
          label={value.filter_expression_value}
          customStyle={customStyle}
        />
      );
  }
}
