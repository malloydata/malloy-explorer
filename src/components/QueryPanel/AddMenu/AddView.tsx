/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useMemo} from 'react';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {addNest} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';
import {
  getInputSchemaFromViewParent,
  isIndexView,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';

export interface AddViewProps {
  view: ViewParent;
  search: string;
}

export function AddView({view, search}: AddViewProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);
  const allFields = getInputSchemaFromViewParent(view).fields;
  const fields = useMemo(
    () =>
      allFields.filter(field => field.kind === 'view' && !isIndexView(field)),
    [allFields]
  );

  if (!rootQuery) {
    return null;
  }

  return (
    <AddFieldItem
      label="Add view"
      icon="view"
      view={view}
      fields={fields}
      types={['view']}
      filter={(_, field) => isNotAnnotatedFilteredField(field)}
      onAddOperation={field => {
        if (rootQuery.isEmpty()) {
          rootQuery.setView(field.name);
        } else {
          addNest(view, field);
        }
        setQuery?.(rootQuery?.build());
      }}
      search={search}
    />
  );
}
