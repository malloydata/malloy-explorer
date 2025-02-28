/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';

import LineChartIcon from '../assets/visualizations/viz_line.svg?react';

export interface VisualizationProps {
  annotations?: Malloy.Annotation[];
}

export function Visualization({annotations}: VisualizationProps) {
  if (!annotations) {
    return null;
  }

  <div>
    <div {...stylex.props(styles.labelWithIcon)}>
      <LineChartIcon {...stylex.props(styles.icon)} />#
    </div>
    <div>
      {annotations.map((annotation, key) => (
        <div key={key}>{annotation.value}</div>
      ))}
    </div>
  </div>;
}
