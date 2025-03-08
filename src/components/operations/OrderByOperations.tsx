/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTOrderByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import OrderByIcon from '../../assets/refinements/insert_order_by.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {RawReference} from '../RawReference';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import ClearIcon from '../../assets/refinements/clear.svg?react';

export interface OrderByOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  orderBys: ASTOrderByViewOperation[];
}

export function OrderByOperations({
  rootQuery,
  orderBys,
}: OrderByOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (orderBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.title)}>order by</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {orderBys.map((orderBy, key) => (
          <div key={key} {...stylex.props(styles.token)}>
            <RawReference
              rootQuery={rootQuery}
              reference={orderBy.fieldReference}
            />
            <div>
              {orderBy.direction === 'asc' ? ' ascending' : ''}
              {orderBy.direction === 'desc' ? ' descending' : ''}
            </div>
            <ClearIcon
              {...stylex.props(styles.icon)}
              onClick={() => {
                orderBy.delete();
                setQuery?.(rootQuery.build());
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
