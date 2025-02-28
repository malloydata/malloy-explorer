/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {GroupByOperations} from './operations/GroupByOperations';
import {WhereOperations} from './operations/WhereOperations';
import {LimitOperation} from './operations/LimitOperation';
import {AggregateOperations} from './operations/AggregateOperations';
import {OrderByOperations} from './operations/OrderByOperations';
import {NestOperations} from './operations/NestOperation';

export interface OperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  viewDef: Malloy.ViewDefinitionWithSegment;
}

export function Operations({source, query, path, viewDef}: OperationsProps) {
  const groupBys: Malloy.ViewOperationWithGroupBy[] = [];
  const aggregates: Malloy.ViewOperationWithAggregate[] = [];
  const wheres: Malloy.ViewOperationWithWhere[] = [];
  const orderBys: Malloy.ViewOperationWithOrderBy[] = [];
  const nests: Malloy.ViewOperationWithNest[] = [];
  let limit: Malloy.ViewOperationWithLimit | undefined;

  viewDef.operations.forEach(operation => {
    if (operation.kind === 'group_by') {
      groupBys.push(operation);
    } else if (operation.kind === 'aggregate') {
      aggregates.push(operation);
    } else if (operation.kind === 'where') {
      wheres.push(operation);
    } else if (operation.kind === 'order_by') {
      orderBys.push(operation);
    } else if (operation.kind === 'nest') {
      nests.push(operation);
    } else {
      limit = operation;
    }
  });

  return (
    <div>
      <GroupByOperations
        source={source}
        query={query}
        path={path}
        groupBys={groupBys}
      />
      <AggregateOperations
        source={source}
        query={query}
        path={path}
        aggregates={aggregates}
      />
      <WhereOperations
        source={source}
        query={query}
        path={path}
        wheres={wheres}
      />
      <OrderByOperations
        source={source}
        query={query}
        path={path}
        orderBys={orderBys}
      />
      <NestOperations source={source} query={query} path={path} nests={nests} />
      <LimitOperation source={source} query={query} path={path} limit={limit} />
    </div>
  );
}
