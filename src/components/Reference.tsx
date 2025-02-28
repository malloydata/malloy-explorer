/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {RawReference} from './RawReference';
import {styles} from './styles';

export interface ReferenceProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  reference: Malloy.Reference;
}

export function Reference({source, query, path, reference}: ReferenceProps) {
  return (
    <div {...stylex.props(styles.token)}>
      <RawReference
        source={source}
        query={query}
        path={path}
        reference={reference}
      />
    </div>
  );
}
