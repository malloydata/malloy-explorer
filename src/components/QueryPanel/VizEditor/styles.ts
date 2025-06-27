/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  trigger: {
    height: 'calc(100% - 8px)',
  },
  left: {
    display: 'flex',
    justifyContent: 'right',
  },
  right: {
    display: 'flex',
    justifyContent: 'left',
  },
  heading: {
    gridColumn: 'span 2',
    fontWeight: 'bold',
  },
  label: {
    whiteSpace: 'nowrap',
  },
  divider: {
    gridColumn: 'span 3',
    borderTop: '1px solid #e0e0e0',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 240,
    maxWidth: 420,
    maxHeight: 420,
    gap: 8,
  },
  editor: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflow: 'hidden',
  },
  editorGrid: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr min-content',
    gridAutoRows: 'max-content',
    gap: 8,
    overflowY: 'auto',
  },
  editorRow: {
    display: 'flex',
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
  },
  card: {
    maxWidth: '350px',
  },
  infoTrigger: {
    display: 'inline-flex',
    alignItems: 'top',
    justifyContent: 'center',
    paddingRight: '8px',
    paddingTop: '4px',
  },
});
