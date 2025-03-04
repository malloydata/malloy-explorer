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

const fieldStyles = stylex.create({
  container: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
  },
});

export interface FieldProps {
  astQuery: ASTQuery;
  field: ASTField;
}

export function Field({astQuery, field}: FieldProps) {
  return (
    <div {...stylex.props(styles.token)}>
      <Expression astQuery={astQuery} expression={field.expression} />
    </div>
  );
}
