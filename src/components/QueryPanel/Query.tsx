/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {ViewMenu} from './ViewMenu';
import {ViewDefinition} from './ViewDefinition';
import {Visualization} from './Visualization';
import CollapsiblePanel from '../primitives/CollapsiblePanel';

export interface QueryProps {
  rootQuery: ASTQuery;
  query: ASTQuery;
}

export function Query({rootQuery, query}: QueryProps) {
  return (
    <CollapsiblePanel title="Main query">
      {query.definition instanceof ASTArrowQueryDefinition ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {!query.isEmpty() && (
            <Visualization rootQuery={rootQuery} view={query} />
          )}
          <ViewDefinition
            rootQuery={rootQuery}
            viewDef={query.definition.view}
          />
        </div>
      ) : null}
      {query.isEmpty() ? (
        <div {...stylex.props(queryStyles.emptyQuery)}>
          <ViewMenu rootQuery={rootQuery} view={query} />
        </div>
      ) : (
        <div {...stylex.props(styles.queryFooter)}>
          <ViewMenu rootQuery={rootQuery} view={query} />
        </div>
      )}
    </CollapsiblePanel>
  );
}

const queryStyles = stylex.create({
  emptyQuery: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: 60,
  },
});
