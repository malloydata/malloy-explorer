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
  astQuery: ASTQuery;
  where: ASTWhereList;
}

export function Where({astQuery, where}: WhereProps) {
  return [...where.iter()].map((clause, key) => (
    <Filter key={key} astQuery={astQuery} filter={clause.filter} />
  ));
}
