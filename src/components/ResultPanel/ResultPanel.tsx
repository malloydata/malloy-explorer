/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {BookmarkedView} from './BookmarkedView';
import * as Malloy from '@malloydata/malloy-interfaces';

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
  const view = source.schema.fields
    .filter(f => f.kind === 'view')
    .at(0) as Malloy.FieldInfoWithView;

  return (
    <div>
      <BookmarkedView viewInfo={view} />
    </div>
  );
}
