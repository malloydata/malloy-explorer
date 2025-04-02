/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles as componentStyles} from '../styles';
import {Button, Icon} from '../primitives';
import {ExplorerPanelsContext} from '../../contexts/ExplorerPanelsContext';
import {useContext} from 'react';

/**
 * Source
 */
export interface SourceProps {
  rootQuery: ASTQuery;
}

export function Source({rootQuery}: SourceProps) {
  const {isSourcePanelOpen, setIsSourcePanelOpen} = useContext(
    ExplorerPanelsContext
  );
  console.info(
    'xxx',
    isSourcePanelOpen,
    setIsSourcePanelOpen,
    !(isSourcePanelOpen && setIsSourcePanelOpen)
  );
  if (
    !(isSourcePanelOpen && setIsSourcePanelOpen) &&
    rootQuery.definition instanceof ASTArrowQueryDefinition
  ) {
    return (
      <div {...stylex.props(componentStyles.queryCard, styles.flex)}>
        <div {...stylex.props(componentStyles.labelWithIcon)}>
          <Icon name="database" />
          {
            rootQuery.definition.as
              .ArrowQueryDefinition()
              .source.as.ReferenceQueryArrowSource().name
          }
        </div>
        {setIsSourcePanelOpen && (
          <Button
            variant="flat"
            onClick={() => setIsSourcePanelOpen(true)}
            label="Open data panel"
          />
        )}
      </div>
    );
  }
  return null;
}

const styles = stylex.create({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
