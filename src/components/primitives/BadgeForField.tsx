/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import {FieldInfo} from '@malloydata/malloy-interfaces';

import Badge from './Badge';
import stylex from '@stylexjs/stylex';
import {fieldToIcon} from '../utils/icon';

interface BadgeForFieldProps {
  field: FieldInfo;
}
export default function BadgeForField({field}: BadgeForFieldProps) {
  if (field.kind === 'view') {
    return (
      <Badge
        label="view"
        icon="view_filled"
        color="purple"
        customStyle={styles.noBackground}
      />
    );
  } else if (field.kind === 'dimension') {
    // TODO: dimension_filled icon?
    return (
      <Badge
        label="dimension"
        icon={fieldToIcon(field)}
        color="cyan"
        customStyle={styles.noBackground}
      />
    );
  } else if (field.kind === 'measure') {
    // TODO: measure_filled icon?
    return (
      <Badge
        label="measure"
        icon={fieldToIcon(field)}
        color="green"
        customStyle={styles.noBackground}
      />
    );
  } else if (field.kind === 'join') {
    return (
      <Badge
        label="join"
        icon={fieldToIcon(field)}
        color="gray"
        customStyle={styles.noBackground}
      />
    );
  }
}

const styles = stylex.create({
  noBackground: {
    backgroundColor: 'transparent',
  },
});
