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
  ASTGroupByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

export interface GroupByOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  groupBys: ASTGroupByViewOperation[];
}

export function GroupByOperations({
  rootQuery,
  groupBys,
}: GroupByOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (groupBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.title)}>group by</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {groupBys.map((groupBy, key) => (
          <Field
            key={key}
            rootQuery={rootQuery}
            field={groupBy.field}
            onDelete={() => {
              groupBy.delete();
              setQuery?.(rootQuery.build());
            }}
          />
        ))}
      </div>
    </div>
  );
}
