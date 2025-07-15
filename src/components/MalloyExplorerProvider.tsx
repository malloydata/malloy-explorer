/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode, useCallback, useState} from 'react';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import * as Malloy from '@malloydata/malloy-interfaces';
import type {DrillData} from '@malloydata/render';
import {QueryEditorContext} from '../contexts/QueryEditorContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {MalloyQueryFocusProvider} from './MalloyQueryFocusProvider';
import {UpdateQueryContext} from '../hooks/useQueryUpdate';
import {SearchValueMapResult, TopValuesContext} from '../hooks/useTopValues';

export interface MalloyExplorerProviderProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query | string;
  onQueryChange?: (query: Malloy.Query | undefined) => void;
  focusedNestViewPath: string[];
  onFocusedNestViewPathChange: (path: string[]) => void;
  children: ReactNode | ReactNode[];
  topValues?: SearchValueMapResult[];
  onDrill?: ({stableQuery, stableDrillClauses}: DrillData) => void;
  initialMalloy?: string;
  setInitialMalloy?: (malloy: string) => void;
}

export function MalloyExplorerProvider({
  source,
  query,
  onQueryChange = () => {},
  focusedNestViewPath,
  onFocusedNestViewPathChange,
  children,
  topValues,
  onDrill,
  initialMalloy,
  setInitialMalloy,
}: MalloyExplorerProviderProps) {
  const rootQuery = useQueryBuilder(source, query);
  const [malloy, setMalloy] = useState('');

  const updateQuery = useCallback(() => {
    onQueryChange?.(rootQuery?.build());
  }, [onQueryChange, rootQuery]);

  return (
    <TooltipProvider>
      <MalloyQueryFocusProvider
        rootQuery={rootQuery}
        focusedNestViewPath={focusedNestViewPath}
        onFocusedNestViewPathChange={onFocusedNestViewPathChange}
      >
        <UpdateQueryContext.Provider value={{updateQuery}}>
          <TopValuesContext.Provider value={{topValues}}>
            <QueryEditorContext.Provider
              value={{
                source,
                rootQuery,
                setQuery: onQueryChange,
                onDrill,
                malloy,
                setMalloy,
                initialMalloy,
                setInitialMalloy,
              }}
            >
              {children}
            </QueryEditorContext.Provider>
          </TopValuesContext.Provider>
        </UpdateQueryContext.Provider>
      </MalloyQueryFocusProvider>
    </TooltipProvider>
  );
}
