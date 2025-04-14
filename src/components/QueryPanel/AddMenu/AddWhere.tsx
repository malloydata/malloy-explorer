/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {useContext} from 'react';
import {ASTQuery, ParsedFilter} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {AddFieldItem} from './AddFieldItem';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {useFilterModal} from '../../filters/hooks/useFilterModal';

export interface AddWhereProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddWhere({rootQuery, view}: AddWhereProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const {fields} = getInputSchemaFromViewParent(view);

  const {openFilterModal, FilterModal} = useFilterModal(
    (field: Malloy.FieldInfo, path: string[], filter: ParsedFilter) => {
      const segment = view.getOrAddDefaultSegment();
      if (field.kind === 'dimension') {
        segment.addWhere(field.name, path, filter);
      } else {
        segment.addHaving(field.name, path, filter);
      }
      setQuery?.(rootQuery.build());
    }
  );

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
          FILTERABLE_TYPES.has(field.type.kind)
        }
        onClick={(fieldInfo, path) => {
          if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
            openFilterModal({fieldInfo, path});
          }
        }}
      />
      <FilterModal />
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
