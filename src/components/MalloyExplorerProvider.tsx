/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  QueryEditorContext,
  SearchValueMapResult,
} from '../contexts/QueryEditorContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {MalloyActiveQueryPanelProvider} from './MalloyActiveQueryPanelProvider';

export interface MalloyExplorerProviderProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  setQuery?: (query: Malloy.Query | undefined) => void;
  children: ReactNode | ReactNode[];
  topValues?: SearchValueMapResult[];
}

export function MalloyExplorerProvider({
  source,
  query,
  setQuery,
  children,
  topValues,
}: MalloyExplorerProviderProps) {
  const rootQuery = useQueryBuilder(source, query);

  return (
    <TooltipProvider>
      <MalloyActiveQueryPanelProvider>
      <QueryEditorContext.Provider
        value={{
          source,
          rootQuery,
          setQuery,
          topValues,
        }}
      >
        {children}
      </QueryEditorContext.Provider>
      </MalloyActiveQueryPanelProvider>
    </TooltipProvider>
  );
}
