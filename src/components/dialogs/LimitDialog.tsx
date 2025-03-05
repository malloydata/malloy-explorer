/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import {dialogStyles} from './styles';
import {useContext, useState} from 'react';
import {QueryContext} from '../../contexts/QueryContext';
export interface LimitDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function LimitDialog({
  open,
  rootQuery,
  setOpen,
  segment,
}: LimitDialogProps) {
  const {setQuery} = useContext(QueryContext);
  const [value, setValue] = useState(10);
  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay {...stylex.props(dialogStyles.overlay)}>
          <DialogContent {...stylex.props(dialogStyles.content)}>
            <DialogTitle {...stylex.props(dialogStyles.title)}>
              Set Limit...
            </DialogTitle>
            <div {...stylex.props(dialogStyles.center)}>
              <input
                type="number"
                value={value}
                onChange={event => {
                  setValue(event.target.valueAsNumber);
                }}
              />
            </div>
            <div {...stylex.props(dialogStyles.footer)}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={() => {
                  segment.setLimit(value);
                  setQuery?.(rootQuery.build());
                  setOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
