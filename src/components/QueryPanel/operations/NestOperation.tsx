/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import {ASTNestViewOperation} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {View} from '../View';
import {Button, DropdownMenu, DropdownMenuItem} from '../../primitives';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import CollapsiblePanel from '../../primitives/CollapsiblePanel';
import {AddMenu} from '../AddMenu/AddMenu';
import {tagToVisualization} from '../../utils/icon';
import {RenameDialog} from './RenameDialog';
import {ViewParent} from '../../utils/fields';
import {useQueryFocus} from '../../MalloyQueryFocusProvider';
import {NestViewPathContext} from '../../contexts/NestViewPathContext';
import {FocusableView} from '../FocusableView';

export interface NestOperationsProps {
  view: ViewParent;
  nests: ASTNestViewOperation[];
}

export function NestOperations({view, nests}: NestOperationsProps) {
  if (nests.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.tokenContainer)}>
      {nests.map(nest => (
        <NestOperation key={nest.name} view={view} nest={nest} />
      ))}
    </div>
  );
}

export interface NestOperationProps {
  view: ViewParent;
  nest: ASTNestViewOperation;
}

export function NestOperation({view, nest}: NestOperationProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);

  const [renameOpen, setRenameOpen] = useState(false);

  const parentNestViewPath = useContext(NestViewPathContext);

  const {focusNestView, isNestViewFocused} = useQueryFocus();

  const getControls = (nest: ASTNestViewOperation) => (
    <>
      <DropdownMenu
        trigger={
          <Button
            variant="flat"
            icon="meatballs"
            size="compact"
            tooltip="More Actions"
          />
        }
      >
        <DropdownMenuItem
          icon="clear"
          label="Delete Query"
          onClick={() => {
            focusNestView([...parentNestViewPath]);
            nest.delete();
            setQuery?.(rootQuery?.build());
          }}
        />
        <DropdownMenuItem
          label="Rename"
          onClick={() => {
            setRenameOpen(true);
          }}
        />
      </DropdownMenu>
      <AddMenu view={nest.view} />
    </>
  );

  return (
    <FocusableView nest={nest}>
      <div key={nest.name} {...stylex.props(viewStyles.indent)}>
        <CollapsiblePanel
          title={nest.name}
          icon={tagToVisualization(nest.view.getTag())}
          defaultOpen={true}
          controls={getControls(nest)}
          collapsedControls={getControls(nest)}
          isFocused={isNestViewFocused([...parentNestViewPath, nest.name])}
        >
          <View view={nest.view} />
        </CollapsiblePanel>
        <RenameDialog
          view={view}
          target={nest}
          open={renameOpen}
          setOpen={setRenameOpen}
        />
      </div>
    </FocusableView>
  );
}

const viewStyles = stylex.create({
  indent: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    width: '100%',
  },
});
