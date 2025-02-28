/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import OrderByIcon from '../../assets/refinements/insert_order_by.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {RawReference} from '../RawReference';

export interface OrderByOperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  orderBys: Malloy.ViewOperationWithOrderBy[];
}

export function OrderByOperations({
  source,
  query,
  path,
  orderBys,
}: OrderByOperationsProps) {
  if (orderBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <OrderByIcon {...stylex.props(styles.icon)} />
        orderBy:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {orderBys.map((orderBy, key) => (
          <div key={key} {...stylex.props(styles.token)}>
            <RawReference
              source={source}
              query={query}
              path={path}
              reference={orderBy.field_reference}
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
