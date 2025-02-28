/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Filter} from './Filter';

export interface WhereProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  where: Malloy.Where[];
}

export function Where({source, query, path, where}: WhereProps) {
  return where.map((clause, key) => (
    <Filter source={source} query={query} path={path} filter={clause.filter} />
  ));
}
