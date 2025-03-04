/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Filter} from './Filter';
import {
  ASTQuery,
  ASTWhere,
  ASTWhereList,
} from '@malloydata/malloy-query-builder';

export interface WhereProps {
  rootQuery: ASTQuery;
  where: ASTWhereList;
}

export function Where({rootQuery, where}: WhereProps) {
  return [...where.iter()].map((clause, key) => (
    <Filter key={key} rootQuery={rootQuery} filter={clause.filter} />
  ));
}
