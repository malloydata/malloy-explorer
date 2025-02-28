/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import WhereIcon from '../../assets/refinements/insert_filter.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';

export interface WhereOperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  wheres: Malloy.ViewOperationWithWhere[];
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
            {where.filter.field_reference.name} {where.filter.filter}
          </div>
        ))}
      </div>
    </div>
  );
}
