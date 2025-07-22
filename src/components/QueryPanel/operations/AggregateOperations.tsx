/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTAggregateViewOperation,
  ASTCalculateViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {SortableOperations} from './SortableOperations';
import {ViewParent} from '../../utils/fields';

export interface AggregateOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  aggregates: (ASTAggregateViewOperation | ASTCalculateViewOperation)[];
}

export function AggregateOperations({
  rootQuery,
  segment,
  view,
  aggregates,
}: AggregateOperationsProps) {
  return (
    <SortableOperations
      rootQuery={rootQuery}
      segment={segment}
      view={view}
      operations={aggregates}
      kind="aggregate"
    />
  );
}
