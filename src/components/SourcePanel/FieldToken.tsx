/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Token} from '../primitives';
import {hoverActionsVars} from './field-token.stylex';

interface FieldTokenProps {
  /**
   * The field information associated with the token.
   */
  field: FieldInfo;

  /**
   * Called when the token is clicked.
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Called when the token is hovered or not hovered.
   */
  onHover?: (isHovered: boolean) => void;

  /**
   * Optional hover actions to render when the token is hovered.
   */
  hoverActions?: React.ReactNode;
}

export default function FieldToken({
  field,
  onClick,
  onHover,
  hoverActions,
}: FieldTokenProps) {
  if (field.kind === 'join') {
    return null;
  }

  return (
    <div {...stylex.props(styles.main)}>
      <div style={{display: 'inline-grid'}}>
        <Token
          label={field.name}
          color={
            field.kind === 'view'
              ? 'purple'
              : field.kind === 'measure'
                ? 'green'
                : 'cyan'
          }
          onClick={onClick}
          icon={field.kind}
          onHover={onHover}
        />
      </div>
      {hoverActions && (
        <div {...stylex.props(styles.hoverActions)}>{hoverActions}</div>
      )}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: '4px',
    cursor: 'pointer',
    [hoverActionsVars.display]: {
      default: 'none',
      ':hover': 'inline-flex',
    },
  },
  hoverActions: {
    display: hoverActionsVars.display,
    flexShrink: 0,
  },
});
