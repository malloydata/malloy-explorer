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
import type {DrillData} from '@malloydata/render';
import {
  QueryEditorContext,
  SearchValueMapResult,
} from '../contexts/QueryEditorContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {MalloyQueryFocusProvider} from './MalloyQueryFocusProvider';

export interface MalloyExplorerProviderProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  onQueryChange?: (query: Malloy.Query | undefined) => void;
  focusedNestViewPath: string[];
  onFocusedNestViewPathChange: (path: string[]) => void;
  children: ReactNode | ReactNode[];
  topValues?: SearchValueMapResult[];
  onDrill?: ({stableQuery, stableDrillClauses}: DrillData) => void;
}

export function MalloyExplorerProvider({
  source,
  query,
  onQueryChange,
  focusedNestViewPath,
  onFocusedNestViewPathChange,
  children,
  topValues,
  onDrill,
}: MalloyExplorerProviderProps) {
  const rootQuery = useQueryBuilder(source, query);

  return (
    <TooltipProvider>
      <MalloyQueryFocusProvider
        rootQuery={rootQuery}
        focusedNestViewPath={focusedNestViewPath}
        onFocusedNestViewPathChange={onFocusedNestViewPathChange}
      >
        <QueryEditorContext.Provider
          value={{
            source,
            rootQuery,
            setQuery: onQueryChange,
            topValues,
            onDrill,
          }}
        >
          {children}
        </QueryEditorContext.Provider>
      </MalloyQueryFocusProvider>
    </TooltipProvider>
  );
}
