/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import SpinnerSVG from '../../assets/ui/spinner.svg?react';

const SIZES = {
  large: 25,
  medium: 20,
  small: 15,
};

type SpinnerSize = keyof typeof SIZES;

interface SpinnerProps {
  size: SpinnerSize;

  customStyle?: StyleXStyles;
}

export default function Spinner({size, customStyle}: SpinnerProps) {
  return (
    <div {...stylex.props(styles.root, customStyle)}>
      <span
        aria-valuetext="Loading"
        {...stylex.props(styles.spinner)}
        role="progressbar"
      >
        <SpinnerSVG
          {...stylex.props(styles.spinner, styles.animated)}
          width={SIZES[size]}
          height={SIZES[size]}
        />
      </span>
    </div>
  );
}

const rotation = stylex.keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const styles = stylex.create({
  animated: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: rotation,
    animationTimingFunction: 'linear',
    willChange: 'transform',
  },
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spinner: {
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'middle',
  },
});
