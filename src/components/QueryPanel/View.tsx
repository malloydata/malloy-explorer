/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ViewDefinition} from './ViewDefinition';
import {ASTView} from '@malloydata/malloy-query-builder';
import {Visualization} from './Visualization';

export interface ViewProps {
  view: ASTView;
}

export function View({view}: ViewProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <Visualization view={view} />
      <ViewDefinition view={view} viewDef={view.definition} />
    </div>
  );
}
