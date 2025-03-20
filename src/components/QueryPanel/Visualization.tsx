/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Icon, Token, TokenGroup} from '../primitives';
import {Menu, MenuItem} from '../Menu';
import {Tag} from '@malloydata/malloy-tag';
import stylex from '@stylexjs/stylex';

export interface VisualizationProps {
  rootQuery: ASTQuery;
  view: ASTQuery | ASTView;
}

export function Visualization({view}: VisualizationProps) {
  const currentTag = view.getTag();

  const currentRenderer: RendererName = tagToRenderer(currentTag) ?? 'table';

  const setRenderer = (renderer: RendererName): void => {
    view.removeTagProperty([currentRenderer]);
    view.setTagProperty([renderer]);
  };

  const vizes: MenuItem[] = QUERY_RENDERERS.map(viz => ({
    icon: <Icon name={`viz_${viz}`} />,
    label: snakeToTitle(viz),
    onClick: () => setRenderer(viz),
  }));

  return (
    <TokenGroup style={styles.group}>
      <Token
        style={styles.first}
        icon={`viz_${currentRenderer}`}
        label={snakeToTitle(currentRenderer)}
      />
      <Menu trigger={<Token icon="meatballs" />} items={vizes} />
    </TokenGroup>
  );
}

const styles = stylex.create({
  group: {
    width: '100%',
  },
  first: {
    flexGrow: 1,
    justifyContent: 'start',
  },
});

export function tagToRenderer(tag: Tag | undefined) {
  if (tag) {
    const tagProps = tag.getProperties();
    const tags = Object.keys(tagProps);

    if (tags.length) {
      if (RENDERERS.includes(tags[0] as RendererName)) {
        return tags[0] as RendererName;
      }
    }
  }

  return null;
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
