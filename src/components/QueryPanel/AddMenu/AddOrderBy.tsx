/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useMemo} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {segmentHasOrderBy} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';

export interface AddEmptyNestProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddOrderBy({rootQuery, segment}: AddEmptyNestProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const outputSchemaFields = segment.getOutputSchema().fields;

  const fields = useMemo(
    () =>
      outputSchemaFields
        .filter(field => field.kind === 'dimension')
        .filter(field => ORDERABLE_TYPES.includes(field.type.kind))
        .filter(field => !segmentHasOrderBy(segment, field.name)),
    [outputSchemaFields, segment]
  );

  return (
    <AddFieldItem
      label="Add order by"
      icon="orderBy"
      segment={segment}
      fields={fields}
      types={['dimension']}
      onClick={field => {
        segment.addOrderBy(field.name, 'asc');
        setQuery?.(rootQuery.build());
      }}
      disabledMessage="There must be at least one field in the output to order by."
    />
  );
}

const ORDERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;
