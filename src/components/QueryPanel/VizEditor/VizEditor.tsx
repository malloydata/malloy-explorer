/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex, {StyleXStyles} from '@stylexjs/stylex';
import * as React from 'react';
import {styles} from './styles';
import {useState} from 'react';
import {
  ASTAnnotation,
  ASTQuery,
  ASTView,
} from '@malloydata/malloy-query-builder';
import {CoreVizPluginInstance} from '@malloydata/render';
import ObjectEditor from './ObjectEditor';
import {Button} from '../../primitives';
import {RENDERER_PREFIX} from '../../utils/renderer';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface VizEditorProps {
  plugin: CoreVizPluginInstance;
  view: ASTQuery | ASTView;
  customStyle?: StyleXStyles;
  setOpen: (open: boolean) => void;
}

export function VizEditor({view, plugin, setOpen}: VizEditorProps) {
  const updateQuery = useUpdateQuery();
  const [current, setCurrent] = useState(plugin.getSettings());
  console.info('RendererEditor current settings:', current);

  const schema = plugin.getSchema();
  const updateCurrent = (path: string[], value: unknown) => {
    const newCurrent = {...current};
    let target = newCurrent;
    for (let i = 0; i < path.length - 1; i++) {
      if (!(path[i] in target)) {
        target[path[i]] = {};
      }
      target = target[path[i]] as Record<string, unknown>;
    }
    target[path[path.length - 1]] = value;
    setCurrent(newCurrent);
  };

  return (
    <div {...stylex.props(styles.editor)}>
      <div {...stylex.props(styles.editorGrid)}>
        <ObjectEditor
          view={view}
          name=""
          path={[]}
          option={schema}
          current={current}
          updateCurrent={updateCurrent}
        />
      </div>
      <div {...stylex.props(styles.editorRow)}>
        <Button
          label="Cancel"
          onClick={() => {
            setOpen(false);
          }}
          customStyle={styles.editorCell}
        />
        <Button
          variant="primary"
          label="Apply"
          onClick={() => {
            const tag = plugin.settingsToTag(current);
            const value = tag.toString();
            const annotations = view.getOrAddAnnotations();
            const old = annotations.items.find(annotation =>
              annotation.value.startsWith(RENDERER_PREFIX + 'viz')
            );
            if (old) {
              annotations.remove(old);
            }
            view.getOrAddAnnotations().add(new ASTAnnotation({value}));
            updateQuery();
            setOpen(false);
          }}
          customStyle={styles.editorCell}
        />
      </div>
    </div>
  );
}
