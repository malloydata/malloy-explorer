/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {AddFieldItem} from './AddFieldItem';
import {
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';
import {addFilter} from '../../utils/segment';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface AddWhereProps {
  view: ViewParent;
  search: string;
}

export function AddWhere({view, search}: AddWhereProps) {
  const updateQuery = useUpdateQuery();

  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <AddFieldItem
      label="Add filter"
      icon="filter"
      view={view}
      fields={fields}
      types={['measure', 'dimension']}
      filter={(_segment, field) =>
        (field.kind === 'dimension' || field.kind === 'measure') &&
        FILTERABLE_TYPES.has(field.type.kind) &&
        isNotAnnotatedFilteredField(field)
      }
      onAddOperation={(field, path, filter) => {
        if (
          filter &&
          (field.kind === 'dimension' || field.kind === 'measure')
        ) {
          addFilter(view, field, path, filter);
          updateQuery();
        }
      }}
      isFilterOperation={true}
      search={search}
    />
  );
}

const FILTERABLE_TYPES = new Set<Malloy.AtomicTypeType>([
  'string_type',
  'boolean_type',
  'number_type',
  'date_type',
  'timestamp_type',
  'timestamptz_type',
]);
