/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {Visualization} from './Visualization';
import {ViewMenu} from './ViewMenu';
import {ViewDefinition} from './ViewDefinition';

export interface QueryProps {
  rootQuery: ASTQuery;
  query: ASTQuery;
}

export function Query({rootQuery, query}: QueryProps) {
  // TODO AST the rest of this stuff

  console.log({query});

  return (
    <div {...stylex.props(styles.heading)}>
      <div {...stylex.props(styles.queryHeader)}>
        <div {...stylex.props(styles.title)}>Query:</div>
        <ViewMenu rootQuery={rootQuery} view={query} />
      </div>
      <Visualization annotations={query.annotations} />
      {query.definition instanceof ASTArrowQueryDefinition ? (
        <div>
          <ViewDefinition
            rootQuery={rootQuery}
            viewDef={query.definition.view}
          />
        </div>
      ) : null}
    </div>
  );
}
