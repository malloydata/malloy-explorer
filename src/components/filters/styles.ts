/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const filterStyles = stylex.create({
  filterDialog: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    gap: 8,
  },
  filterDialogHeader: {
    fontWeight: 'bold',
  },
  filterTypeDropdown: {
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    gap: 8,
  },
});
