/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';

export interface FieldProps {
  children: ReactNode | ReactNode[];
}

export function Label({children}: FieldProps) {
  return <div {...stylex.props(styles.label)}>{children}</div>;
}
