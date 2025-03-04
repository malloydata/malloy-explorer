/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTLimitViewOperation,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import LimitIcon from '../../assets/refinements/insert_limit.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Field} from '../Field';

export interface LimitOperationProps {
  astQuery: ASTQuery;
  limit: ASTLimitViewOperation | undefined;
}

export function LimitOperation({astQuery, limit}: LimitOperationProps) {
  if (!limit) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <LimitIcon {...stylex.props(styles.icon)} />
        <div {...stylex.props(styles.title)}>limit:</div>
      </div>
      <div {...stylex.props(styles.tokenContainer)}>
        <div {...stylex.props(styles.token)}>{limit.limit}</div>
      </div>
    </div>
  );
}
