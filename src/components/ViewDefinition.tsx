/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import {Operations} from './Operations';
import {
  ASTArrowViewDefinition,
  ASTQuery,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {Label} from './Label';

export interface ViewProps {
  rootQuery: ASTQuery;
  viewDef: ASTViewDefinition;
}

export function ViewDefinition({rootQuery, viewDef}: ViewProps) {
  return (
    <div>
      {viewDef instanceof ASTArrowViewDefinition ? (
        <div>
          <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.view} />
        </div>
      ) : viewDef instanceof ASTRefinementViewDefinition ? (
        <div>
          <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.base} />
          <ViewDefinition rootQuery={rootQuery} viewDef={viewDef.refinement} />
        </div>
      ) : viewDef instanceof ASTSegmentViewDefinition ? (
        <Operations rootQuery={rootQuery} viewDef={viewDef} />
      ) : (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          <Label>{viewDef.name}</Label>
        </div>
      )}
    </div>
  );
}
