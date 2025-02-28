/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import NestIcon from '../../assets/refinements/insert_nest.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {View} from '../View';

export interface NestOperationsProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  nests: Malloy.ViewOperationWithNest[];
}

export function NestOperations({
  source,
  query,
  path,
  nests,
}: NestOperationsProps) {
  if (nests.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <NestIcon {...stylex.props(styles.icon)} />
        nest:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        {nests.map((nest, key) => (
          <View
            key={key}
            source={source}
            query={query}
            path={[...path, nest.name ?? `${key}`]}
            view={nest.view}
          />
        ))}
      </div>
    </div>
  );
}
