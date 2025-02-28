/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import {Operations} from './Operations';

export interface ViewProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  view: Malloy.ViewDefinition;
}

export function View({source, query, path, view}: ViewProps) {
  return (
    <div>
      {view.kind === 'arrow' ? (
        <div>
          <View source={source} query={query} path={path} view={view.view} />
        </div>
      ) : view.kind === 'refinement' ? (
        <div>
          <View source={source} query={query} path={path} view={view.base} />
          <View
            source={source}
            query={query}
            path={path}
            view={view.refinement}
          />
        </div>
      ) : view.kind === 'segment' ? (
        <Operations source={source} query={query} path={path} view={view} />
      ) : (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          {view.name}
        </div>
      )}
    </div>
  );
}
