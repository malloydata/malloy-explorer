/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from './colors.stylex';
import {StyleXStyles} from '@stylexjs/stylex/lib/StyleXTypes';

const DEFAULT_ORIENTATION = 'horizontal';

type Orientation = keyof typeof orientationVariants;

interface DividerProps {
  /**
   * Either `horizontal` or `vertical`. Defaults to `horizontal`.
   */
  orientation?: Orientation;
  /**
   * Custom styles for the divider.
   */
  customStyle?: StyleXStyles;
}

export default function Divider({
  orientation = DEFAULT_ORIENTATION,
  customStyle,
}: DividerProps) {
  return (
    <div
      {...stylex.props(
        styles.main,
        orientationVariants[orientation],
        customStyle
      )}
    ></div>
  );
}

const styles = stylex.create({
  main: {
    background: backgroundColors.divider,
  },
});

const orientationVariants = stylex.create({
  horizontal: {
    height: '1px',
    width: '100%',
  },
  vertical: {
    height: '100px',
    width: '1px',
  },
});
