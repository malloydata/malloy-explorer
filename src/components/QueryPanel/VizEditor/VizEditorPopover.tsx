/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import * as Popover from '@radix-ui/react-popover';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {CoreVizPluginInstance} from '@malloydata/render';
import {Token} from '../../primitives';
import {StyleXStyles} from '@stylexjs/stylex';
import {styles} from './styles';
import {VizEditor} from './VizEditor';
import {dialogStyles} from '../dialogStyles';

export interface VizEditorPopoverProps {
  plugin: CoreVizPluginInstance;
  view: ASTQuery | ASTView;
  customStyle?: StyleXStyles;
}

export function VizEditorPopover({
  plugin,
  view,
  customStyle,
}: VizEditorPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root onOpenChange={open => setOpen(open)} open={open}>
      <Popover.Trigger asChild>
        <Token icon="gear" customStyle={{...customStyle, ...styles.trigger}} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end">
          <VizEditor
            view={view}
            plugin={plugin}
            setOpen={setOpen}
            customStyle={dialogStyles.content}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
