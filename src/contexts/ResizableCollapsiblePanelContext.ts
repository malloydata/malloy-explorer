/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

export interface ResizableCollapsiblePanelContextValue {
  /**
   * Optional callback to expand the panel.
   */
  onExpand?: () => void;
  /**
   * Optional callback to collapse the panel.
   */
  onCollapse?: () => void;
}

/**
 * ResizableCollapsiblePanelContext provides a way to share expansion and collapse
 * state of panels between different components in the Malloy Explorer.
 */
export const ResizableCollapsiblePanelContext =
  React.createContext<ResizableCollapsiblePanelContextValue>({});
