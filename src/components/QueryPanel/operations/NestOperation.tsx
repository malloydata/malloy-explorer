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
import {useActiveQueryPanel} from '../../MalloyActiveQueryPanelProvider';

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

  const {
    activeNestQueryPanel,
    onActiveNestQueryPanelChange,
    onActiveNestViewChange,
  } = useActiveQueryPanel();

  const [renameOpen, setRenameOpen] = useState(false);

  const panelRef = React.useRef<HTMLDivElement>(null);

  const isCurrentNestQueryPanelFocused =
    activeNestQueryPanel !== null && panelRef.current == activeNestQueryPanel;

  React.useEffect(() => {
    if (isCurrentNestQueryPanelFocused) {
      onActiveNestViewChange?.(nest.view);
    }
  }, [nest, isCurrentNestQueryPanelFocused, onActiveNestViewChange]);

  const focusCurrentNestQueryPanel = () => {
    onActiveNestQueryPanelChange?.(panelRef.current);
    onActiveNestViewChange?.(nest.view);
  };

  const focusParentQueryPanel = () => {
    const currentPanel = panelRef.current;
    const parent = findParentNestQueryPanel(currentPanel);
    onActiveNestQueryPanelChange?.(parent);
    if (parent === null) {
      onActiveNestViewChange?.(null);
    }
  };

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
            focusParentQueryPanel();
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
      <div
        ref={panelRef}
        onPointerDownCapture={focusCurrentNestQueryPanel}
        data-nest-panel
      >
        <CollapsiblePanel
          title={nest.name}
          icon={viewToVisualizationIcon(nest.view)}
          defaultOpen={true}
          controls={getControls(nest)}
          collapsedControls={getControls(nest)}
          isFocused={isCurrentNestQueryPanelFocused}
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

function findParentNestQueryPanel(element: HTMLElement | null) {
  if (!element || !element.parentElement) return null;
  const parentElement = element.parentElement;
  if (parentElement.dataset.nestPanel !== undefined) return parentElement;
  return findParentNestQueryPanel(parentElement);
}
