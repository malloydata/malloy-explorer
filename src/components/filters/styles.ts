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
    padding: 8,
    minWidth: 224,
    maxWidth: 264,
    gap: 8,
    minHeight: 0,
    maxHeight: '50vh',
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
  editor: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minHeight: 0,
  },
  editorRow: {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: 8,
  },
  editorCell: {
    flexGrow: 1,
  },
  input: {
    border: '1px solid #e0e0e0',
    color: 'rgb(95, 99, 104)',
    padding: '4px 8px 4px 8px',
    borderRadius: 5,
    minWidth: '1px',
  },
});
