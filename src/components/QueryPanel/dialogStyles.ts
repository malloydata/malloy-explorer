/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from '@stylexjs/stylex';
import {
  backgroundColors,
  textColors,
  utility,
} from '../primitives/colors.stylex';

export const dialogStyles = stylex.create({
  displayNone: {
    display: 'none',
  },
  overlay: {
    background: 'rgba(0 0 0 / 0.0)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 100,
  },
  title: {
    fontSize: '16px',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: backgroundColors.divider,
    lineHeight: '2.2em',
  },
  close: {
    border: 'none',
    background: {
      default: 'transparent',
      ':hover': backgroundColors.controlHover,
      ':active': backgroundColors.controlActive,
    },
    borderRadius: 4,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: utility.elevationMedium,
    backgroundColor: backgroundColors.surface,
    borderRadius: 8,
    padding: 8,
    minWidth: 240,
    maxWidth: 280,
    gap: 8,
  },
  editor: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  editorRow: {
    display: 'flex',
    gap: 8,
  },
  editorCell: {
    flexGrow: 1,
  },
  input: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: backgroundColors.divider,
    color: textColors.primary,
    backgroundColor: backgroundColors.surfaceSubtle,
    padding: '4px 8px 4px 8px',
    borderRadius: 5,
  },
});
