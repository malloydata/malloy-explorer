/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {CoreVizPluginInstance} from '@malloydata/render';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
// import {styles} from './styles';
import {VizEditor} from './VizEditor';
import {fontStyles} from '../../primitives/styles';
import {dialogStyles} from '../dialogStyles';
import {Icon} from '../../primitives';

export interface VizEditorDialogProps {
  rootQuery: ASTQuery;
  plugin?: CoreVizPluginInstance;
  view: ASTQuery | ASTView;
  customStyle?: StyleXStyles;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function VizEditorDialog({
  rootQuery,
  plugin,
  view,
  customStyle,
  open,
  setOpen,
}: VizEditorDialogProps) {
  if (!plugin || !open) {
    return null;
  }

  return (
    <Dialog.Root onOpenChange={open => setOpen(open)} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(dialogStyles.overlay)}>
          <Dialog.Content
            {...stylex.props(
              fontStyles.body,
              dialogStyles.content,
              styles.content,
              customStyle
            )}
          >
            <Dialog.Title {...stylex.props(dialogStyles.title)}>
              Visualization Settings
              <Dialog.Close {...stylex.props(dialogStyles.close)}>
                <Icon name="clear" />
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description {...stylex.props(dialogStyles.displayNone)}>
              Edit visualization parameters
            </Dialog.Description>
            <VizEditor
              rootQuery={rootQuery}
              view={view}
              plugin={plugin}
              setOpen={setOpen}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const styles = stylex.create({
  content: {
    maxWidth: '75vw',
    maxHeight: '75vh',
  },
});
