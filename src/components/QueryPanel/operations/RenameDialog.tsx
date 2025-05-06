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
  ASTGroupByViewOperation,
  ASTNestViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Button} from '../../primitives';
import {fontStyles} from '../../primitives/styles';
import {ViewParent} from '../../utils/fields';
import ErrorIcon from '../../primitives/ErrorIcon';

export interface RenameDialogProps {
  rootQuery: ASTQuery | undefined;
  view: ViewParent;
  target:
    | ASTGroupByViewOperation
    | ASTAggregateViewOperation
    | ASTNestViewOperation
    | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function RenameDialog({
  rootQuery,
  view,
  target,
  open,
  setOpen,
}: RenameDialogProps) {
  const [name, setName] = useState('');
  const {setQuery} = useContext(QueryEditorContext);

  useEffect(() => {
    if (target) {
      setName(target.name);
    }
  }, [target, open]);

  if (!target) {
    return null;
  }

  const onRename = () => {
    target.name = name;
    setQuery?.(rootQuery?.build());
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
            {...stylex.props(dialogStyles.content, fontStyles.body)}
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

const dialogStyles = stylex.create({
  displayNone: {
    display: 'none',
  },
  overlay: {
    background: 'rgba(0 0 0 / 0.0)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 100,
  },
  title: {
    fontSize: '16px',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 240,
    maxWidth: 280,
    gap: 8,
  },
  editor: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  editorRow: {
    display: 'flex',
    gap: 8,
  },
  editorCell: {
    flexGrow: 1,
  },
  input: {
    border: '1px solid #e0e0e0',
    color: 'rgb(95, 99, 104)',
    padding: '4px 8px 4px 8px',
    borderRadius: 5,
  },
});
