/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Icon, SelectorToken, TokenGroup} from '../primitives';
import stylex from '@stylexjs/stylex';
import {useContext} from 'react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {
  RENDERER_PREFIX,
  QueryRendererName,
  tagToRenderer,
  VISUALIZATION_OPTIONS,
  VizName,
  legacyToViz,
  VIZ_RENDERERS,
} from '../utils/renderer';
import {RendererPopover} from './RendererPopover';

export interface VisualizationProps {
  rootQuery: ASTQuery;
  view: ASTQuery | ASTView;
}

export function Visualization({rootQuery, view}: VisualizationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const currentTag = view.getTag();
  const rendererTag = view.getTag(RENDERER_PREFIX);

  const currentRenderer: VizName = (rendererTag.tag('viz')?.text() ??
    legacyToViz(
      (tagToRenderer(currentTag) as QueryRendererName) ?? 'table'
    )) as VizName;

  const setRenderer = (renderer: VizName): void => {
    view.setTagProperty(['viz'], renderer, RENDERER_PREFIX);
    setQuery?.(rootQuery.build());
  };

  const items = VIZ_RENDERERS.map(viz => ({
    icon: <Icon name={`viz_${viz}`} />,
    label: snakeToTitle(viz),
    value: viz,
    onClick: () => setRenderer(viz),
  }));

  const tokens = [
    <SelectorToken
      key="first"
      customStyle={styles.first}
      icon={`viz_${currentRenderer}`}
      value={currentRenderer}
      items={items}
      onChange={viz => setRenderer(viz)}
    />,
  ];

  const options = VISUALIZATION_OPTIONS[currentRenderer];

  if (options) {
    tokens.push(
      <RendererPopover
        key="menu"
        viz={currentRenderer}
        options={options}
        view={view}
        rootQuery={rootQuery}
      />
    );
  }

  return <TokenGroup customStyle={styles.group}>{tokens}</TokenGroup>;
}

const styles = stylex.create({
  group: {
    width: '100%',
    gridTemplateColumns: '1fr auto',
  },
  first: {
    justifyContent: 'start',
  },
});

export function snakeToTitle(snake: string): string {
  return snake
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
