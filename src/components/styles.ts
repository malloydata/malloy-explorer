/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  icon: {width: 18, height: 18, display: 'inline-block'},
  menuIcon: {width: 24, height: 24},

  labelWithIcon: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: 8,
  },

  label: {},

  heading: {
    border: '1px solid black',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },

  queryHeader: {
    justifyContent: 'space-between',
    display: 'flex',
    direction: 'row',
    width: '100%',
  },

  title: {
    fontWeight: 'bold',
  },
  tokenContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  token: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
    display: 'flex',
    gap: 8,
  },
});
