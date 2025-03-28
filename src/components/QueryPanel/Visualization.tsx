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
import {QUERY_RENDERERS, RendererName, tagToRenderer} from '../utils/renderer';

export interface VisualizationProps {
  rootQuery: ASTQuery;
  view: ASTQuery | ASTView;
}

export function Visualization({rootQuery, view}: VisualizationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const currentTag = view.getTag();

  const currentRenderer: RendererName = tagToRenderer(currentTag) ?? 'table';

  const setRenderer = (renderer: RendererName): void => {
    view.removeTagProperty([currentRenderer]);
    view.setTagProperty([renderer]);
    setQuery?.(rootQuery.build());
  };

  const vizes = QUERY_RENDERERS.map(viz => ({
    icon: <Icon name={`viz_${viz}`} />,
    label: snakeToTitle(viz),
    value: viz,
    onClick: () => setRenderer(viz),
  }));

  const tokens = [
    <SelectorToken
      key="first"
      style={styles.first}
      icon={`viz_${currentRenderer}`}
      value={currentRenderer}
      items={vizes}
      onChange={viz => setRenderer(viz)}
    />,
  ];

  // TODO - add viz gear menu

  return <TokenGroup>{tokens}</TokenGroup>;
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

export function snakeToTitle(snake: string): string {
  return snake
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
