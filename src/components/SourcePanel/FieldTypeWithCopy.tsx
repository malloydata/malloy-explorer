/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {FieldHoverCard} from '../FieldHoverCard';

export interface FieldTokenWithCopyProps {
  field: Malloy.FieldInfo;
  path: string[];
  onCopy: (field: Malloy.FieldInfo, path: string[]) => void;
}

export function FieldTokenWithCopy({
  field,
  path,
  onCopy,
}: FieldTokenWithCopyProps) {
  return (
    <FieldToken
      field={field}
      tooltip={<FieldHoverCard field={field} path={path} />}
      tooltipProps={{
        side: 'right',
        align: 'start',
        alignOffset: 28,
      }}
      onClick={() => onCopy(field, path)}
    />
  );
}
