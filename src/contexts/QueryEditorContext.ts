/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import type {DrillData} from '@malloydata/render';
import {MalloyExplorerDownloadProps} from '../components/MalloyExplorerProvider';

export interface QueryEditorContextProps {
  /** Source object at the root level */
  source: Malloy.SourceInfo;
  /** Query object to represent current state at the root level  */
  rootQuery: ASTQuery | undefined;
  /** Provide to allow editing of the query */
  setQuery: (query: Malloy.Query | string | undefined) => void;
  query: Malloy.Query | string | undefined;
  onDrill?: (drillData: DrillData) => void;
  onDownload?: ({
    submittedQuery,
    name,
    format,
  }: MalloyExplorerDownloadProps) => void;
}

/**
 * QueryEditorContext enables query editing by providing the setQuery
 * callback.
 */
export const QueryEditorContext = React.createContext<QueryEditorContextProps>({
  source: {
    name: '',
    schema: {
      fields: [],
    },
  },
  rootQuery: undefined,
  setQuery: () => {},
  query: undefined,
});
