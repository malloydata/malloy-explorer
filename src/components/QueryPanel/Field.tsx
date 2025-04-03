/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {IconType, Token} from '../primitives';
import {
  atomicTypeToIcon,
  fieldKindToColor,
  relationshipToIcon,
} from '../utils/icon';

export interface FieldProps {
  field: Malloy.FieldInfo;
  path?: string[];
}

export function Field({field}: FieldProps) {
  const color = fieldKindToColor(field.kind);

  let icon: IconType;
  switch (field.kind) {
    case 'view':
      icon = 'query';
      break;
    case 'dimension':
    case 'measure':
      icon = atomicTypeToIcon(field.type.kind);
      break;
    case 'join':
      icon = relationshipToIcon(field.relationship);
  }

  return (
    <Token label={field.name} icon={icon} onClick={() => {}} color={color} />
  );
}
