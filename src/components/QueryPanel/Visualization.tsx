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
import {useEffect, useMemo, useState} from 'react';
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
import {useUpdateQuery} from '../../hooks/useQueryUpdate';

export interface VisualizationProps {
  view: ASTQuery | ASTView;
}

export function Visualization({view}: VisualizationProps) {
  const updateQuery = useUpdateQuery();
  const renderer = useMemo(() => new MalloyRenderer(), []);
  const [currentRenderer, setCurrentRenderer] = useState<VizName>('table');
  const [plugin, setPlugin] = useState<CoreVizPluginInstance>();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const tag = view.getTag().toString();

  useEffect(() => {
    setError('');
    const viz = renderer.createViz({
      onError: error => {
        console.error('Malloy render error', error);
        setError(error.message);
      },
    });
    viz.setResult({
      schema: view.definition.getOutputSchema(),
      annotations: tag.split('\n').map(value => ({value})),
      connection_name: '',
    });
    const metadata = viz.getMetadata();
    if (metadata) {
      const plugin = viz.getActivePlugin(metadata.getRootField().key);
      if (plugin) {
        if (isCoreVizPluginInstance(plugin)) {
          setCurrentRenderer(plugin.name as VizName);
          setPlugin(plugin);
          return;
        }
        if (plugin.name === 'error') {
          setError((plugin.getMetadata() as {message: string}).message);
        }
      }
    }
    const currentTag = view.getTag();
    const rendererTag = view.getTag(RENDERER_PREFIX);
    const currentRenderer: VizName = (rendererTag.tag('viz')?.text() ??
      legacyToViz(
        (tagToRenderer(currentTag) as QueryRendererName) ?? 'table'
      )) as VizName;
    setCurrentRenderer(currentRenderer);
    setPlugin(undefined);
  }, [renderer, view, tag]);

  const updateViz = (renderer: VizName): void => {
    view.setTagProperty(['viz'], renderer, RENDERER_PREFIX);
    updateQuery();
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

  if (error) {
    tokens.push(
      <Token icon="warning" tooltip={error} customStyle={styles.trigger} />
    );
  }

  return (
    <>
      <TokenGroup customStyle={styles.group}>{tokens}</TokenGroup>
      <VizEditorDialog
        open={open}
        setOpen={setOpen}
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
