/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';

import {ViewDefinition} from './ViewDefinition';
import {Visualization} from './Visualization';
import CollapsiblePanel from '../primitives/CollapsiblePanel';
import {AddMenu} from './AddMenu/AddMenu';
import {Button, DropdownMenu, DropdownMenuItem, Icon} from '../primitives';
import stylex from '@stylexjs/stylex';
import {VisualizationIcon} from './VisualizationIcon';

export interface QueryProps {
  rootQuery: ASTQuery;
  query: ASTQuery;
  setQuery?: (query: Malloy.Query | undefined) => void;
}

export function Query({rootQuery, query, setQuery}: QueryProps) {
  return (
    <CollapsiblePanel
      title="Main query"
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
            {setQuery ? (
              <DropdownMenuItem
                icon="clear"
                label="Clear query"
                onClick={() => {
                  setQuery?.(undefined);
                }}
                disabled={rootQuery.isEmpty()}
              />
            ) : (
              <></>
            )}
          </DropdownMenu>
          {query.definition instanceof ASTArrowQueryDefinition ? (
            <AddMenu rootQuery={rootQuery} view={query.definition} />
          ) : null}
        </>
      }
      collapsedControls={<VisualizationIcon view={query} />}
    >
      {query.definition instanceof ASTArrowQueryDefinition ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {!query.isEmpty() && (
            <Visualization rootQuery={rootQuery} view={query} />
          )}
          <ViewDefinition
            rootQuery={rootQuery}
            view={query.definition}
            viewDef={query.definition.view}
          />
        </div>
      ) : null}
      {query.isEmpty() ? (
        <div {...stylex.props(queryStyles.emptyQuery)}>
          <div {...stylex.props(queryStyles.cta)}>
            <div>Click</div>
            <Icon name="insert" />
            <div>to get started</div>
          </div>
        </div>
      ) : null}
    </CollapsiblePanel>
  );
}

const queryStyles = stylex.create({
  emptyQuery: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  cta: {
    display: 'flex',
    alignItems: 'center',
  },
});
