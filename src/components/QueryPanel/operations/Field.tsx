/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {
  ASTExpression,
  ASTField,
  ASTFilteredFieldExpression,
  ASTQuery,
  ASTReferenceExpression,
} from '@malloydata/malloy-query-builder';
import {Token} from '../../primitives';
import {styles} from '../../styles';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {ClearButton} from './ClearButton';

export interface FieldProps {
  rootQuery: ASTQuery;
  field: ASTField;
  type: 'dimension' | 'measure' | 'view';
  onDelete: (field: ASTField) => void;
}

function expressionTypeAndLabel(expression: ASTExpression) {
  if (expression instanceof ASTReferenceExpression) {
    return {
      fieldType: expression.fieldType,
      label: expression.name,
    };
  } else if (expression instanceof ASTFilteredFieldExpression) {
    return {
      fieldType: expression.fieldType,
      label: expression.name,
    };
  } else {
    return {
      fieldType: expression.fieldType,
      label: `${expression.name}.${expression.truncation}`,
    };
  }
}

export function Field({field, onDelete, type}: FieldProps) {
  const {fieldType, label} = expressionTypeAndLabel(field.expression);
  const color = fieldKindToColor(type);
  const icon = atomicTypeToIcon(fieldType.kind);
  return (
    <div {...stylex.props(styles.labelWithIcon)}>
      <Token label={label} icon={icon} onClick={() => {}} color={color} />
      <ClearButton onClick={() => onDelete(field)} />
    </div>
  );
}
