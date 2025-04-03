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
  const {fields} = segment.getInputSchema();

  return (
    <AddFieldItem
      label="Add aggregate"
      icon="aggregate"
      segment={segment}
      fields={fields}
      types={['measure']}
      removeDuplicates={true}
      onClick={(field, path) => {
        segment.addAggregate(field.name, path);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
