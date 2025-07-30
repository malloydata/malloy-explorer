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
  ViewParent,
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
} from '../../utils/fields';
import {addGroupBy, getSegmentIfPresent} from '../../utils/segment';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface AddGroupByProps {
  view: ViewParent;
  search: string;
}

export function AddGroupBy({view, search}: AddGroupByProps) {
  const updateQuery = useUpdateQuery();
  const {fields} = getInputSchemaFromViewParent(view);
  const segment = getSegmentIfPresent(view);

  const filter = (
    _parent: ViewParent,
    field: Malloy.FieldInfo,
    path: string[]
  ) => {
    return (
      !segment?.hasField(field.name, path) && isNotAnnotatedFilteredField(field)
    );
  };

  return (
    <AddFieldItem
      label="Add group by"
      icon="groupBy"
      view={view}
      fields={fields}
      types={['dimension']}
      filter={filter}
      onAddOperation={(field, path) => {
        addGroupBy(view, field, path);
        updateQuery();
      }}
      search={search}
    />
  );
}
