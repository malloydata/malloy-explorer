/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import {backgroundColors, textColors} from '../../primitives/colors.stylex';

export const colors = stylex.defineVars({
  accent: textColors.link as unknown as string,
  accentDeemphasized: backgroundColors.accentDeemphasized as unknown as string,
  background: backgroundColors.surface as unknown as string,
  shadowElevation: 'rgba(0, 0, 0, 0.10)',
  hover: backgroundColors.overlayHover as unknown as string,
  text: textColors.primary as unknown as string,
  disabledText: textColors.disabled as unknown as string,
});
