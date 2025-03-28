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
import {segmentNestNo} from '../../utils/segment';

export interface AddEmptyNestProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddEmptyNest({rootQuery, segment}: AddEmptyNestProps) {
  const {setQuery} = useContext(QueryEditorContext);

  const nestNo = segmentNestNo(segment);

  return (
    <AddItem
      icon={<Icon name="nest" />}
      label="Add blank nested query"
      onClick={() => {
        segment.addEmptyNest(`Nest ${nestNo}`);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
