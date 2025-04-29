/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import {ASTNestViewOperation, ASTQuery} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {View} from '../View';
import {Button, DropdownMenu, DropdownMenuItem} from '../../primitives';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import CollapsiblePanel from '../../primitives/CollapsiblePanel';
import {AddMenu} from '../AddMenu/AddMenu';
import {viewToVisualizationIcon} from '../../utils/icon';
import {RenameDialog} from './RenameDialog';
import {ViewParent} from '../../utils/fields';

export interface NestOperationsProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  nests: ASTNestViewOperation[];
}

export function NestOperations({rootQuery, view, nests}: NestOperationsProps) {
  if (nests.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.tokenContainer)}>
      {nests.map(nest => (
        <NestOperation
          key={nest.name}
          rootQuery={rootQuery}
          view={view}
          nest={nest}
        />
      ))}
    </div>
  );
}

export interface NestOperationProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  nest: ASTNestViewOperation;
}

export function NestOperation({rootQuery, view, nest}: NestOperationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const [renameOpen, setRenameOpen] = useState(false);

  // New blank nested queries should default to their open mode to make
  // it simpler to add content into.
  const defaultOpen =
    nest.view.definition.node.kind === 'segment' &&
    nest.view.definition.node.operations.length === 0;

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
            nest.delete();
            setQuery?.(rootQuery.build());
          }}
        />
        <DropdownMenuItem
          label="Rename"
          onClick={() => {
            setRenameOpen(true);
          }}
        />
      </DropdownMenu>
      <AddMenu rootQuery={rootQuery} view={nest.view} />
    </>
  );

  return (
    <div key={nest.name} {...stylex.props(viewStyles.indent)}>
      <CollapsiblePanel
        title={nest.name}
        icon={viewToVisualizationIcon(nest.view)}
        defaultOpen={defaultOpen}
        controls={getControls(nest)}
        collapsedControls={getControls(nest)}
      >
        <View rootQuery={rootQuery} view={nest.view} />
      </CollapsiblePanel>
      <RenameDialog
        rootQuery={rootQuery}
        view={view}
        target={nest}
        open={renameOpen}
        setOpen={setRenameOpen}
      />
    </div>
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
