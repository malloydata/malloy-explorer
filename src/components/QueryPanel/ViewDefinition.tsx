/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {Operations} from './Operations';
import {
  ASTArrowViewDefinition,
  ASTReferenceViewDefinition,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {Button, Icon} from '../primitives';
import ViewAttributeTable from '../ResultPanel/ViewAttributeTable';
import {useState} from 'react';
import {textColors} from '../primitives/colors.stylex';
import {ViewParent} from '../utils/fields';

export interface ViewProps {
  view: ViewParent;
  viewDef: ASTViewDefinition;
}

export function ViewDefinition({view, viewDef}: ViewProps) {
  if (viewDef instanceof ASTArrowViewDefinition) {
    return <ViewDefinition view={view} viewDef={viewDef.view} />;
  } else if (viewDef instanceof ASTRefinementViewDefinition) {
    return (
      <div>
        <ViewDefinition view={view} viewDef={viewDef.base} />
        <ViewDefinition view={view} viewDef={viewDef.refinement} />
      </div>
    );
  } else if (viewDef instanceof ASTSegmentViewDefinition) {
    return <Operations view={view} viewDef={viewDef} />;
  } else {
    return <CollapsingView viewDef={viewDef} />;
  }
}

interface CollapsingViewProps {
  viewDef: ASTReferenceViewDefinition;
}

function CollapsingView({viewDef}: CollapsingViewProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      {...stylex.props(styles.view, collapsed ? styles.viewCollapsed : null)}
    >
      <div {...stylex.props(styles.header)}>
        <Icon name="query" color="purple" />
        <div {...stylex.props(styles.headerTitle)}>{viewDef.name}</div>
        <Button
          icon={collapsed ? 'chevronRight' : 'chevronDown'}
          onClick={() => setCollapsed(!collapsed)}
          size="compact"
        />
      </div>
      {!collapsed && (
        <ViewAttributeTable
          viewInfo={viewDef.getViewInfo()}
          style={styles.preview}
        />
      )}
    </div>
  );
}

const styles = stylex.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: '4px',
    background: 'rgba(230, 235, 239, 1)',
    height: 'auto',
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  viewCollapsed: {
    paddingBottom: 0,
  },
  chevron: {
    padding: 4,
  },
  header: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr auto',
    color: textColors.purple,
    alignItems: 'center',
    justifyContent: 'start',
    gap: 8,
    borderRadius: '4px',
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(230, 235, 239, 1)',
    width: '100%',
  },
  headerTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  preview: {
    height: 'auto',
    maxHeight: 200,
    background: '#fff',
    borderRadius: 4,
  },
});
