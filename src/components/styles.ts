/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  icon: {
    width: 18,
    height: 18,
    display: 'inline-block',
  },
  menuIcon: {width: 24, height: 24},

  labelWithIcon: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: 8,
  },

  label: {},

  heading: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  queryCard: {
    border: '1px solid #CCD3DB',
    borderRadius: 5,
    padding: 8,
  },
  queryHeader: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  queryFooter: {
    justifyContent: 'left',
    display: 'flex',
    flexDirection: 'row',
    width: 'calc(100% - 40)',
    padding: 12,
  },
  title: {
    whiteSpace: 'nowrap',
    padding: '5px 0',
  },
  tokenContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  token: {
    backgroundColor: '#E6EBEF',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: '#E6EBEF',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
    display: 'flex',
    gap: 8,
  },
});
