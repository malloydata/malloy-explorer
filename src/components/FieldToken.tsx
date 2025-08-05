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

  /**
   * Optional sibling elements to render before the hover actions.
   */
  additionalSiblings?: React.ReactNode;
}

export default function FieldToken({
  field,
  additionalSiblings,
  hoverActions,
  hoverActionsVisible,
  ...props
}: FieldTokenProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  let label = field.name;
  if (
    field.kind === 'dimension' &&
    (field.type.kind === 'timestamp_type' || field.type.kind === 'date_type')
  ) {
    if (field.type.timeframe) {
      label += `.${field.type.timeframe}`;
    }
  }

  const showHover = (isHovered || hoverActionsVisible) && !!hoverActions;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...stylex.props(styles.main, showHover && styles.showHoverActions)}
    >
      <Token
        label={label}
        color={fieldKindToColor(field.kind)}
        icon={fieldToIcon(field)}
        {...props}
      />
      {additionalSiblings}
      {showHover && (
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
    gap: '4px',
  },
  hoverActions: {
    display: hoverActionsVars.display,
    flexShrink: 0,
  },
  showHoverActions: {
    [hoverActionsVars.display]: 'block',
  },
});
