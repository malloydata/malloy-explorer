/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';

export interface RawPreviewProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
}

export function RawPreview({query}: RawPreviewProps) {
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
}
