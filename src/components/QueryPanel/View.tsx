/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ViewDefinition} from './ViewDefinition';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Visualization} from './Visualization';

export interface ViewProps {
  rootQuery: ASTQuery;
  view: ASTView;
}

export function View({rootQuery, view}: ViewProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <Visualization rootQuery={rootQuery} view={view} />
      <ViewDefinition
        rootQuery={rootQuery}
        view={view}
        viewDef={view.definition}
      />
    </div>
  );
}
