/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {AddFieldItem} from './AddFieldItem';
import {
  getInputSchemaFromViewParent,
  ViewParent,
  isNotAnnotatedFilteredField,
} from '../../utils/fields';
import {addAggregate, getSegmentIfPresent} from '../../utils/segment';

export interface AddAggregateProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  search: string;
}

export function AddAggregate({rootQuery, view, search}: AddAggregateProps) {
  const {setQuery} = useContext(QueryEditorContext);
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
      label="Add aggregate"
      icon="aggregate"
      view={view}
      fields={fields}
      types={['measure']}
      filter={filter}
      onAddOperation={(field, path) => {
        addAggregate(view, field, path);
        setQuery?.(rootQuery.build());
      }}
      search={search}
    />
  );
}
