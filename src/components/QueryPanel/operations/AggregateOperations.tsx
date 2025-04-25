/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTAggregateViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import {SortableOperations} from './SortableOperations';
import {ViewParent} from '../../utils/fields';

export interface AggregateOperationsProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  aggregates: ASTAggregateViewOperation[];
}

export function AggregateOperations({
  rootQuery,
  view,
  aggregates,
}: AggregateOperationsProps) {
  return (
    <SortableOperations
      rootQuery={rootQuery}
      view={view}
      operations={aggregates}
      kind="aggregate"
    />
  );
}
