/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Operations} from './Operations';
import {
  ASTArrowViewDefinition,
  ASTQuery,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {Label} from '../Label';
import {Icon} from '../primitives';
import {Visualization} from './Visualization';

export interface ViewProps {
  rootQuery: ASTQuery;
  viewDef: ASTViewDefinition;
}

export function ViewDefinition({rootQuery, viewDef}: ViewProps) {
  if (viewDef instanceof ASTArrowViewDefinition) {
    return <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.view} />;
  } else if (viewDef instanceof ASTRefinementViewDefinition) {
    return (
      <div>
        <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.base} />
        <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.refinement} />
      </div>
    );
  } else if (viewDef instanceof ASTSegmentViewDefinition) {
    return <Operations rootQuery={rootQuery} viewDef={viewDef} />;
  } else {
    const viewInfo = viewDef.getViewInfo();
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <Visualization annotations={viewInfo.annotations} />
        <div {...stylex.props(styles.labelWithIcon, styles.token)}>
          <Icon name="query" color="purple" />
          <Label>{viewDef.name}</Label>
        </div>
      </div>
    );
  }
}
