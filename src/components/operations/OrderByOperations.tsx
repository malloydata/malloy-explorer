/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTOrderByViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import OrderByIcon from '../../assets/refinements/insert_order_by.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {RawReference} from '../RawReference';

export interface OrderByOperationsProps {
  astQuery: ASTQuery;
  orderBys: ASTOrderByViewOperation[];
}

export function OrderByOperations({
  astQuery,
  orderBys,
}: OrderByOperationsProps) {
  if (orderBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <OrderByIcon {...stylex.props(styles.icon)} />
        <div {...stylex.props(styles.title)}>order_by:</div>
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {orderBys.map((orderBy, key) => (
          <div key={key} {...stylex.props(styles.token)}>
            <RawReference
              astQuery={astQuery}
              reference={orderBy.fieldReference}
            />
            <div>
              {orderBy.direction === 'asc' ? ' ascending' : ''}
              {orderBy.direction === 'desc' ? ' descending' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
