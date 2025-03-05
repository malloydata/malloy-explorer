/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTNestViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import NestIcon from '../../assets/refinements/insert_nest.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {View} from '../View';

export interface NestOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  nests: ASTNestViewOperation[];
}

export function NestOperations({rootQuery, nests}: NestOperationsProps) {
  if (nests.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <NestIcon {...stylex.props(styles.icon)} />
        <div {...stylex.props(styles.title)}>nest:</div>
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {nests.map((nest, key) => (
          <View key={key} rootQuery={rootQuery} view={nest.view} />
        ))}
      </div>
    </div>
  );
}
