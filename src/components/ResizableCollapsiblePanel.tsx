/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {IconType, ResizeBar} from './primitives';
import {CollapsedPagePanel} from './CollapsedPagePanel';
import {ResizableCollapsiblePanelContext} from '../contexts/ResizableCollapsiblePanelContext';

interface ResizableCollapsiblePanelProps {
  /**
   * Whether the panel is expanded by default.
   */
  isInitiallyExpanded?: boolean;
  /**
   * The initial width of the panel.
   */
  initialWidth: number;
  /**
   * The minimum allowed width of the panel.
   */
  minWidth: number;
  /**
   * The icon to display in the collapsed panel header.
   */
  icon?: IconType;
  /**
   * The title to display in the collapsed panel header.
   */
  title: string;
  /**
   * The content to render inside the panel.
   */
  children: React.ReactNode | React.ReactNode[];
}

export function ResizableCollapsiblePanel({
  isInitiallyExpanded = true,
  initialWidth,
  minWidth,
  icon,
  title,
  children,
}: ResizableCollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(isInitiallyExpanded);
  const [width, setWidth] = React.useState(initialWidth);

  const isCollapsed = !isExpanded;

  return (
    <ResizableCollapsiblePanelContext.Provider
      value={{
        onExpand: () => setIsExpanded(true),
        onCollapse: () => setIsExpanded(false),
      }}
    >
      <div
        {...stylex.props(styles.panel, isCollapsed && styles.hidePanel)}
        style={{width: `${width}px`}}
      >
        {children}
        <ResizeBar
          width={initialWidth}
          minWidth={minWidth}
          onWidthChange={setWidth}
        />
      </div>
      {isCollapsed && <CollapsedPagePanel icon={icon} title={title} />}
    </ResizableCollapsiblePanelContext.Provider>
  );
}

const styles = stylex.create({
  panel: {
    position: 'relative',
    height: '100%',
    flex: '0 0 auto',
  },
  hidePanel: {
    display: 'none',
  },
});
