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
        style={styles.noBackground}
      />
    );
  } else if (field.kind === 'dimension') {
    // TODO: dimension_filled icon?
    return (
      <Badge
        label="dimension"
        icon="dimension"
        color="cyan"
        style={styles.noBackground}
      />
    );
  } else if (field.kind === 'measure') {
    // TODO: measure_filled icon?
    return (
      <Badge
        label="measure"
        icon="measure"
        color="green"
        style={styles.noBackground}
      />
    );
  } else if (field.kind === 'join') {
    // TODO: should we use different icons for different types of joins?
    return (
      <Badge
        label="join"
        icon="many_to_one"
        color="gray"
        style={styles.noBackground}
      />
    );
  }
}

const styles = stylex.create({
  noBackground: {
    backgroundColor: 'transparent',
  },
});
