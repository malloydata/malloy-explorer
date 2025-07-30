/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ASTQuery} from '@malloydata/malloy-query-builder';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useMemo} from 'react';

export function useQueryBuilder(
  source?: Malloy.SourceInfo,
  query?: Malloy.Query
) {
  return useMemo(() => {
    if (source) {
      return new ASTQuery({query, source});
    } else {
      return undefined;
    }
  }, [source, query]);
}
