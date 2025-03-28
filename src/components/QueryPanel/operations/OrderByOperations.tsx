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
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {atomicTypeToIcon, fieldKindToColor} from '../../utils/icon';
import {Token, TokenGroup, IconType, SelectorToken} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {ClearButton} from './ClearButton';

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
        {orderBys.map((orderBy, key) => {
          const fieldInfo = orderBy.fieldReference.getFieldInfo();
          let icon: IconType = 'orderBy';
          if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
            icon = atomicTypeToIcon(fieldInfo.type.kind);
          }
          const color = fieldKindToColor(fieldInfo.kind);
          return (
            <div key={key} {...stylex.props(hoverStyles.main)}>
              <TokenGroup>
                <Token color={color} icon={icon} label={fieldInfo.name} />
                <SelectorToken
                  color={color}
                  items={[
                    {label: 'ascending', value: 'asc'},
                    {label: 'descending', value: 'desc'},
                  ]}
                  value={orderBy.direction}
                  onChange={direction => {
                    orderBy.direction = direction;
                    setQuery?.(rootQuery.build());
                  }}
                />
              </TokenGroup>
              <div {...stylex.props(hoverStyles.hoverActions)}>
                <ClearButton
                  onClick={() => {
                    orderBy.delete();
                    setQuery?.(rootQuery.build());
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
