/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';

import BooleanTypeIcon from '../assets/types/type-icon-on-off.svg?react';
import DateTypeIcon from '../assets/types/type-icon-date.svg?react';
import NumberTypeIcon from '../assets/types/type-icon-number.svg?react';
import StringTypeIcon from '../assets/types/type-icon-string.svg?react';

export interface LiteralIconProps {
  value: Malloy.LiteralValue | undefined;
}

export function LiteralIcon({value}: LiteralIconProps) {
  if (!value) {
    return null;
  }

  switch (value.kind) {
    case 'boolean_literal':
      return <BooleanTypeIcon {...stylex.props(styles.icon)} />;
    case 'date_literal':
      return <DateTypeIcon {...stylex.props(styles.icon)} />;
    case 'null_literal':
      return '∅';
    case 'number_literal':
      return <NumberTypeIcon {...stylex.props(styles.icon)} />;
    case 'string_literal':
      return <StringTypeIcon {...stylex.props(styles.icon)} />;
    case 'timestamp_literal':
      return <DateTypeIcon {...stylex.props(styles.icon)} />;
  }
}
