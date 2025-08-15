/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

// Centralized semantic color variables for light/dark themes
// These variables are intentionally semantic (by role) rather than raw hues.

// Surfaces and backgrounds used across the application
export const backgroundColors = stylex.defineVars({
  // Generic semantic surfaces
  app: 'rgba(255, 255, 255, 1)', // main app background
  surface: 'rgba(255, 255, 255, 1)', // cards, panels, inputs
  surfaceSubtle: 'rgba(241, 244, 247, 1)', // subtle backgrounds, washes
  surfaceToken: 'rgba(230, 235, 239, 1)', // token backgrounds
  tooltip: 'rgba(37, 54, 63, 1)', // tooltip surface on light theme

  // Category/legend fills (deemphasized tints)
  gray: 'rgba(10, 19, 23, 0.2)',
  purple: 'rgba(121, 82, 255, 0.2)',
  green: 'rgba(36, 187, 94, 0.2)',
  cyan: 'rgba(3, 167, 215, 0.2)',

  // States and helpers
  divider: 'rgba(204, 211, 219, 1)',
  accentDeemphasized: 'rgba(0, 130, 251, 0.2)',
  positiveDeemphasized: 'rgba(11, 153, 31, 0.2)',
  warningDeemphasized: 'rgba(226, 164, 0, 0.2)',
  negativeDeemphasized: 'rgba(227, 25, 59, 0.2)',

  // Overlays
  overlayHover: 'rgba(0, 0, 0, 0.05)',
  overlayActive: 'rgba(0, 0, 0, 0.1)',
  disabledOverlay: 'rgba(255, 255, 255, 0.5)',

  // Controls
  controlDefault: 'rgba(230, 235, 239, 1)',
  controlHover: 'rgba(221, 226, 232, 1)',
  controlActive: 'rgba(204, 211, 219, 1)',

  // Brand-filled control backgrounds
  brandDefault: 'rgba(0, 100, 224, 1)',
  brandHover: 'rgba(4, 87, 203, 1)',
  brandActive: 'rgba(0, 76, 188, 1)',
});

// Text colors for content in different contexts
export const textColors = stylex.defineVars({
  primary: 'rgba(10, 19, 23, 1)',
  secondary: 'rgba(78, 96, 111, 1)',
  disabled: 'rgba(164, 176, 188, 1)',
  link: 'rgba(0, 100, 224, 1)',
  tooltip: 'rgba(221, 226, 232, 1)',

  // On dark surfaces (e.g., tooltip)
  primaryOnDarkMedia: 'rgba(255, 255, 255, 1)',

  // Category/legend text
  gray: 'rgba(10, 19, 23, 1)',
  purple: 'rgba(62, 6, 151, 1)',
  green: 'rgba(9, 68, 31, 1)',
  cyan: 'rgba(1, 73, 117, 1)',
  dimension: 'rgba(66, 133, 244, 1)', // Copied from dimension.fillStrong
});

// Icon colors aligned to text roles and accents
export const iconColors = stylex.defineVars({
  primary: 'rgba(10, 19, 23, 1)',
  secondary: 'rgba(78, 96, 111, 1)',
  disabled: 'rgba(164, 176, 188, 1)',
  primaryOnMedia: 'rgba(255, 255, 255, 1)',
  gray: 'rgba(164, 176, 188, 1)',
  purple: 'rgba(121, 82, 255, 1)',
  green: 'rgba(7, 109, 41, 1)',
  cyan: 'rgba(2, 141, 193, 1)',
  warning: 'rgba(233, 175, 8, 1)',
  accent: 'rgba(0, 100, 224, 1)',
  positive: 'rgba(13, 134, 38, 1)',
  negative: 'rgba(227, 25, 59, 1)',
});

// Decorative and utility tokens
export const utility = stylex.defineVars({
  // Shadows
  elevationMedium:
    '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
  elevationSmall:
    '0px 2px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
  outline: '0 0 0 1px rgba(204, 211, 219, 1)',
  focusOutline: '0 0 0 2px rgba(0, 100, 224, 1)',

  // Focus ring and brand
  focusRingColor: 'rgb(0, 100, 224)',
  focusRingInner: 'rgba(1, 113, 227, 0.3) 0px 0px 0px 3px inset',

  // Spinner
  spinnerTrack: 'rgba(0, 0, 0, 0.1)',
});

// Dark theme values (apply per variable group). Compose them where needed.
export const darkBackgroundTheme = stylex.createTheme(backgroundColors, {
  app: 'rgba(20, 22, 25, 1)',
  surface: 'rgba(30, 33, 37, 1)',
  surfaceSubtle: 'rgba(39, 43, 47, 1)',
  surfaceToken: 'rgba(48, 53, 58, 1)',
  tooltip: 'rgba(245, 247, 250, 1)',

  gray: 'rgba(245, 247, 250, 0.16)',
  purple: 'rgba(121, 82, 255, 0.24)',
  green: 'rgba(36, 187, 94, 0.24)',
  cyan: 'rgba(3, 167, 215, 0.24)',

  divider: 'rgba(71, 76, 82, 1)',
  accentDeemphasized: 'rgba(0, 130, 251, 0.24)',
  positiveDeemphasized: 'rgba(11, 153, 31, 0.24)',
  warningDeemphasized: 'rgba(226, 164, 0, 0.24)',
  negativeDeemphasized: 'rgba(227, 25, 59, 0.24)',

  overlayHover: 'rgba(255, 255, 255, 0.06)',
  overlayActive: 'rgba(255, 255, 255, 0.12)',
  disabledOverlay: 'rgba(0, 0, 0, 0.25)',
  controlDefault: 'rgba(48, 53, 58, 1)',
  controlHover: 'rgba(55, 61, 67, 1)',
  controlActive: 'rgba(64, 71, 78, 1)',
  brandDefault: 'rgba(98, 162, 255, 1)',
  brandHover: 'rgba(88, 146, 232, 1)',
  brandActive: 'rgba(74, 126, 205, 1)',
});

export const darkTextTheme = stylex.createTheme(textColors, {
  primary: 'rgba(241, 244, 247, 1)',
  secondary: 'rgba(189, 198, 206, 1)',
  disabled: 'rgba(126, 139, 151, 1)',
  link: 'rgba(98, 162, 255, 1)',
  tooltip: 'rgba(30, 33, 37, 1)',
  primaryOnDarkMedia: 'rgba(5, 5, 5, 1)',

  gray: 'rgba(221, 226, 232, 1)',
  purple: 'rgba(180, 139, 255, 1)',
  green: 'rgba(118, 231, 166, 1)',
  cyan: 'rgba(108, 208, 244, 1)',
  dimension: 'rgba(144, 187, 255, 1)',
});

export const darkIconTheme = stylex.createTheme(iconColors, {
  primary: 'rgba(241, 244, 247, 1)',
  secondary: 'rgba(189, 198, 206, 1)',
  disabled: 'rgba(126, 139, 151, 1)',
  primaryOnMedia: 'rgba(5, 5, 5, 1)',
  gray: 'rgba(126, 139, 151, 1)',
  purple: 'rgba(180, 139, 255, 1)',
  green: 'rgba(118, 231, 166, 1)',
  cyan: 'rgba(108, 208, 244, 1)',
  warning: 'rgba(233, 175, 8, 1)',
  accent: 'rgba(98, 162, 255, 1)',
  positive: 'rgba(118, 231, 166, 1)',
  negative: 'rgba(255, 122, 147, 1)',
});

export const darkUtilityTheme = stylex.createTheme(utility, {
  elevationMedium:
    '0 1px 2px 0 rgba(0, 0, 0, 0.6), 0 2px 12px 0 rgba(0, 0, 0, 0.4)',
  elevationSmall:
    '0px 2px 12px 0px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.4)',
  outline: '0 0 0 1px rgba(71, 76, 82, 1)',
  focusOutline: '0 0 0 2px rgba(98, 162, 255, 1)',
  focusRingColor: 'rgb(98, 162, 255)',
  focusRingInner: 'rgba(98, 162, 255, 0.3) 0px 0px 0px 3px inset',
  spinnerTrack: 'rgba(255, 255, 255, 0.15)',
});

export const darkThemes = [
  darkBackgroundTheme,
  darkTextTheme,
  darkIconTheme,
  darkUtilityTheme,
] as const;
