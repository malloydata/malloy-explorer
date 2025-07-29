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
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {SortableOperations} from './SortableOperations';
import {ViewParent} from '../../utils/fields';

export interface AggregateOperationsProps {
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  aggregates: (ASTAggregateViewOperation | ASTCalculateViewOperation)[];
}

export function AggregateOperations({
  segment,
  view,
  aggregates,
}: AggregateOperationsProps) {
  return (
    <SortableOperations
      segment={segment}
      view={view}
      operations={aggregates}
      kind="aggregate"
    />
  );
}
