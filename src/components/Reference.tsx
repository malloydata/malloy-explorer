/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery, ASTReference} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {RawReference} from './RawReference';
import {styles} from './styles';

export interface ReferenceProps {
  rootQuery: ASTQuery;
  reference: ASTReference;
}

export function Reference({rootQuery, reference}: ReferenceProps) {
  return (
    <div {...stylex.props(styles.token)}>
      <RawReference rootQuery={rootQuery} reference={reference} />
    </div>
  );
}
