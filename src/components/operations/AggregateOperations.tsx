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

export interface AggregateOperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  aggregates: Malloy.ViewOperationWithAggregate[];
}

export function AggregateOperations({
  source,
  query,
  path,
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
          <Field
            key={key}
            source={source}
            query={query}
            path={path}
            field={aggregate.field}
          />
        ))}
      </div>
    </div>
  );
}
