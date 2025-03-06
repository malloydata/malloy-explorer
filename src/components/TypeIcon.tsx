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

import ArrayTypeIcon from '../assets/types/type-icon-array.svg?react';
import BooleanTypeIcon from '../assets/types/type-icon-on-off.svg?react';
import DateTypeIcon from '../assets/types/type-icon-date.svg?react';
import JsonTypeIcon from '../assets/types/type-icon-json.svg?react';
import NumberTypeIcon from '../assets/types/type-icon-number.svg?react';
import SqlNativeTypeIcon from '../assets/types/type-icon-sql-native.svg?react';
import StringTypeIcon from '../assets/types/type-icon-string.svg?react';

export interface TypeIconParameters {
  type: Malloy.AtomicType;
}

export function TypeIcon({type}: TypeIconParameters) {
  switch (type.kind) {
    case 'array_type':
      return <ArrayTypeIcon {...stylex.props(styles.icon)} />;
    case 'boolean_type':
      return <BooleanTypeIcon {...stylex.props(styles.icon)} />;
    case 'date_type':
      return <DateTypeIcon {...stylex.props(styles.icon)} />;
    case 'json_type':
      return <JsonTypeIcon {...stylex.props(styles.icon)} />;
    case 'number_type':
      return <NumberTypeIcon {...stylex.props(styles.icon)} />;
    case 'record_type':
      return <JsonTypeIcon {...stylex.props(styles.icon)} />;
    case 'sql_native_type':
      return <SqlNativeTypeIcon {...stylex.props(styles.icon)} />;
    case 'string_type':
      return <StringTypeIcon {...stylex.props(styles.icon)} />;
    case 'timestamp_type':
      return <DateTypeIcon {...stylex.props(styles.icon)} />;
  }
}
