/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Reference} from './Reference';
import {Where} from './Where';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import {findField} from '../tools/source';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import {RawReference} from './RawReference';

const fieldStyles = stylex.create({
  container: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: '2px 12px 2px 6px',
  },
});

export interface FieldProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
  field: Malloy.Field;
}

export function Field({source, query, path, field}: FieldProps) {
  switch (field.expression.kind) {
    case 'field_reference':
      return (
        <Reference
          source={source}
          query={query}
          path={path}
          reference={field.expression}
        />
      );
    case 'time_truncation':
      return (
        <div {...stylex.props(styles.tokenContainer)}>
          <RawReference
            source={source}
            query={query}
            path={path}
            reference={field.expression.field_reference}
          />
          .{field.expression.truncation}
        </div>
      );
    case 'filtered_field':
      return (
        <div {...stylex.props(styles.tokenContainer)}>
          <RawReference
            source={source}
            query={query}
            path={path}
            reference={field.expression.field_reference}
          />
          <Where
            source={source}
            query={query}
            path={path}
            where={field.expression.where}
          />
        </div>
      );
  }
}
