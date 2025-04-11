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
} from '@malloydata/malloy-query-builder';
import {GroupByOperations} from './operations/GroupByOperations';
import {WhereOperations} from './operations/WhereOperations';
import {LimitOperation} from './operations/LimitOperation';
import {AggregateOperations} from './operations/AggregateOperations';
import {OrderByOperations} from './operations/OrderByOperations';
import {NestOperations} from './operations/NestOperation';
import stylex from '@stylexjs/stylex';

const operationStyles = stylex.create({
  indent: {
    marginLeft: 12,
    width: 'calc(100% - 12px)',
  },
});

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

  if (!(viewDef instanceof ASTSegmentViewDefinition)) {
    return null;
  }

  const segment = viewDef;
  const view = viewDef.parent.as.View();

  segment.operations.items.forEach(operation => {
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
    <div {...stylex.props(operationStyles.indent)}>
      <GroupByOperations
        rootQuery={rootQuery}
        view={view}
        groupBys={groupBys}
      />
      <AggregateOperations
        rootQuery={rootQuery}
        view={view}
        aggregates={aggregates}
      />
      <WhereOperations rootQuery={rootQuery} wheres={wheres} />
      <OrderByOperations rootQuery={rootQuery} orderBys={orderBys} />
      <NestOperations rootQuery={rootQuery} nests={nests} />
      <LimitOperation rootQuery={rootQuery} limit={limit} />
    </div>
  );
}
