/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Reference} from './Reference';

export interface FilterProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  filter: Malloy.Filter;
}

export function Filter({source, query, path, filter}: FilterProps) {
  return (
    <div>
      <Reference
        source={source}
        query={query}
        path={path}
        reference={filter.field_reference}
      />{' '}
      {filter.filter}
    </div>
  );
}
