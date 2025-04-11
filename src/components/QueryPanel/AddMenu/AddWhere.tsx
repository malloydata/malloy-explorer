/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {AddFieldItem} from './AddFieldItem';

export interface AddWhereProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddWhere({rootQuery, segment}: AddWhereProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const {fields} = segment.getInputSchema();

  return (
    <AddFieldItem
      label="Add filter"
      icon="filter"
      segment={segment}
      fields={fields}
      types={['measure', 'dimension']}
      filter={(_segment, field) =>
        (field.kind === 'dimension' || field.kind === 'measure') &&
        FILTERABLE_TYPES.has(field.type.kind)
      }
      onClick={(field, path) => {
        if (field.kind === 'dimension' || field.kind === 'measure') {
          if (field.type.kind === 'string_type') {
            segment.addWhere(field.name, path, '-null');
          } else if (field.type.kind === 'boolean_type') {
            segment.addWhere(field.name, path, 'true');
          } else if (field.type.kind === 'number_type') {
            segment.addWhere(field.name, path, '0');
          } else if (field.type.kind === 'date_type') {
            segment.addWhere(field.name, path, 'today');
          } else if (field.type.kind === 'timestamp_type') {
            segment.addWhere(field.name, path, 'now');
          }
          setQuery?.(rootQuery.build());
        }
      }}
    />
  );
}

const FILTERABLE_TYPES = new Set([
  'string_type',
  'boolean_type',
  'number_type',
  'date_type',
  'timestamp_type',
]);
