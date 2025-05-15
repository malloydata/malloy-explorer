/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {ASTView} from '@malloydata/malloy-query-builder';

export interface MalloyActiveQueryPanelProviderProps {
  children: ReactNode | ReactNode[];
}

export function MalloyActiveQueryPanelProvider({
  children,
}: MalloyActiveQueryPanelProviderProps) {
  const [activeNestQueryPanel, setActiveNestQueryPanel] =
    React.useState<HTMLElement | null>(null);

  const [activeNestView, setActiveNestView] = React.useState<ASTView | null>(
    null
  );

  return (
    <MalloyActiveQueryPanelContext.Provider
      value={{
        activeNestQueryPanel,
        onActiveNestQueryPanelChange: setActiveNestQueryPanel,
        activeNestView,
        onActiveNestViewChange: setActiveNestView,
      }}
    >
      {children}
    </MalloyActiveQueryPanelContext.Provider>
  );
}

interface MalloyActiveQueryPanel {
  /** Currently focused nest query panel element */
  activeNestQueryPanel?: HTMLElement | null;
  /** Callback function for when the current focused nest query panel changes */
  onActiveNestQueryPanelChange?: (panel: HTMLElement | null) => void;
  /** Nest view object corresponding to current focused nest query panel */
  activeNestView?: ASTView | null;
  /**
   * Callback function for when the nest view object
   * corresponding to current focused nest query panel changes
   */
  onActiveNestViewChange?: (view: ASTView | null) => void;
}

const MalloyActiveQueryPanelContext =
  React.createContext<MalloyActiveQueryPanel>({});

export function useActiveQueryPanel() {
  return React.useContext(MalloyActiveQueryPanelContext);
}
