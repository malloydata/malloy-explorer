/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode, useCallback} from 'react';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import * as Malloy from '@malloydata/malloy-interfaces';
import type {DrillData} from '@malloydata/render';
import {QueryEditorContext} from '../contexts/QueryEditorContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';
import {MalloyQueryFocusProvider} from './MalloyQueryFocusProvider';
import {UpdateQueryContext} from '../hooks/useQueryUpdate';
import {SearchValueMapResult, TopValuesContext} from '../hooks/useTopValues';
import {ColorTheme, darkThemes} from './primitives/colors.stylex';
import {ThemeContext} from './primitives/contexts/ThemeContext';

export interface MalloyExplorerProviderProps {
  /** Malloy source to extend for query */
  source: Malloy.SourceInfo;
  /** Current query state */
  query?: Malloy.Query | string;
  /** Callback for editor changes */
  onQueryChange?: (query: Malloy.Query | string | undefined) => void;
  /** Currently focused nest element */
  focusedNestViewPath: string[];
  /** Callback for user selecting focussed element */
  onFocusedNestViewPathChange: (path: string[]) => void;
  children: ReactNode;
  /** Search index result values for suggestions */
  topValues?: SearchValueMapResult[];
  /** Default drill behavior override callback */
  onDrill?: ({stableQuery, stableDrillClauses}: DrillData) => void;
  /** Color overrides */
  theme?: ColorTheme;
  dark?: boolean;
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
  theme,
  dark,
}: MalloyExplorerProviderProps) {
  const rootQuery = useQueryBuilder(source, query);

  const updateQuery = useCallback(() => {
    onQueryChange?.(rootQuery?.build());
  }, [onQueryChange, rootQuery]);

  if (!theme && dark) {
    theme = darkThemes;
  }

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
                query,
              }}
            >
              <ThemeContext.Provider value={{theme, dark}}>
                {children}
              </ThemeContext.Provider>
            </QueryEditorContext.Provider>
          </TopValuesContext.Provider>
        </UpdateQueryContext.Provider>
      </MalloyQueryFocusProvider>
    </TooltipProvider>
  );
}
