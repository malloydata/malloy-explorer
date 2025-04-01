/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles as commonStyles} from '../../styles';
import {
  ASTGroupByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {hoverStyles} from './hover.stylex';
import {Field} from './Field';
import {ClearButton} from './ClearButton';
import {addGroupBy} from '../../utils/segment';
import {OperationActionTitle} from './OperationActionTitle';

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
  const {setQuery} = useContext(QueryEditorContext);
  if (groupBys.length === 0) {
    return null;
  }

  const allFields = segment.getInputSchema().fields;
  const fields = allFields.filter(
    field => !segment.hasField(field.name /* TODO , field.path */)
  );

  return (
    <div>
      <OperationActionTitle
        title="group by"
        actionTitle="Add group by"
        rootQuery={rootQuery}
        segment={segment}
        fields={fields}
        types={['dimension']}
        onClick={(field: Malloy.FieldInfo, path: string[]) => {
          addGroupBy(rootQuery, segment, field, path, setQuery);
        }}
      />
      <div {...stylex.props(commonStyles.tokenContainer)}>
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
