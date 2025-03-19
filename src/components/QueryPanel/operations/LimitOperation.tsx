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
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Token} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {ClearButton} from './ClearButton';

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
      <div {...stylex.props(styles.title)}>limit</div>
      <div {...stylex.props(hoverStyles.main)}>
        <Token label={`${limit.limit}`} onClick={() => {}} />
        <div {...stylex.props(hoverStyles.hoverActions)}>
          <ClearButton
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
