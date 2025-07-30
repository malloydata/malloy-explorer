/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTLimitViewOperation} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {EditableToken} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {ClearButton} from './ClearButton';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface LimitOperationProps {
  limit: ASTLimitViewOperation | undefined;
}

export function LimitOperation({limit}: LimitOperationProps) {
  const updateQuery = useUpdateQuery();
  if (!limit) {
    return null;
  }
  return (
    <div>
      <div {...stylex.props(styles.title)}>limit</div>
      <div {...stylex.props(hoverStyles.main)}>
        <EditableToken
          type="number"
          value={limit.limit}
          onChange={value => {
            limit.limit = value;
            updateQuery();
          }}
          errorMessage={limit.limit < 0 ? 'Limit must be positive' : undefined}
        />
        <div {...stylex.props(hoverStyles.hoverActions)}>
          <ClearButton
            onClick={() => {
              limit.delete();
              updateQuery();
            }}
          />
        </div>
      </div>
    </div>
  );
}
