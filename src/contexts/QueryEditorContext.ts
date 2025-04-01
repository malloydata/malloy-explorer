/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery} from '@malloydata/malloy-query-builder';

export interface QueryEditorContextProps {
  /** Source object at the root level */
  source?: Malloy.SourceInfo;
  /** Query object to represent current state at the root level  */
  rootQuery?: ASTQuery;
  /** Provide to allow editing of the query */
  setQuery?: (rootQuery: Malloy.Query | undefined) => void;
}

/**
 * QueryEditorContext enables query editing by providing the setQuery
 * callback.
 */

export const QueryEditorContext = React.createContext<QueryEditorContextProps>(
  {}
);
