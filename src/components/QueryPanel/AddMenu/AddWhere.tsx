/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {AddFieldItem} from './AddFieldItem';
import {
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';

export interface AddWhereProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddWhere({view}: AddWhereProps) {
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <>
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
            const segment = view.getOrAddDefaultSegment();
            if (field.kind === 'dimension') {
              segment.addWhere(field.name, path, filter);
            } else {
              segment.addHaving(field.name, path, filter);
            }
            setQuery?.(rootQuery?.build());
          }
        }}
        isFilterOperation={true}
      />
    </>
  );
}

const FILTERABLE_TYPES = new Set([
  'string_type',
  'boolean_type',
  'number_type',
  'date_type',
  'timestamp_type',
]);
