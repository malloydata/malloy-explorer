/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import stylex from '@stylexjs/stylex';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ASTAggregateViewOperation,
  ASTCalculateViewOperation,
  ASTGroupByViewOperation,
  ASTNestViewOperation,
} from '@malloydata/malloy-query-builder';
import {Button} from '../../primitives';
import {fontStyles} from '../../primitives/styles';
import {ViewParent} from '../../utils/fields';
import ErrorIcon from '../../primitives/ErrorIcon';
import {dialogStyles} from '../dialogStyles';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';
import {ThemeContext} from '../../primitives/contexts/ThemeContext';

export interface RenameDialogProps {
  view: ViewParent;
  target:
    | ASTGroupByViewOperation
    | ASTAggregateViewOperation
    | ASTNestViewOperation
    | ASTCalculateViewOperation
    | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function RenameDialog({view, target, open, setOpen}: RenameDialogProps) {
  const {theme} = useContext(ThemeContext);
  const [name, setName] = useState('');
  const updateQuery = useUpdateQuery();

  useEffect(() => {
    if (target) {
      setName(target.name);
    }
  }, [target, open]);

  if (!target) {
    return null;
  }

  const onRename = () => {
    target.edit();
    target.name = name;
    updateQuery();
    setOpen(false);
  };

  const {fields} = view.getOutputSchema();
  const badName =
    name !== target.name && fields.some(field => field.name === name);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(dialogStyles.overlay)}>
          <Dialog.Content
            {...stylex.props(dialogStyles.content, fontStyles.body, theme)}
          >
            <Dialog.Description {...stylex.props(dialogStyles.displayNone)}>
              Rename {target.name}
            </Dialog.Description>
            <Dialog.Title {...stylex.props(dialogStyles.title)}>
              Rename {target.name}
            </Dialog.Title>
            <div {...stylex.props(dialogStyles.editor)}>
              <div {...stylex.props(dialogStyles.editorRow)}>
                <input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  {...stylex.props({
                    ...dialogStyles.editorCell,
                    ...dialogStyles.input,
                  })}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      onRename();
                    } else if (event.key === 'Esc') {
                      setOpen(false);
                    }
                  }}
                />
                {badName && <ErrorIcon errorMessage="Name already in use" />}
              </div>
              <div {...stylex.props(dialogStyles.editorRow)}>
                <Button
                  label="Cancel"
                  onClick={() => setOpen(false)}
                  customStyle={dialogStyles.editorCell}
                />
                <Button
                  variant="primary"
                  label="Rename"
                  onClick={onRename}
                  customStyle={dialogStyles.editorCell}
                  disabled={badName}
                />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
