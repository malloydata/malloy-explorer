/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';

export interface QueryContextProps {
  setQuery?: (query: Malloy.Query) => void;
  source?: Malloy.SourceInfo;
  query?: Malloy.Query;
}

export const QueryContext = createContext<QueryContextProps>({});
