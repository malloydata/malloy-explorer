/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {AddFieldItem} from './AddFieldItem';

export interface AddAggregateProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddAggregate({rootQuery, segment}: AddAggregateProps) {
  const {setQuery} = useContext(QueryEditorContext);

  const allFields = segment.getInputSchema().fields;
  const fields = allFields.filter(
    field => !segment.hasField(field.name /* TODO , path */)
  );

  return (
    <AddFieldItem
      label="Add aggregate"
      icon="aggregate"
      fields={fields}
      types={['measure']}
      onClick={(field, path) => {
        segment.addAggregate(field.name, path);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
