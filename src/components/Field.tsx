/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {ASTField, ASTQuery} from '@malloydata/malloy-query-builder';
import {Expression} from './Expression';
import {styles} from './styles';
import ClearIcon from '../assets/refinements/clear.svg?react';

export interface FieldProps {
  rootQuery: ASTQuery;
  field: ASTField;
  onDelete: (field: ASTField) => void;
}

export function Field({rootQuery, field, onDelete}: FieldProps) {
  return (
    <div {...stylex.props(styles.token)}>
      <Expression rootQuery={rootQuery} expression={field.expression} />
      <ClearIcon
        {...stylex.props(styles.icon)}
        onClick={() => onDelete(field)}
      />
    </div>
  );
}
