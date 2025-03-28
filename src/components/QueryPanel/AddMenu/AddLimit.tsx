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
import Icon from '../../primitives/Icon';
import {AddItem} from './AddItem';

export interface AddLimitProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddLimit({rootQuery, segment}: AddLimitProps) {
  const {setQuery} = useContext(QueryEditorContext);

  const hasLimit =
    segment.operations.items.find(operation => operation.kind === 'limit') !==
    undefined;

  return (
    <AddItem
      icon={<Icon name="limit" />}
      label="Limit"
      disable={() => hasLimit}
      onClick={() => {
        segment.setLimit(10);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
