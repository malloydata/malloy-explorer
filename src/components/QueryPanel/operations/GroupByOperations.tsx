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
  ASTGroupByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {hoverStyles} from './hover.stylex';
import {Field} from './Field';
import {ClearButton} from './ClearButton';

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
          <div key={key} {...stylex.props(hoverStyles.main)}>
            <Field type="dimension" key={key} field={groupBy.field} />
            <div {...stylex.props(hoverStyles.hoverActions)}>
              <ClearButton
                onClick={() => {
                  groupBy.delete();
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
