/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTFieldReference,
  ASTQuery,
  ASTReference,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import DatabaseIcon from '../assets/types/type-icon-database.svg?react';
import {Label} from './Label';

export interface RawReferenceProps {
  rootQuery: ASTQuery;
  reference: ASTReference;
}

export function RawReference({rootQuery, reference}: RawReferenceProps) {
  if (reference instanceof ASTFieldReference) {
    const fieldInfo = reference.getFieldInfo();
    if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={fieldInfo.type} />
          <Label>{fieldInfo.name}</Label>
        </div>
      );
    } else if (fieldInfo.kind === 'join') {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>
          <Label>{fieldInfo.name}</Label>
        </div>
      );
    } else {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          <Label>{fieldInfo.name}</Label>
        </div>
      );
    }
  } else {
    return (
      <div {...stylex.props(styles.labelWithIcon)}>
        <DatabaseIcon {...stylex.props(styles.icon)} />
        <Label>{reference.name}</Label>
      </div>
    );
  }
}
