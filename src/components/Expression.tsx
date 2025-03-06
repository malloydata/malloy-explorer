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
  ASTReferenceExpression,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import {Where} from './Where';
import {Label} from './Label';

export interface ExpressionProps {
  rootQuery: ASTQuery;
  expression: ASTExpression;
}

export function Expression({rootQuery, expression}: ExpressionProps) {
  return (
    <div>
      {expression instanceof ASTReferenceExpression ? (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} />
          <Label>{expression.name}</Label>
        </div>
      ) : expression instanceof ASTFilteredFieldExpression ? (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} />
          <Label>
            {expression.name}
            <Where rootQuery={rootQuery} where={expression.where} />
          </Label>
        </div>
      ) : (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={expression.fieldType} />
          <Label>
            {expression.name}.{expression.truncation}
          </Label>
        </div>
      )}
    </div>
  );
}
