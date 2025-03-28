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
import {segmentHasLimit} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';

export interface AddGroupByProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddGroupBy({rootQuery, segment}: AddGroupByProps) {
  const {setQuery} = useContext(QueryEditorContext);

  const allFields = segment.getInputSchema().fields;
  const fields = allFields.filter(
    field => !segment.hasField(field.name /* TODO , field.path */)
  );

  return (
    <AddFieldItem
      label="Add group by"
      icon="groupBy"
      fields={fields}
      types={['dimension']}
      onClick={(field, path) => {
        segment.addGroupBy(field.name, path);
        if (!segmentHasLimit(segment)) {
          segment.setLimit(10);
        }
        segment.addOrderBy(field.name);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
