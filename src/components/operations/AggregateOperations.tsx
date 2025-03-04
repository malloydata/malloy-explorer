/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import AggregateIcon from '../../assets/refinements/insert_aggregate.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Field} from '../Field';
import {
  ASTAggregateViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';

export interface AggregateOperationsProps {
  astQuery: ASTQuery;
  aggregates: ASTAggregateViewOperation[];
}

export function AggregateOperations({
  astQuery,
  aggregates,
}: AggregateOperationsProps) {
  if (aggregates.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <AggregateIcon {...stylex.props(styles.icon)} />
        aggregate:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {aggregates.map((aggregate, key) => (
          <Field key={key} astQuery={astQuery} field={aggregate.field} />
        ))}
      </div>
    </div>
  );
}
