/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext} from 'react';
import {ColorTheme} from '../colors.stylex';

export interface ThemeContextProps {
  theme?: ColorTheme;
  dark?: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({});
