/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
  ASTWhereViewOperation,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Token} from '../../primitives';
import {IconType} from '../../primitives/icons';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {ClearButton} from './ClearButton';

export interface WhereOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  wheres: ASTWhereViewOperation[];
}

export function WhereOperations({rootQuery, wheres}: WhereOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (wheres.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.title)}>filter by</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {wheres.map((where, key) => {
          const {fieldReference, filterString} = where.filter;
          let icon: IconType = 'filter';
          const fieldInfo = fieldReference.getFieldInfo();
          if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
            icon = atomicTypeToIcon(fieldInfo.type.kind);
          }
          const color = fieldKindToColor(fieldInfo.kind);

          return (
            <div key={key} {...stylex.props(styles.labelWithIcon)}>
              <Token
                color={color}
                icon={icon}
                label={`${fieldInfo.name} ${filterString}`}
                onClick={() => {}}
              />
              <ClearButton
                onClick={() => {
                  where.delete();
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
