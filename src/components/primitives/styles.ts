/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const tooltipStyles = stylex.create({
  default: {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'rgba(221, 226, 232, 1)',
    backgroundColor: 'rgba(37, 54, 63, 1)',
    maxWidth: '360px',
    boxShadow:
      '0px 2px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  card: {
    width: 'var(--radix-tooltip-trigger-width)',
    maxHeight: 'var(--radix-tooltip-content-available-height)',
    zIndex: 1,
  },
});

export const fontStyles = stylex.create({
  largeEmphasized: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(5, 5, 5, 1)',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '-0.24px',
  },
  largeBody: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(5, 5, 5, 1)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  emphasized: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(5, 5, 5, 1)',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.24px',
  },
  body: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(5, 5, 5, 1)',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  link: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(0, 100, 224, 1)',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0px',
  },
  supporting: {
    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    color: 'rgba(5, 5, 5, 1)',
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
});
