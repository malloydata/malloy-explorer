/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

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
