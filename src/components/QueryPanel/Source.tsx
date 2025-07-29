/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTArrowQueryDefinition,
  ASTQueryDefinition,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles as componentStyles} from '../styles';
import {Icon} from '../primitives';

/**
 * Source
 */
export interface SourceProps {
  definition: ASTQueryDefinition;
}

export function Source({definition}: SourceProps) {
  if (definition instanceof ASTArrowQueryDefinition) {
    return (
      <div {...stylex.props(componentStyles.queryCard, styles.content)}>
        <div {...stylex.props(componentStyles.labelWithIcon)}>
          <Icon name="database" />
          <div {...stylex.props(styles.label)}>
            {definition.source.getSourceInfo().name}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

const styles = stylex.create({
  content: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gap: '4px',
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  },
});
