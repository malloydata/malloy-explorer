/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from './colors.stylex';
import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport,
} from '@radix-ui/react-scroll-area';
import {cornerVars, scrollbarVars} from './scrollable-area.stylex';

interface ScrollableAreaProps {
  /**
   * The content to be rendered inside the scrollable area.
   */
  children: React.ReactNode;
}

/**
 * @deprecated
 */
export default function ScrollableArea({children}: ScrollableAreaProps) {
  return (
    <Root {...stylex.props(styles.root)}>
      <Viewport {...stylex.props(styles.viewport)}>
        {React.Children.map(children, child => child)}
      </Viewport>
      <Scrollbar
        {...stylex.props(styles.scrollbar, styles['vertical'])}
        orientation="vertical"
      >
        <Thumb {...stylex.props(styles.thumb)} />
      </Scrollbar>
      <Scrollbar
        {...stylex.props(styles.scrollbar, styles['horizontal'])}
        orientation="horizontal"
      >
        <Thumb {...stylex.props(styles.thumb)} />
      </Scrollbar>
      <Corner {...stylex.props(styles.corner)} />
    </Root>
  );
}

const styles = stylex.create({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    [scrollbarVars.opacity]: {
      default: 0,
      ':hover': 0.3,
    },
    [cornerVars.opacity]: {
      default: 0,
      ':hover': 0.3,
    },
  },
  viewport: {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
  },
  scrollbar: {
    display: 'flex',
    background: backgroundColors.controlActive,
    opacity: scrollbarVars.opacity,
    transition: 'opacity 0.5s ease',
  },
  vertical: {
    padding: '0 4px',
    width: '8px',
  },
  horizontal: {
    flexDirection: 'column',
    padding: '4px 0',
    height: '8px',
  },
  thumb: {
    flex: 1,
    background: backgroundColors.gray,
    borderRadius: '4px',
  },
  corner: {
    background: backgroundColors.controlActive,
    opacity: cornerVars.opacity,
    transition: 'opacity 0.5s ease',
  },
});
