/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Tag} from '@malloydata/malloy-tag';

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

export function tagToRenderer(tag: Tag | undefined) {
  if (tag) {
    const tagProps = tag.getProperties();
    const tags = Object.keys(tagProps);

    for (const tag of tags) {
      if (RENDERERS.includes(tag as RendererName)) {
        return tag as RendererName;
      }
    }
  }

  return null;
}
