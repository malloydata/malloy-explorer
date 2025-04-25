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
import {styles} from '../../styles';
import {
  ASTAggregateViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {ClearButton} from './ClearButton';
import {OperationActionTitle} from './OperationActionTitle';
import FieldToken from '../../FieldToken';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {FieldHoverCard} from '../../FieldHoverCard';

export interface AggregateOperationsProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  aggregates: ASTAggregateViewOperation[];
}

export function AggregateOperations({
  rootQuery,
  view,
  aggregates,
}: AggregateOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (aggregates.length === 0) {
    return null;
  }

  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <div>
      <OperationActionTitle
        title="aggregate"
        actionTitle="Add aggregate"
        rootQuery={rootQuery}
        view={view}
        fields={fields}
        types={['measure']}
        onClick={(field: Malloy.FieldInfo, path: string[]) => {
          const segment = view.getOrAddDefaultSegment();
          segment.addAggregate(field.name, path);
          setQuery?.(rootQuery.build());
        }}
      />{' '}
      <div {...stylex.props(styles.tokenContainer)}>
        {aggregates.map(aggregate => {
          const fieldInfo = aggregate.getFieldInfo();
          const path = aggregate.field.getReference().path ?? [];
          return (
            <FieldToken
              key={[...path, fieldInfo.name].join('.')}
              field={fieldInfo}
              color="green"
              hoverActions={
                <>
                  <ClearButton
                    onClick={() => {
                      aggregate.delete();
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
