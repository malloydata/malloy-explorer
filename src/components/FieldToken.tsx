/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Token} from './primitives';
import {hoverActionsVars} from './SourcePanel/field-token.stylex';
import {fieldKindToColor, fieldToIcon} from './utils/icon';

interface FieldTokenProps extends React.ComponentProps<typeof Token> {
  /**
   * The field information associated with the token.
   */
  field: FieldInfo;

  /**
   * Optional hover actions to render when the token is hovered.
   */
  hoverActions?: React.ReactNode;

  /**
   * The controlled visible state of the hover actions.
   */
  hoverActionsVisible?: boolean;
}

export default function FieldToken({
  field,
  hoverActions,
  hoverActionsVisible,
  ...props
}: FieldTokenProps) {
  return (
    <div
      {...stylex.props(
        styles.main,
        hoverActionsVisible && styles.showHoverActions
      )}
    >
      <div style={{display: 'inline-grid'}}>
        <Token
          label={field.name}
          color={fieldKindToColor(field.kind)}
          icon={fieldToIcon(field)}
          {...props}
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
      ':hover': 'block',
    },
  },
  hoverActions: {
    display: hoverActionsVars.display,
    flexShrink: 0,
  },
  showHoverActions: {
    [hoverActionsVars.display]: 'block',
  },
});
