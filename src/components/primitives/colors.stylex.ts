/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const backgroundColors = stylex.defineVars({
  gray: 'rgba(10, 19, 23, 0.2)',
  purple: 'rgba(121, 82, 255, 0.2)',
  green: 'rgba(36, 187, 94, 0.2)',
  cyan: 'rgba(3, 167, 215, 0.2)',
});

export const textColors = stylex.defineVars({
  primary: 'rgba(10, 19, 23, 1)',
  secondary: 'rgba(78, 96, 111, 1)',
  disabled: 'rgba(164, 176, 188, 1)',
  primaryOnDarkMedia: 'rgba(255, 255, 255, 1)',
  gray: 'rgba(10, 19, 23, 1)',
  purple: 'rgba(62, 6, 151, 1)',
  green: 'rgba(9, 68, 31, 1)',
  cyan: 'rgba(1, 73, 117, 1)',
});

export const iconColors = stylex.defineVars({
  primary: 'rgba(10, 19, 23, 1)',
  secondary: 'rgba(78, 96, 111, 1)',
  disabled: 'rgba(164, 176, 188, 1)',
  primaryOnMedia: 'rgba(255, 255, 255, 1)',
  gray: 'rgba(10, 19, 23, 1)',
  purple: 'rgba(121, 82, 255, 1)',
  green: 'rgba(7, 109, 41, 1)',
  cyan: 'rgba(2, 141, 193, 1)',
});
