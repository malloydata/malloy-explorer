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

export interface GroupByOperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  groupBys: Malloy.ViewOperationWithGroupBy[];
}

export function GroupByOperations({
  source,
  query,
  path,
  groupBys,
}: GroupByOperationsProps) {
  if (groupBys.length === 0) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <GroupByIcon {...stylex.props(styles.icon)} />
        group_by:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {groupBys.map((groupBy, key) => (
          <Field
            key={key}
            source={source}
            query={query}
            path={path}
            field={groupBy.field}
          />
        ))}
      </div>
    </div>
  );
}
