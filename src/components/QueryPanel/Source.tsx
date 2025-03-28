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
import {styles} from '../styles';
import {Icon} from '../primitives';

/**
 * Source
 */
export interface SourceProps {
  rootQuery: ASTQuery;
}

export function Source({rootQuery}: SourceProps) {
  if (rootQuery.definition instanceof ASTArrowQueryDefinition) {
    return (
      <div {...stylex.props(styles.queryCard)}>
        <div {...stylex.props(styles.labelWithIcon)}>
          <Icon name="database" />
          {
            rootQuery.definition.as
              .ArrowQueryDefinition()
              .source.as.ReferenceQueryArrowSource().name
          }
        </div>
      </div>
    );
  }
  return null;
}
