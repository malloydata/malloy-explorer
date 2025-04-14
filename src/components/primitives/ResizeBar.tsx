/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';

interface ResizeBarProps {
  width: number;
  minWidth: number;
  onWidthChange: (width: number) => void;
}
export default function ResizeBar({
  width,
  minWidth,
  onWidthChange,
}: ResizeBarProps) {
  const startResize = (initialMouseDownEvent: React.MouseEvent) => {
    const initialWidth = width;
    const initialMousePosition = initialMouseDownEvent.clientX;

    const handleMouseUp = () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'initial';
      document.body.style.userSelect = 'initial';
    };

    const handleMouseMove = (event: MouseEvent) => {
      const newWidth = initialWidth + (event.clientX - initialMousePosition);
      // console.info('newWidth: ' + newWidth);
      onWidthChange(Math.max(newWidth, minWidth));
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div {...stylex.props(styles.bar)} onMouseDown={e => startResize(e)}></div>
  );
}

const styles = stylex.create({
  bar: {
    cursor: 'ew-resize',
    width: '5px',
    height: '100%',
    // Floats the resize bar slightly into the neighboring pane to provide a
    // more natural feeling handle.
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: '-2px',
  },
});
