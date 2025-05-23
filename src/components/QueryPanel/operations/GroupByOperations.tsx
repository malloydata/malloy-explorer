/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTGroupByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {SortableOperations} from './SortableOperations';
import {ViewParent} from '../../utils/fields';

export interface GroupByOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  groupBys: ASTGroupByViewOperation[];
}

export function GroupByOperations({
  rootQuery,
  segment,
  view,
  groupBys,
}: GroupByOperationsProps) {
  return (
    <SortableOperations
      rootQuery={rootQuery}
      segment={segment}
      view={view}
      operations={groupBys}
      kind="group_by"
    />
  );
}
