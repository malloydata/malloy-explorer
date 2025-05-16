/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {
  ASTArrowQueryDefinition,
  ASTArrowViewDefinition,
  ASTNestViewOperation,
  ASTQuery,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTView,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';

interface MalloyQueryFocus {
  // activeNestViewPath?: string[];
  // /**
  //  * Callback function for when the nest view object
  //  * corresponding to current focused nest query panel changes
  //  */
  // onActiveNestViewPathChange?: (path: string[]) => void;

  /** Nest view object corresponding to current focused nest query panel */
  focusMainView: () => void;

  isMainViewFocused: boolean;

  focusNestView: (path: string[]) => void;

  isNestViewFocused: (path: string[]) => boolean;

  focusedNestView: ASTView | null;
}

const MalloyQueryFocusContext = React.createContext<MalloyQueryFocus>({
  focusMainView: () => {},
  isMainViewFocused: true,
  focusNestView: () => {},
  isNestViewFocused: () => false,
  focusedNestView: null,
});

interface MalloyQueryFocusProviderProps {
  rootQuery: ASTQuery | undefined;
  children: ReactNode | ReactNode[];
}

export function MalloyQueryFocusProvider({
  rootQuery,
  children,
}: MalloyQueryFocusProviderProps) {
  const [focusedNestViewPath, setFocusedNestViewPath] = React.useState<
    string[]
  >([]);

  const focusedNestView = React.useMemo<ASTView | null>(() => {
    if (focusedNestViewPath.length === 0) {
      return null;
    }

    if (rootQuery) {
      const queryDef = rootQuery.definition;
      if (queryDef instanceof ASTArrowQueryDefinition) {
        return findNestView(queryDef.view, [...focusedNestViewPath].reverse());
      }
    }

    return null;
  }, [rootQuery, focusedNestViewPath]);

  const focusMainView = React.useCallback(() => {
    setFocusedNestViewPath([]);
  }, []);

  const focusNestView = React.useCallback((path: string[]) => {
    setFocusedNestViewPath([...path]);
  }, []);

  const isNestViewFocused = React.useCallback(
    (path: string[]) => {
      return JSON.stringify(path) === JSON.stringify(focusedNestViewPath);
    },
    [focusedNestViewPath]
  );

  const isMainViewFocused = focusedNestViewPath.length === 0;

  return (
    <MalloyQueryFocusContext.Provider
      value={{
        focusMainView,
        isMainViewFocused,
        focusNestView,
        isNestViewFocused,
        focusedNestView,
      }}
    >
      {children}
    </MalloyQueryFocusContext.Provider>
  );
}

export function useQueryFocus() {
  return React.useContext(MalloyQueryFocusContext);
}

const findNestView = (
  currentView: ASTViewDefinition,
  remainingPath: string[]
): ASTView | null => {
  if (remainingPath.length === 0) {
    return null;
  }
  if (currentView instanceof ASTArrowViewDefinition) {
    return findNestView(currentView.view, remainingPath);
  }
  if (currentView instanceof ASTSegmentViewDefinition) {
    const nestViewOperations = currentView.operations.items.filter(
      operation => operation instanceof ASTNestViewOperation
    );
    const targetNestName = remainingPath.pop() as string;
    const targetNestViewOperations = nestViewOperations.filter(
      operation => operation.name === targetNestName
    );

    if (remainingPath.length === 0) {
      return targetNestViewOperations[0].view;
    } else if (targetNestViewOperations.length === 0) {
      remainingPath.push(targetNestName as string);
      return null;
    } else {
      for (const operation of targetNestViewOperations) {
        const result = findNestView(operation.view.definition, remainingPath);
        if (result) {
          return result;
        }
      }
      remainingPath.push(targetNestName);
      return null;
    }
  }
  if (currentView instanceof ASTRefinementViewDefinition) {
    return findNestView(currentView.refinement, remainingPath);
  }

  return null;
};
