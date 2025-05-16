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
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';

import {ViewDefinition} from './ViewDefinition';
import {Visualization} from './Visualization';
import {AddMenu} from './AddMenu/AddMenu';
import {
  Button,
  CollapsiblePanel,
  DropdownMenu,
  DropdownMenuItem,
  Icon,
} from '../primitives';
import stylex from '@stylexjs/stylex';
import {viewToVisualizationIcon} from '../utils/icon';
import {textColors} from '../primitives/colors.stylex';
import {useQueryFocus} from '../MalloyActiveNestViewProvider';

export interface QueryProps {
  rootQuery: ASTQuery;
  query: ASTQuery;
  setQuery?: (query: Malloy.Query | undefined) => void;
}

export function Query({rootQuery, query, setQuery}: QueryProps) {
  const {focusMainView, isMainViewFocused} = useQueryFocus();

  const canEditViz =
    query.definition instanceof ASTArrowQueryDefinition &&
    query.definition.view instanceof ASTSegmentViewDefinition;

  return (
    <div onPointerDownCapture={focusMainView}>
      <CollapsiblePanel
        title="Main query"
        isFocused={isMainViewFocused}
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
                <>
                  <DropdownMenuItem
                    icon="clear"
                    label="Clear query"
                    onClick={() => {
                      focusMainView();
                      setQuery?.(undefined);
                    }}
                    disabled={rootQuery.isEmpty()}
                  />
                  <DropdownMenuItem
                    icon="nest"
                    label="Nest query"
                    onClick={() => {
                      if (
                        rootQuery.definition instanceof ASTArrowQueryDefinition
                      ) {
                        rootQuery.definition.view.convertToNest('Nest');
                      }

                      setQuery?.(rootQuery.build());
                    }}
                    disabled={
                      rootQuery.isEmpty() ||
                      !(rootQuery.definition instanceof ASTArrowQueryDefinition)
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </DropdownMenu>
            {query.definition instanceof ASTArrowQueryDefinition ? (
              <AddMenu rootQuery={rootQuery} view={query.definition} />
            ) : null}
          </>
        }
        collapsedControls={<Icon name={viewToVisualizationIcon(query)} />}
      >
        {query.definition instanceof ASTArrowQueryDefinition ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            {!query.isEmpty() && canEditViz && (
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
              <Icon name="insert" color="disabled" />
              <div>to get started</div>
            </div>
          </div>
        ) : null}
      </CollapsiblePanel>
    </div>
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
    color: textColors.disabled,
  },
});
