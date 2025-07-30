/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQueryDefinition,
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
import {tagToVisualization} from '../utils/icon';
import {textColors} from '../primitives/colors.stylex';
import {useQueryFocus} from '../MalloyQueryFocusProvider';
import {FocusableView} from './FocusableView';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {useUpdateQuery} from '../../hooks/useQueryUpdate';

export interface QueryProps {
  definition: ASTQueryDefinition;
  setQuery?: (query: Malloy.Query | undefined) => void;
}

export function Query({definition}: QueryProps) {
  const {focusMainView, isMainViewFocused} = useQueryFocus();
  const {rootQuery, setQuery} = useContext(QueryEditorContext);
  const updateQuery = useUpdateQuery();

  if (!rootQuery) {
    return null;
  }

  const isEmpty = rootQuery.isEmpty();

  return (
    <FocusableView>
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
                      setQuery(undefined);
                    }}
                    disabled={isEmpty}
                  />
                  <DropdownMenuItem
                    icon="nest"
                    label="Nest query"
                    onClick={() => {
                      if (definition instanceof ASTArrowQueryDefinition) {
                        definition.view.convertToNest('Nest');
                      }

                      updateQuery();
                    }}
                    disabled={
                      isEmpty ||
                      !(definition instanceof ASTArrowQueryDefinition)
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </DropdownMenu>
            {definition instanceof ASTArrowQueryDefinition ? (
              <AddMenu view={definition} />
            ) : null}
          </>
        }
        collapsedControls={
          <Icon name={tagToVisualization(rootQuery.getTag())} />
        }
      >
        {definition instanceof ASTArrowQueryDefinition ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            {!isEmpty && <Visualization view={rootQuery} />}
            <ViewDefinition view={definition} viewDef={definition.view} />
          </div>
        ) : null}
        {isEmpty ? (
          <div {...stylex.props(queryStyles.emptyQuery)}>
            <div {...stylex.props(queryStyles.cta)}>
              <div>Click</div>
              <Icon name="insert" color="disabled" />
              <div>to get started</div>
            </div>
          </div>
        ) : null}
      </CollapsiblePanel>
    </FocusableView>
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
