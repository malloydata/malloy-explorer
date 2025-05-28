/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTDrillViewOperation,
  ASTFilterWithLiteralEquality,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {LiteralValue} from '../LiteralValue';
import {Token, TokenGroup} from '../../primitives';
import FieldToken from '../../FieldToken';
// import FieldToken from '../../FieldToken';

export interface DrillOperationsProps {
  rootQuery: ASTQuery;
  drills: ASTDrillViewOperation[];
}

export function DrillOperations({drills}: DrillOperationsProps) {
  if (!drills.length) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.title)}>drills</div>
      <div {...stylex.props(localStyles.content)}>
        {drills.map((drill, key) => (
          <TokenGroup
            key={key}
            color="cyan"
            customStyle={localStyles.tokenGroup}
          >
            <FieldToken field={drill.filter.fieldReference.getFieldInfo()} />
            <Token label={'='} />
            {drill.filter instanceof ASTFilterWithLiteralEquality ? (
              <LiteralValue value={drill.filter.value.node} />
            ) : (
              <Token label={drill.filter.filterString} />
            )}
          </TokenGroup>
        ))}
      </div>
    </div>
  );
}

const localStyles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  tokenGroup: {
    display: 'flex',
  },
});
