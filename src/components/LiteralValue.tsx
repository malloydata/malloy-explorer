/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

export interface LiteralValueProps {
  value: Malloy.LiteralValue | undefined;
}

export function LiteralValue({value}: LiteralValueProps) {
  if (!value) {
    return '';
  }

  switch (value.kind) {
    case 'boolean_literal':
      return value.boolean_value;
    case 'date_literal':
      return value.date_value;
    case 'null_literal':
      return '∅';
    case 'number_literal':
      return value.number_value;
    case 'string_literal':
      return value.string_value;
    case 'timestamp_literal':
      return value.timestamp_value;
  }
}
