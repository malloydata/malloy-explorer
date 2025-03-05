/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import GroupByIcon from '../../assets/refinements/insert_group_by.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Field} from '../Field';
import {
  ASTGroupByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryContext} from '../../contexts/QueryContext';

export interface GroupByOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  groupBys: ASTGroupByViewOperation[];
}

export function GroupByOperations({
  rootQuery,
  segment,
  groupBys,
}: GroupByOperationsProps) {
  const {setQuery} = React.useContext(QueryContext);
  if (groupBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <GroupByIcon {...stylex.props(styles.icon)} />
        <div {...stylex.props(styles.title)}>group_by:</div>
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {groupBys.map(({field}, key) => (
          <Field
            key={key}
            rootQuery={rootQuery}
            field={field}
            onDelete={() => {
              segment.removeGroupBy(field.name);
              setQuery?.(rootQuery.build());
            }}
          />
        ))}
      </div>
    </div>
  );
}
