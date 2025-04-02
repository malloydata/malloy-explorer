/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode, useState} from 'react';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import * as Malloy from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../contexts/QueryEditorContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {ExplorerPanelsContext} from '../contexts/ExplorerPanelsContext';

export interface MalloyExplorerProviderProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  setQuery?: (query: Malloy.Query | undefined) => void;
  children: ReactNode | ReactNode[];
}

export function MalloyExplorerProvider({
  source,
  query,
  setQuery,
  children,
}: MalloyExplorerProviderProps) {
  const [isSourcePanelOpen, setIsSourcePanelOpen] = useState(true);
  const rootQuery = useQueryBuilder(source, query);
  return (
    <TooltipProvider>
      <QueryEditorContext.Provider
        value={{
          source,
          rootQuery,
          setQuery,
        }}
      >
        <ExplorerPanelsContext.Provider
          value={{isSourcePanelOpen, setIsSourcePanelOpen}}
        >
          {children}
        </ExplorerPanelsContext.Provider>
      </QueryEditorContext.Provider>
    </TooltipProvider>
  );
}
