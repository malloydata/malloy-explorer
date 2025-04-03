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
  washOnWeb: 'rgba(241, 244, 247, 1)',
  accentDeemphasized: 'rgba(0, 130, 251, 0.2)',
  positiveDeemphasized: 'rgba(11, 153, 31, 0.2)',
  warningDeemphasized: 'rgba(226, 164, 0, 0.2)',
  negativeDeemphasized: 'rgba(227, 25, 59, 0.2)',
  divider: 'rgba(204, 211, 219, 1)',
  token: 'rgba(230, 235, 239, 1)',
});

export const textColors = stylex.defineVars({
  primary: 'rgba(10, 19, 23, 1)',
  secondary: 'rgba(78, 96, 111, 1)',
  disabled: 'rgba(164, 176, 188, 1)',
  link: 'rgba(0, 100, 224, 1)',
  primaryOnDarkMedia: 'rgba(255, 255, 255, 1)',
  gray: 'rgba(10, 19, 23, 1)',
  purple: 'rgba(62, 6, 151, 1)',
  green: 'rgba(9, 68, 31, 1)',
  cyan: 'rgba(1, 73, 117, 1)',
  dimension: 'rgba(66, 133, 244, 1)', // Copied from dimension.fillStrong
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
  warning: 'rgba(233, 175, 8, 1)',
  accent: 'rgba(0, 100, 224, 1)',
  positive: 'rgba(13, 134, 38, 1)',
  negative: 'rgba(227, 25, 59, 1)',
});
