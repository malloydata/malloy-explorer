/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {AddFieldItem} from './AddFieldItem';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';

export interface AddWhereProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddWhere({view}: AddWhereProps) {
  const {openFilterModal} = useContext(QueryEditorContext);
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
          FILTERABLE_TYPES.has(field.type.kind)
        }
        onClick={(fieldInfo, path, event) => {
          const x = event.clientX;
          const y = event.clientY;
          if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
            openFilterModal({view, fieldInfo, path, x, y});
          }
        }}
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
