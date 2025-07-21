/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTCalculateViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {SortableOperations} from './SortableOperations';
import {ViewParent} from '../../utils/fields';

export interface CalculateOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  calculates: ASTCalculateViewOperation[];
}

export function CalculateOperations({
  rootQuery,
  segment,
  view,
  calculates,
}: CalculateOperationsProps) {
  return (
    <SortableOperations
      rootQuery={rootQuery}
      segment={segment}
      view={view}
      operations={calculates}
      kind="aggregate"
    />
  );
}
