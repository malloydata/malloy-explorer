/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTExpression,
  ASTFilteredFieldExpression,
  ASTQuery,
  ASTReference,
  ASTReferenceExpression,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {RawReference} from './RawReference';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import {Where} from './Where';

export interface ExpressionProps {
  astQuery: ASTQuery;
  expression: ASTExpression;
}

export function Expression({astQuery, expression}: ExpressionProps) {
  return (
    <div>
      {expression instanceof ASTReferenceExpression ? (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} /> {expression.name}
        </div>
      ) : expression instanceof ASTFilteredFieldExpression ? (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} />
          {expression.name}
          <Where astQuery={astQuery} where={expression.where} />
        </div>
      ) : (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} />
          {expression.name}.{expression.truncation}
        </div>
      )}
    </div>
  );
}
