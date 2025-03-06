/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useQueryBuilder} from '../hooks/useQueryBuilder';

export interface MalloyPreviewProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
}

export function MalloyPreview({source, query}: MalloyPreviewProps) {
  const rootQuery = useQueryBuilder(source, query);
  if (!rootQuery) {
    return null;
  }
  return <pre>{rootQuery.toMalloy()}</pre>;
}
