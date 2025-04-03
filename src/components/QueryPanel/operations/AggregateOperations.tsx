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
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {hoverStyles} from './hover.stylex';
import {Field} from '../Field';
import {ClearButton} from './ClearButton';
import {OperationActionTitle} from './OperationActionTitle';
import {FieldHover} from '../FieldHover';

export interface AggregateOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  aggregates: ASTAggregateViewOperation[];
}

export function AggregateOperations({
  rootQuery,
  segment,
  aggregates,
}: AggregateOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (aggregates.length === 0) {
    return null;
  }

  const {fields} = segment.getInputSchema();

  return (
    <div>
      <OperationActionTitle
        title="aggregate"
        actionTitle="Add aggregate"
        rootQuery={rootQuery}
        segment={segment}
        fields={fields}
        types={['measure']}
        onClick={(field: Malloy.FieldInfo, path: string[]) => {
          segment.addAggregate(field.name, path);
          setQuery?.(rootQuery.build());
        }}
      />{' '}
      <div {...stylex.props(styles.tokenContainer)}>
        {aggregates.map(aggregate => {
          const fieldInfo = aggregate.getFieldInfo();
          const path = aggregate.field.getReference().path ?? [];
          return (
            <FieldHover
              key={[...path, fieldInfo.name].join('.')}
              field={fieldInfo}
              path={path}
              side="right"
              align="start"
            >
              <div {...stylex.props(hoverStyles.main)}>
                <Field field={fieldInfo} path={path} />
                <div {...stylex.props(hoverStyles.hoverActions)}>
                  <ClearButton
                    onClick={() => {
                      aggregate.delete();
                      setQuery?.(rootQuery.build());
                    }}
                  />
                </div>
              </div>
            </FieldHover>
          );
        })}
      </div>
    </div>
  );
}
