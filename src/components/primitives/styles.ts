/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import {backgroundColors, textColors, utility} from './colors.stylex';

export const tooltipStyles = stylex.create({
  default: {
    padding: '4px 8px',
    borderRadius: '12px',
    color: textColors.tooltip,
    backgroundColor: backgroundColors.tooltip,
    maxWidth: '360px',
    boxShadow: utility.elevationSmall,
    zIndex: 2,
  },
  card: {
    width: 'var(--radix-tooltip-trigger-width)',
    maxHeight: 'var(--radix-tooltip-content-available-height)',
    backgroundColor: backgroundColors.surface,
    boxShadow: utility.elevationSmall,
    zIndex: 2,
  },
});

export const fontStyles = stylex.create({
  largeEmphasized: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.primary,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '-0.24px',
  },
  largeBody: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.primary,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  emphasized: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.primary,
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.24px',
  },
  body: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.primary,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  link: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.link,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  supporting: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.primary,
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0px',
  },
  badge: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(228, 230, 235, 1)',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '-0.24px',
  },
  tooltipText: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: textColors.tooltip,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  },
});
