/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Icon, SelectorToken, Token, TokenGroup} from '../primitives';
import stylex from '@stylexjs/stylex';
import {useContext, useEffect, useMemo, useState} from 'react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {
  RENDERER_PREFIX,
  VizName,
  VIZ_RENDERERS,
  legacyToViz,
  tagToRenderer,
  QueryRendererName,
} from '../utils/renderer';
import {VizEditorDialog} from './VizEditor/VizEditorDialog';
import {
  CoreVizPluginInstance,
  MalloyRenderer,
  isCoreVizPluginInstance,
} from '@malloydata/render';

export interface VisualizationProps {
  rootQuery: ASTQuery;
  view: ASTQuery | ASTView;
}

export function Visualization({rootQuery, view}: VisualizationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const renderer = useMemo(() => new MalloyRenderer(), []);
  const [currentRenderer, setCurrentRenderer] = useState<VizName>('table');
  const [plugin, setPlugin] = useState<CoreVizPluginInstance>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const viz = renderer.createViz({
      onError: error => {
        console.error('Malloy render error', error);
      },
    });
    viz.setResult({
      schema: view.definition.getOutputSchema(),
      annotations: view
        .getTag()
        .toString()
        .split('\n')
        .map(value => ({value})),
      connection_name: '',
    });
    const metadata = viz.getMetadata();
    if (metadata) {
      const plugin = viz.getActivePlugin(metadata.getRootField().key);
      if (plugin && isCoreVizPluginInstance(plugin)) {
        setCurrentRenderer(plugin.name as VizName);
        setPlugin(plugin);
      }
    } else {
      const currentTag = view.getTag();
      const rendererTag = view.getTag(RENDERER_PREFIX);
      const currentRenderer: VizName = (rendererTag.tag('viz')?.text() ??
        legacyToViz(
          (tagToRenderer(currentTag) as QueryRendererName) ?? 'table'
        )) as VizName;
      setCurrentRenderer(currentRenderer);
    }
  }, [renderer, view]);

  const updateViz = (renderer: VizName): void => {
    view.setTagProperty(['viz'], renderer, RENDERER_PREFIX);
    setQuery?.(rootQuery.build());
  };

  const items = VIZ_RENDERERS.map(viz => ({
    icon: <Icon name={`viz_${viz}`} />,
    label: snakeToTitle(viz),
    value: viz,
    onClick: () => updateViz(viz),
  }));

  const tokens = [
    <SelectorToken
      key="first"
      customStyle={styles.first}
      icon={`viz_${currentRenderer}`}
      value={currentRenderer}
      items={items}
      onChange={viz => updateViz(viz)}
    />,
  ];

  if (plugin) {
    tokens.push(
      <Token
        key="gear"
        icon="gear"
        onClick={() => setOpen(true)}
        customStyle={styles.trigger}
        tooltip="Edit Settings..."
      />
    );
  }

  return (
    <>
      <TokenGroup customStyle={styles.group}>{tokens}</TokenGroup>
      <VizEditorDialog
        open={open}
        setOpen={setOpen}
        rootQuery={rootQuery}
        plugin={plugin}
        view={view}
      />
    </>
  );
}

const styles = stylex.create({
  trigger: {
    height: 'calc(100% - 8px)',
  },
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
