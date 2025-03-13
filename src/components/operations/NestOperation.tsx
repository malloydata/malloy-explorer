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
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Label} from '../Label';
import {View} from '../QueryPanel/View';
import NestIcon from '../../assets/refinements/insert_nest.svg?react';

export interface NestOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  nests: ASTNestViewOperation[];
}

const viewStyles = stylex.create({
  indent: {
    marginLeft: 12,
    marginRight: 6,
    marginTop: 8,
    width: 'calc(100% - 18px)',
  },
});

export function NestOperations({rootQuery, nests}: NestOperationsProps) {
  if (nests.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.tokenContainer)}>
        {nests.map((nest, key) => (
          <div key={key} {...stylex.props(viewStyles.indent)}>
            <div {...stylex.props(styles.queryCard)}>
              <div {...stylex.props(styles.queryHeader)}>
                <div {...stylex.props(styles.labelWithIcon)}>
                  <NestIcon {...stylex.props(styles.icon)} />
                  <Label>{nest.name ?? 'nest'}</Label>
                </div>
              </div>
              <View rootQuery={rootQuery} view={nest.view} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
