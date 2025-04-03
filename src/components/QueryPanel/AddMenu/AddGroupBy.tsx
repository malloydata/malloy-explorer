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
import {addGroupBy} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';

export interface AddGroupByProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddGroupBy({rootQuery, segment}: AddGroupByProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const {fields} = segment.getInputSchema();

  return (
    <AddFieldItem
      label="Add group by"
      icon="groupBy"
      segment={segment}
      fields={fields}
      types={['dimension']}
      removeDuplicates={true}
      onClick={(field, path) => {
        addGroupBy(rootQuery, segment, field, path, setQuery);
      }}
    />
  );
}
