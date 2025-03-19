/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';

import {Label} from '@radix-ui/react-dropdown-menu';
import {Tag} from '@malloydata/malloy-tag';
import {Icon} from '../primitives';

export interface VisualizationProps {
  annotations?: Malloy.Annotation[];
}

export function Visualization({annotations}: VisualizationProps) {
  if (!annotations) {
    return null;
  }

  const {tag} = Tag.fromTagLines(
    annotations.map(annotation => annotation.value)
  );

  let renderer: RendererName = 'table';
  if (tag) {
    const tagProps = tag.getProperties();
    const tags = Object.keys(tagProps);

    if (tags.length) {
      if (RENDERERS.includes(tags[0] as RendererName)) {
        renderer = tags[0] as RendererName;
      }
    }
    return (
      <div {...stylex.props(styles.labelWithIcon, styles.token)}>
        <Icon name={`viz_${renderer}`} />
        <Label>{snakeToTitle(renderer)}</Label>
      </div>
    );
  }
}

export function snakeToTitle(snake: string): string {
  return snake
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const QUERY_RENDERERS: RendererName[] = [
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

export const ATOMIC_RENDERERS: RendererName[] = [
  'number',
  'boolean',
  'currency',
  'image',
  'url',
  'percent',
  'text',
  'time',
] as const;

export const RENDERERS: RendererName[] = [
  ...QUERY_RENDERERS,
  ...ATOMIC_RENDERERS,
] as const;

export type RendererName =
  | 'table'
  | 'dashboard'
  | 'text'
  | 'currency'
  | 'image'
  | 'time'
  | 'json'
  | 'single_value'
  | 'list'
  | 'list_detail'
  | 'cartesian_chart'
  | 'bar_chart'
  | 'scatter_chart'
  | 'line_chart'
  | 'point_map'
  | 'segment_map'
  | 'shape_map'
  | 'number'
  | 'percent'
  | 'boolean'
  | 'sparkline'
  | 'bytes'
  | 'vega'
  | 'url';
