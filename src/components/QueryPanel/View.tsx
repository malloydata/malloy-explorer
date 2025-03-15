/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {ViewDefinition} from './ViewDefinition';
import {ViewMenu} from './ViewMenu';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
export interface ViewProps {
  rootQuery: ASTQuery;
  view: ASTView;
}

export function View({rootQuery, view}: ViewProps) {
  return (
    <div>
      <ViewDefinition rootQuery={rootQuery} viewDef={view.definition} />
      <div {...stylex.props(styles.queryFooter)}>
        <ViewMenu rootQuery={rootQuery} view={view} />
      </div>
    </div>
  );
}
