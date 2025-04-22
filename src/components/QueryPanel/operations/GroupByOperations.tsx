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
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {ClearButton} from './ClearButton';
import {addGroupBy} from '../../utils/segment';
import {OperationActionTitle} from './OperationActionTitle';
import FieldToken from '../../FieldToken';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {FieldHoverCard} from '../../FieldHoverCard';

export interface GroupByOperationsProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  groupBys: ASTGroupByViewOperation[];
}

export function GroupByOperations({
  rootQuery,
  view,
  groupBys,
}: GroupByOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (groupBys.length === 0) {
    return null;
  }

  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <div>
      <OperationActionTitle
        title="group by"
        actionTitle="Add group by"
        rootQuery={rootQuery}
        view={view}
        fields={fields}
        types={['dimension']}
        onClick={(field: Malloy.FieldInfo, path: string[]) => {
          const segment = view.getOrAddDefaultSegment();
          addGroupBy(rootQuery, segment, field, path, setQuery);
        }}
      />
      <div {...stylex.props(commonStyles.tokenContainer)}>
        {groupBys.map(groupBy => {
          const fieldInfo = groupBy.getFieldInfo();
          const path = groupBy.field.getReference().path ?? [];
          return (
            <FieldToken
              key={[...path, fieldInfo.name].join('.')}
              field={fieldInfo}
              hoverActions={
                <>
                  <ClearButton
                    onClick={() => {
                      groupBy.delete();
                      setQuery?.(rootQuery.build());
                    }}
                  />
                </>
              }
              tooltip={<FieldHoverCard field={fieldInfo} path={path} />}
              tooltipProps={{
                side: 'right',
                align: 'start',
                alignOffset: 28,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
