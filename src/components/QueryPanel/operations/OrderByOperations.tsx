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
import {IconType} from '../../primitives/icons';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {Token} from '../../primitives';
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
          let label = fieldInfo.name;
          if (orderBy.direction === 'asc') {
            label += ' ascending';
          } else {
            label += ' descending';
          }
          let icon: IconType = 'order_by';
          if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
            icon = atomicTypeToIcon(fieldInfo.type.kind);
          }
          const color = fieldKindToColor(fieldInfo.kind);
          return (
            <div key={key} {...stylex.props(styles.labelWithIcon)}>
              <Token
                icon={icon}
                color={color}
                label={label}
                onClick={() => {}}
              />
              <ClearButton
                onClick={() => {
                  orderBy.delete();
                  setQuery?.(rootQuery.build());
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
