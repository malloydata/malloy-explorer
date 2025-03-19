/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTExpression,
  ASTField,
  ASTFilteredFieldExpression,
  ASTReferenceExpression,
} from '@malloydata/malloy-query-builder';
import {Token} from '../../primitives';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';

export interface FieldProps {
  field: ASTField;
  type: 'dimension' | 'measure' | 'view';
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

export function Field({field, type}: FieldProps) {
  const {fieldType, label} = expressionTypeAndLabel(field.expression);
  const color = fieldKindToColor(type);
  const icon = atomicTypeToIcon(fieldType.kind);
  return <Token label={label} icon={icon} onClick={() => {}} color={color} />;
}
