/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Token} from '../primitives';
import {Tag} from '@malloydata/malloy-tag';
import {snakeToTitle} from '../QueryPanel/Visualization';

export interface VisualizationProps {
  annotations: Malloy.Annotation[];
}

export function Visualization({annotations}: VisualizationProps) {
  const {tag} = Tag.fromTagLines(
    annotations.map(annotation => annotation.value)
  );

  let renderer: QueryRenderer = 'table';
  if (tag) {
    const tags = Object.keys(tag.getProperties());

    if (tags.length) {
      if (QUERY_RENDERERS.includes(tags[0] as QueryRenderer)) {
        renderer = tags[0] as QueryRenderer;
      }
    }
    return <Token label={snakeToTitle(renderer)} icon={`viz_${renderer}`} />;
  }
}

const QUERY_RENDERERS: QueryRenderer[] = [
  'table',
  'bar_chart',
  'dashboard',
  'json',
  'line_chart',
  'list',
  'list_detail',
  'point_map',
  'scatter_chart',
  'segment_map',
  'shape_map',
  'sparkline',
] as const;

type QueryRenderer =
  | 'table'
  | 'bar_chart'
  | 'dashboard'
  | 'json'
  | 'line_chart'
  | 'list'
  | 'list_detail'
  | 'point_map'
  | 'scatter_chart'
  | 'segment_map'
  | 'shape_map'
  | 'sparkline';
