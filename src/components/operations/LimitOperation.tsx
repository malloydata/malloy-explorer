/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTLimitViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import LimitIcon from '../../assets/refinements/insert_limit.svg?react';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {Label} from '../Label';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import ClearIcon from '../../assets/refinements/clear.svg?react';

export interface LimitOperationProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  limit: ASTLimitViewOperation | undefined;
}

export function LimitOperation({rootQuery, limit}: LimitOperationProps) {
  const {setQuery} = useContext(QueryEditorContext);
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
        <div {...stylex.props(styles.token)}>
          <Label>{limit.limit}</Label>
          <ClearIcon
            {...stylex.props(styles.icon)}
            onClick={() => {
              limit.delete();
              setQuery?.(rootQuery.build());
            }}
          />
        </div>
      </div>
    </div>
  );
}
