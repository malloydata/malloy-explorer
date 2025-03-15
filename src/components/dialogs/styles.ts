/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const dialogStyles = stylex.create({
  content: {
    background: 'white',
    borderRadius: 10,
    boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.10)',
    fontFamily: 'sans-serif',
    margin: 8,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 0,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'right',
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
