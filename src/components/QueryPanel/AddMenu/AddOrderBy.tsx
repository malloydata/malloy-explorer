/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useMemo} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  addOrderBy,
  getSegmentIfPresent,
  segmentHasOrderBy,
} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';
import {ViewParent} from '../../utils/fields';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface AddEmptyNestProps {
  view: ViewParent;
  search: string;
}

export function AddOrderBy({view, search}: AddEmptyNestProps) {
  const updateQuery = useUpdateQuery();
  const outputSchemaFields = view.getOutputSchema().fields;
  const segment = getSegmentIfPresent(view);

  const fields = useMemo(
    () =>
      outputSchemaFields
        .filter(field => field.kind === 'dimension')
        .filter(field => ORDERABLE_TYPES.includes(field.type.kind))
        .filter(field =>
          segment ? !segmentHasOrderBy(segment, field.name) : true
        ),
    [outputSchemaFields, segment]
  );

  return (
    <AddFieldItem
      label="Add order by"
      icon="orderBy"
      view={view}
      fields={fields}
      types={['dimension']}
      onAddOperation={field => {
        addOrderBy(view, field);
        updateQuery();
      }}
      disabledMessage="There must be at least one field in the output to order by."
      search={search}
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
