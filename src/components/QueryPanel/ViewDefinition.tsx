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
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {Token} from '../primitives';

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
    return (
      <Token
        icon="query"
        color="purple"
        label={viewDef.name}
        style={styles.token}
      />
    );
  }
}

const styles = stylex.create({
  token: {
    flexGrow: 1,
    justifyContent: 'start',
  },
});
