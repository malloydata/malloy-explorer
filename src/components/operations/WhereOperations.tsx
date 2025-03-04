/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTQuery,
  ASTWhereViewOperation,
} from '@malloydata/malloy-query-builder';
import WhereIcon from '../../assets/refinements/insert_filter.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';

export interface WhereOperationsProps {
  rootQuery: ASTQuery;
  wheres: ASTWhereViewOperation[];
}

export function WhereOperations({wheres}: WhereOperationsProps) {
  if (wheres.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <WhereIcon {...stylex.props(styles.icon)} />
        where:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {wheres.map((where, key) => (
          <div key={key} {...stylex.props(styles.token)}>
            {where.filter.fieldReference.name} {where.filter.filterString}
          </div>
        ))}
      </div>
    </div>
  );
}
