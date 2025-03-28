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
import {segmentNestNo} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';

export interface AddViewProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddView({rootQuery, segment}: AddViewProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const fields = segment.getInputSchema().fields;

  const nestNo = segmentNestNo(segment);

  return (
    <AddFieldItem
      label="Add view"
      icon="view"
      fields={fields}
      types={['view']}
      onClick={field => {
        segment.addNest(field.name, `Nest ${nestNo}`);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
