/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';

const SIZES = {
  large: {
    border: 3,
    diameter: 18,
  },
  medium: {
    border: 3,
    diameter: 14,
  },
  small: {
    border: 3,
    diameter: 10,
  },
};

type SpinnerSize = keyof typeof SIZES;

interface SpinnerProps {
  size: SpinnerSize;

  style?: StyleXStyles;
}

const SPREAD = 0.75;
const START_POINT = 1.5;
const INACTIVE_COLOR = 'rgba(0, 0, 0, 0.1)';
const ACTIVE_COLOR = 'rgba(0, 100, 224, 1)';

export default function Spinner({size, style}: SpinnerProps) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (canvas != null) {
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      const {border, diameter} = SIZES[size];
      const pixelRatio = window.devicePixelRatio || 1;
      const radius = (diameter / 2) * pixelRatio;
      const lineWidth = border * pixelRatio;
      const frameSize = (radius + lineWidth) * 2;

      canvas.height = canvas.width = frameSize;
      canvas.style.width = canvas.style.height = frameSize / pixelRatio + 'px';

      context.lineCap = 'round';
      context.lineWidth = lineWidth;

      const center = frameSize / 2;

      context.beginPath();
      context.arc(center, center, radius, 0, 2 * Math.PI);
      context.strokeStyle = INACTIVE_COLOR;
      context.stroke();

      context.beginPath();
      context.arc(
        center,
        center,
        radius,
        START_POINT * Math.PI,
        ((START_POINT + SPREAD) % 2) * Math.PI
      );
      context.strokeStyle = ACTIVE_COLOR;
      context.stroke();
    }
  }, [size]);

  const {border, diameter} = SIZES[size];
  const frameSize = diameter + border * 2;
  return (
    <div {...stylex.props(styles.root, style)}>
      <span
        aria-valuetext="Loading"
        {...stylex.props(styles.spinner)}
        role="progressbar"
        style={{
          height: frameSize,
          width: frameSize,
        }}
      >
        <canvas {...stylex.props(styles.canvas, styles.animated)} ref={ref} />
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
    animationDuration: '750ms',
    animationIterationCount: 'infinite',
    animationName: rotation,
    animationTimingFunction: 'linear',
    willChange: 'transform',
  },
  canvas: {
    backfaceVisibility: 'hidden',
    display: 'block',
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
