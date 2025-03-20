/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import EmptyQueryDisplay from './EmptyQueryDisplay';

export interface ResultPanelProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  setQuery?: (query: Malloy.Query) => void;
}

export default function ResultPanel({
  source,
  query: _q,
  setQuery: _sq,
}: ResultPanelProps) {
  const views = source.schema.fields.filter(f => f.kind === 'view');

  return <EmptyQueryDisplay views={views} />;
}
