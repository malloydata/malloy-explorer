/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

export interface ExplorerPanelsContextProps {
  /** Manages the state of the source panel UI.  */
  isSourcePanelOpen: boolean;
  setIsSourcePanelOpen?: (isOpen: boolean) => void;
}

/**
 * QueryEditorContext contains state that is shared across the different
 * panels of the Malloy Explorer.
 */

export const ExplorerPanelsContext =
  React.createContext<ExplorerPanelsContextProps>({
    isSourcePanelOpen: true,
    setIsSourcePanelOpen: undefined,
  });
