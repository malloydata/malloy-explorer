/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import {findField} from '../tools/source';
import QueryIcon from '../assets/types/type-icon-query.svg?react';

export interface RawReferenceProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  reference: Malloy.Reference;
}

export function RawReference({source, reference}: RawReferenceProps) {
  const fieldInfo = findField(source, reference.name);
  if (fieldInfo) {
    if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={fieldInfo.type} /> {fieldInfo.name}
        </div>
      );
    } else if (fieldInfo.kind === 'join') {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>{fieldInfo.name}</div>
      );
    } else {
      return (
        <div {...stylex.props(styles.labelWithIcon)}>
          <QueryIcon {...stylex.props(styles.icon)} />
          {fieldInfo.name}
        </div>
      );
    }
  }
  return <div>Bad field reference {reference.name}</div>;
}
