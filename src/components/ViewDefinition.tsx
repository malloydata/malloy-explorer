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
import {View} from './View';
import {
  ASTArrowViewDefinition,
  ASTQuery,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';

export interface ViewProps {
  astQuery: ASTQuery;
  viewDef: ASTViewDefinition;
}

export function ViewDefinition({astQuery, viewDef}: ViewProps) {
  return (
    <div>
      {viewDef instanceof ASTArrowViewDefinition ? (
        <div>
          <ViewDefinition astQuery={astQuery} viewDef={viewDef.view} />
        </div>
      ) : viewDef instanceof ASTRefinementViewDefinition ? (
        <div>
          <ViewDefinition astQuery={astQuery} viewDef={viewDef.base} />
          <ViewDefinition astQuery={astQuery} viewDef={viewDef.refinement} />
        </div>
      ) : viewDef instanceof ASTSegmentViewDefinition ? (
        <Operations astQuery={astQuery} viewDef={viewDef} />
      ) : (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          {viewDef.name}
        </div>
      )}
    </div>
  );
}
