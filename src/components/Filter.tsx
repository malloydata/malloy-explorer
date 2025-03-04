/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTFilter, ASTQuery} from '@malloydata/malloy-query-builder';
import {Reference} from './Reference';

export interface FilterProps {
  rootQuery: ASTQuery;
  filter: ASTFilter;
}

export function Filter({rootQuery, filter}: FilterProps) {
  return (
    <div>
      <Reference rootQuery={rootQuery} reference={filter.fieldReference} />{' '}
      {filter.filterString}
    </div>
  );
}
