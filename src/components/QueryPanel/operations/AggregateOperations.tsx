/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {
  ASTAggregateViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {hoverStyles} from './hover.stylex';
import {Field} from './Field';
import {ClearButton} from './ClearButton';

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
          <div key={key} {...stylex.props(hoverStyles.main)}>
            <Field type="measure" key={key} field={aggregate.field} />
            <div {...stylex.props(hoverStyles.hoverActions)}>
              <ClearButton
                onClick={() => {
                  aggregate.delete();
                  setQuery?.(rootQuery.build());
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
