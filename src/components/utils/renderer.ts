/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Tag} from '@malloydata/malloy-tag';

// TODO switch to '#r ' when available
export const RENDERER_PREFIX = '# ';

export const VIZ_RENDERERS: VizName[] = [
  'table',
  'bar',
  'dashboard',
  'json',
  'line',
  'list',
  'list_detail',
  'point_map',
  'scatter_chart',
  'segment_map',
  'shape_map',
] as const;

export const QUERY_RENDERERS: QueryRendererName[] = [
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
] as const;

export const ATOMIC_RENDERERS: AtomicRendererName[] = [
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

export type VizName =
  | 'table'
  | 'bar'
  | 'dashboard'
  | 'json'
  | 'line'
  | 'list'
  | 'list_detail'
  | 'point_map'
  | 'scatter_chart'
  | 'segment_map'
  | 'shape_map';

export type QueryRendererName =
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
  | 'shape_map';

export type AtomicRendererName =
  | 'number'
  | 'boolean'
  | 'currency'
  | 'image'
  | 'url'
  | 'percent'
  | 'text'
  | 'time';

export type RendererName = QueryRendererName | AtomicRendererName;

export function tagToRenderer(tag: Tag | undefined) {
  if (tag) {
    const tagProps = tag.getProperties();
    const tags = Object.keys(tagProps);

    for (const tag of tags) {
      if (RENDERERS.includes(tag as RendererName) && !tagProps[tag].deleted) {
        return tag as RendererName;
      }
    }
  }

  return null;
}

export function legacyToViz(name: QueryRendererName): VizName {
  switch (name) {
    case 'bar_chart':
      return 'bar';
    case 'line_chart':
      return 'line';
    default:
      return name;
  }
}

export interface BaseVizOption {
  name: string;
  label: string;
  description?: string;
}

export interface VizBooleanOption extends BaseVizOption {
  type: 'boolean';
  default: boolean;
}

export interface VizStringOption extends BaseVizOption {
  type: 'string';
  default: string;
}

export interface VizSelectOption extends BaseVizOption {
  type: 'select';
  default: string;
  options: Array<{label: string; description?: string; value: string}>;
}

export type VizOption = VizBooleanOption | VizStringOption | VizSelectOption;

export const VISUALIZATION_OPTIONS: Record<VizName, VizOption[] | null> = {
  table: null,
  bar: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      default: '',
    },
    {
      name: 'sub_title',
      label: 'Subtitle',
      type: 'string',
      default: '',
    },
    {
      name: 'stack',
      label: 'Stack',
      type: 'boolean',
      default: false,
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      default: 'fill',
      options: [
        {label: 'Fill', value: 'fill'},
        {label: 'Sparkline', value: 'spark'},
        {label: 'X-Small', value: 'xs'},
        {label: 'Small', value: 'sm'},
        {label: 'Medium', value: 'md'},
        {label: 'Large', value: 'lg'},
        {label: 'X-Large', value: 'xl'},
        {label: 'XX-Large', value: '2xl'},
      ],
    },
  ],
  dashboard: null,
  json: null,
  line: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      default: '',
    },
    {
      name: 'sub_title',
      label: 'Subtitle',
      type: 'string',
      default: '',
    },
    {
      name: 'zero_baseline',
      label: 'Zero Baseline',
      type: 'boolean',
      default: false,
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      default: 'md',
      options: [
        {label: 'Fill', value: 'fill'},
        {label: 'Sparkline', value: 'spark'},
        {label: 'X-Small', value: 'xs'},
        {label: 'Small', value: 'sm'},
        {label: 'Medium', value: 'md'},
        {label: 'Large', value: 'lg'},
        {label: 'X-Large', value: 'xl'},
        {label: 'XX-Large', value: '2xl'},
      ],
    },
  ],
  list: null,
  list_detail: null,
  point_map: null,
  scatter_chart: null,
  segment_map: null,
  shape_map: null,
};
