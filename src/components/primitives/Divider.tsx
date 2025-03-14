/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex from '@stylexjs/stylex';
import {StyleXStyles} from '@stylexjs/stylex/lib/StyleXTypes';

const DEFAULT_ORIENTATION = 'horizontal';

type Orientation = 'horizontal' | 'vertical';

interface DividerProps {
  /**
   * Either `horizontal` or `vertical`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * Custom styles for the divider.
   */
  style?: StyleXStyles;
}

export default function Divider({
  orientation = DEFAULT_ORIENTATION,
  style,
}: DividerProps) {
  return <div {...stylex.props(styles[orientation], style)}></div>;
}

const styles = stylex.create({
  horizontal: {
    background: '#CCD3DB',
    height: '1px',
    width: '100%',
  },
  vertical: {
    background: '#CCD3DB',
    height: '100px',
    width: '1px',
  },
});
