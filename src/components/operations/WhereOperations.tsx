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
import {styles} from '../styles';
import {Label} from '../Label';
import {RawReference} from '../RawReference';
import ClearIcon from '../../assets/refinements/clear.svg?react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

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
        {wheres.map((where, key) => (
          <div key={key} {...stylex.props(styles.token)}>
            <RawReference
              rootQuery={rootQuery}
              reference={where.filter.fieldReference}
            />
            <Label>{where.filter.filterString}</Label>
            <ClearIcon
              {...stylex.props(styles.icon)}
              onClick={() => {
                where.delete();
                setQuery?.(rootQuery.build());
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
