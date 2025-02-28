/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import LimitIcon from '../../assets/refinements/insert_limit.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Field} from '../Field';

export interface LimitOperationProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  limit: Malloy.ViewOperationWithLimit | undefined;
}

export function LimitOperation({
  source,
  query,
  path,
  limit,
}: LimitOperationProps) {
  if (!limit) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <LimitIcon {...stylex.props(styles.icon)} />
        limit:
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        <div {...stylex.props(styles.token)}>{limit.limit}</div>
      </div>
    </div>
  );
}
