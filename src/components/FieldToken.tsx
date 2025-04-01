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
import {atomicTypeToIcon, fieldKindToColor} from './utils/icon';
import {Menu, MenuItem} from './Menu';

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

  /**
   * The controlled visible state of the hover actions.
   */
  hoverActionsVisible?: boolean;
  hasMenu?: boolean;
  menuItems?: MenuItem[];
  isCompact?: boolean;
}

export default function FieldToken({
  field,
  onClick,
  onHover,
  hoverActions,
  hoverActionsVisible,
  hasMenu,
  menuItems,
  isCompact,
}: FieldTokenProps) {
  if (field.kind === 'join') {
    return null;
  }

  const token = (
    <Token
      label={field.name}
      color={fieldKindToColor(field.kind)}
      icon={
        field.kind === 'dimension' || field.kind === 'measure'
          ? atomicTypeToIcon(field.type.kind)
          : 'view'
      }
      {...(onClick && {onClick})}
      {...(onHover && {onHover})}
      {...(isCompact && {
        customStyle: styles.compactToken,
      })}
    />
  );

  return (
    <div
      {...stylex.props(
        styles.main,
        hoverActionsVisible && styles.showHoverActions
      )}
    >
      <div style={{display: 'inline-grid'}}>
        {hasMenu && menuItems ? (
          <Menu trigger={token} items={menuItems} />
        ) : (
          token
        )}
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
    [hoverActionsVars.visibility]: {
      default: 'hidden',
      ':hover': 'visible',
    },
  },
  hoverActions: {
    visibility: hoverActionsVars.visibility,
    flexShrink: 0,
  },
  showHoverActions: {
    [hoverActionsVars.visibility]: 'visible',
  },
  compactToken: {
    padding: '2px 4px',
  },
});
