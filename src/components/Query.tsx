/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import {View} from './View';
import {Visualization} from './Visualization';
import {ViewMenu} from './ViewMenu';
import {ViewDefinition} from './ViewDefinition';

export interface QueryProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
}

export function Query({source, query, path}: QueryProps) {
  return (
    <div {...stylex.props(styles.heading)}>
      <div {...stylex.props(styles.queryHeader)}>
        <div {...stylex.props(styles.title)}>Query:</div>
        <ViewMenu source={source} query={query} path={path} />
      </div>
      <Visualization annotations={query.annotations} />
      {query.definition.kind === 'arrow' ? (
        <ViewDefinition
          source={source}
          query={query}
          path={path}
          viewDef={query.definition.view}
        />
      ) : query.definition.kind === 'query_reference' ? (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          {query.definition.name}
        </div>
      ) : (
        <div>
          <ViewDefinition
            source={source}
            query={query}
            path={path}
            viewDef={query.definition.refinement}
          />
        </div>
      )}
    </div>
  );
}
