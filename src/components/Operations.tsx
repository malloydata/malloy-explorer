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
  ASTViewDefinition,
  ASTWhereViewOperation,
} from '@malloydata/malloy-query-builder';
import {GroupByOperations} from './operations/GroupByOperations';
import {WhereOperations} from './operations/WhereOperations';
import {LimitOperation} from './operations/LimitOperation';
import {AggregateOperations} from './operations/AggregateOperations';
import {OrderByOperations} from './operations/OrderByOperations';
import {NestOperations} from './operations/NestOperation';

export interface OperationsProps {
  rootQuery: ASTQuery;
  viewDef: ASTViewDefinition;
}

export function Operations({rootQuery, viewDef}: OperationsProps) {
  const groupBys: ASTGroupByViewOperation[] = [];
  const aggregates: ASTAggregateViewOperation[] = [];
  const wheres: ASTWhereViewOperation[] = [];
  const orderBys: ASTOrderByViewOperation[] = [];
  const nests: ASTNestViewOperation[] = [];
  let limit: ASTLimitViewOperation | undefined;

  const segment = viewDef.getOrAddDefaultSegment();

  segment.operations.items.forEach((operation, idx) => {
    if (operation instanceof ASTGroupByViewOperation) {
      groupBys.push(operation);
    } else if (operation instanceof ASTAggregateViewOperation) {
      aggregates.push(operation);
    } else if (operation instanceof ASTWhereViewOperation) {
      wheres.push(operation);
    } else if (operation instanceof ASTOrderByViewOperation) {
      orderBys.push(operation);
    } else if (operation instanceof ASTNestViewOperation) {
      nests.push(operation);
    } else {
      limit = operation;
    }
  });

  return (
    <div>
      <GroupByOperations
        rootQuery={rootQuery}
        segment={segment}
        groupBys={groupBys}
      />
      <AggregateOperations
        rootQuery={rootQuery}
        segment={segment}
        aggregates={aggregates}
      />
      <WhereOperations
        rootQuery={rootQuery}
        segment={segment}
        wheres={wheres}
      />
      <OrderByOperations
        rootQuery={rootQuery}
        segment={segment}
        orderBys={orderBys}
      />
      <NestOperations rootQuery={rootQuery} segment={segment} nests={nests} />
      <LimitOperation rootQuery={rootQuery} segment={segment} limit={limit} />
    </div>
  );
}
