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
import {ViewDefinition} from './ViewDefinition';
import {ViewMenu} from './ViewMenu';

export interface ViewProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  view: Malloy.View;
}

export function View({source, query, path, view}: ViewProps) {
  return (
    <div>
      <div {...stylex.props(styles.queryHeader)}>
        <div {...stylex.props(styles.title)}>Query:</div>
        <ViewMenu source={source} query={query} path={path} />
      </div>
      <ViewDefinition
        source={source}
        query={query}
        path={path}
        viewDef={view.definition}
      />
    </div>
  );
}
