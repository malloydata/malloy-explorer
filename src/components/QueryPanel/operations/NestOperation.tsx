/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTNestViewOperation, ASTQuery} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {View} from '../View';
import {Button, DropdownMenu, DropdownMenuItem} from '../../primitives';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {useContext} from 'react';
import CollapsiblePanel from '../../primitives/CollapsiblePanel';
import {AddMenu} from '../AddMenu/AddMenu';
import {VisualizationIcon} from '../VisualizationIcon';

export interface NestOperationsProps {
  rootQuery: ASTQuery;
  nests: ASTNestViewOperation[];
}

const viewStyles = stylex.create({
  indent: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    width: '100%',
  },
});

export function NestOperations({rootQuery, nests}: NestOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (nests.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.tokenContainer)}>
      {nests.map(nest => {
        // New blank nested queries should default to their open mode to make
        // it simpler to add content into.
        const defaultOpen =
          nest.view.definition.node.kind === 'segment' &&
          nest.view.definition.node.operations.length === 0;

        return (
          <div key={nest.name} {...stylex.props(viewStyles.indent)}>
            <CollapsiblePanel
              title={nest.name}
              icon="nest"
              defaultOpen={defaultOpen}
              controls={
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
                  </DropdownMenu>
                  <AddMenu rootQuery={rootQuery} view={nest.view} />
                </>
              }
              collapsedControls={<VisualizationIcon view={nest.view} />}
            >
              <View rootQuery={rootQuery} view={nest.view} />
            </CollapsiblePanel>
          </div>
        );
      })}
    </div>
  );
}
