/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Field} from '../Field';
import {
  ASTAggregateViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

export interface AggregateOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  aggregates: ASTAggregateViewOperation[];
}

export function AggregateOperations({
  rootQuery,
  aggregates,
}: AggregateOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (aggregates.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.title)}>aggregate</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {aggregates.map((aggregate, key) => (
          <Field
            key={key}
            rootQuery={rootQuery}
            field={aggregate.field}
            onDelete={() => {
              aggregate.delete();
              setQuery?.(rootQuery.build());
            }}
          />
        ))}
      </div>
    </div>
  );
}
