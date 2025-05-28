/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTAggregateViewOperation,
  ASTGroupByViewOperation,
  ASTLimitViewOperation,
  ASTNestViewOperation,
  ASTOrderByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
  ASTWhereViewOperation,
  ASTHavingViewOperation,
  ASTDrillViewOperation,
} from '@malloydata/malloy-query-builder';
import {DrillOperations} from './operations/DrillOperations';
import {GroupByOperations} from './operations/GroupByOperations';
import {FilterOperations} from './operations/FilterOperations';
import {LimitOperation} from './operations/LimitOperation';
import {AggregateOperations} from './operations/AggregateOperations';
import {OrderByOperations} from './operations/OrderByOperations';
import {NestOperations} from './operations/NestOperation';
import stylex from '@stylexjs/stylex';
import {ViewParent} from '../utils/fields';

const operationStyles = stylex.create({
  indent: {
    marginLeft: 12,
    width: 'calc(100% - 12px)',
  },
});

export interface OperationsProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  viewDef: ASTViewDefinition;
}

export function Operations({rootQuery, view, viewDef}: OperationsProps) {
  const groupBys: ASTGroupByViewOperation[] = [];
  const aggregates: ASTAggregateViewOperation[] = [];
  const drills: ASTDrillViewOperation[] = [];
  const filters: Array<ASTWhereViewOperation | ASTHavingViewOperation> = [];
  const orderBys: ASTOrderByViewOperation[] = [];
  const nests: ASTNestViewOperation[] = [];
  let limit: ASTLimitViewOperation | undefined;

  if (!(viewDef instanceof ASTSegmentViewDefinition)) {
    return null;
  }

  const segment = viewDef;

  segment.operations.items.forEach(operation => {
    if (operation instanceof ASTGroupByViewOperation) {
      groupBys.push(operation);
    } else if (operation instanceof ASTAggregateViewOperation) {
      aggregates.push(operation);
    } else if (operation instanceof ASTWhereViewOperation) {
      filters.push(operation);
    } else if (operation instanceof ASTHavingViewOperation) {
      filters.push(operation);
    } else if (operation instanceof ASTOrderByViewOperation) {
      orderBys.push(operation);
    } else if (operation instanceof ASTNestViewOperation) {
      nests.push(operation);
    } else if (operation instanceof ASTDrillViewOperation) {
      drills.push(operation);
    } else {
      limit = operation;
    }
  });

  return (
    <div {...stylex.props(operationStyles.indent)}>
      <GroupByOperations
        rootQuery={rootQuery}
        segment={segment}
        view={view}
        groupBys={groupBys}
      />
      <AggregateOperations
        rootQuery={rootQuery}
        segment={segment}
        view={view}
        aggregates={aggregates}
      />
      <DrillOperations rootQuery={rootQuery} drills={drills} />
      <FilterOperations rootQuery={rootQuery} filters={filters} />
      <OrderByOperations rootQuery={rootQuery} orderBys={orderBys} />
      <NestOperations rootQuery={rootQuery} view={view} nests={nests} />
      <LimitOperation rootQuery={rootQuery} limit={limit} />
    </div>
  );
}
