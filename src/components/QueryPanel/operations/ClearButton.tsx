/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import ClearIcon from '../../../assets/refinements/clear.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';

export interface ClearButtonProps {
  onClick: () => void;
}

export function ClearButton({onClick}: ClearButtonProps) {
  return <ClearIcon {...stylex.props(styles.icon)} onClick={onClick} />;
}
