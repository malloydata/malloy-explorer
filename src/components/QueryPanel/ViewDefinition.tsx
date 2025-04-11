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
  ASTQuery,
  ASTReferenceViewDefinition,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {Button, Icon, IconType} from '../primitives';
import ViewAttributeTable from '../ResultPanel/ViewAttributeTable';
import {JSX, useState} from 'react';
import {textColors} from '../primitives/colors.stylex';
import {ViewParent} from '../utils/fields';

export interface ViewProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  viewDef: ASTViewDefinition;
}

export function ViewDefinition({rootQuery, view, viewDef}: ViewProps) {
  if (viewDef instanceof ASTArrowViewDefinition) {
    return (
      <ViewDefinition
        rootQuery={rootQuery}
        view={view}
        viewDef={viewDef.view}
      />
    );
  } else if (viewDef instanceof ASTRefinementViewDefinition) {
    return (
      <div>
        <ViewDefinition
          rootQuery={rootQuery}
          view={view}
          viewDef={viewDef.base}
        />
        <ViewDefinition
          rootQuery={rootQuery}
          view={view}
          viewDef={viewDef.refinement}
        />
      </div>
    );
  } else if (viewDef instanceof ASTSegmentViewDefinition) {
    return <Operations rootQuery={rootQuery} view={view} viewDef={viewDef} />;
  } else {
    return <CollapsingView rootQuery={rootQuery} viewDef={viewDef} />;
  }
}

interface CollapsingViewProps {
  rootQuery: ASTQuery;
  viewDef: ASTReferenceViewDefinition;
}

function CollapsingView({viewDef}: CollapsingViewProps) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      {...stylex.props(styles.view, collapsed ? styles.viewCollapsed : null)}
    >
      <Header
        icon="query"
        title={viewDef.name}
        rightControls={
          <Button
            icon={collapsed ? 'chevronRight' : 'chevronDown'}
            onClick={() => setCollapsed(!collapsed)}
            size="compact"
          />
        }
      />
      {!collapsed && (
        <ViewAttributeTable
          viewInfo={viewDef.getViewInfo()}
          style={styles.preview}
        />
      )}
    </div>
  );
}

interface HeaderProps {
  icon: IconType;
  title: string;
  hoverControls?: JSX.Element;
  rightControls?: JSX.Element;
}

function Header({icon, title, hoverControls, rightControls}: HeaderProps) {
  return (
    <div {...stylex.props(styles.header)}>
      <Icon name={icon} color="purple" />
      <div>{title}</div>
      <div {...stylex.props(styles.spacer)} />
      <div>{hoverControls}</div>
      <div>{rightControls}</div>
    </div>
  );
}

const styles = stylex.create({
  view: {
    display: 'flex',
    borderRadius: '4px',
    background: 'rgba(230, 235, 239, 1)',
    height: 'auto',
    flexDirection: 'column',
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
    display: 'inline-flex',
    color: textColors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    paddingTop: 4,
    paddingBottom: 4,
    gap: 8,
    borderRadius: '4px',
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(230, 235, 239, 1)',
    width: '100%',
  },
  spacer: {
    flexGrow: 1,
  },
  preview: {
    height: 'auto',
    maxHeight: 200,
    background: '#fff',
    borderRadius: 4,
  },
});
