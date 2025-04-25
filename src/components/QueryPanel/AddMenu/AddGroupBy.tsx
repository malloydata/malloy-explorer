/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {addGroupBy} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';
import {
  viewParentDoesNotHaveField,
  ViewParent,
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
} from '../../utils/fields';

export interface AddGroupByProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddGroupBy({rootQuery, view}: AddGroupByProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <AddFieldItem
      label="Add group by"
      icon="groupBy"
      view={view}
      fields={fields}
      types={['dimension']}
      filter={(parent, field, path) =>
        viewParentDoesNotHaveField(parent, field, path) &&
        isNotAnnotatedFilteredField(field)
      }
      onAddOperation={(field, path) => {
        const segment = view.getOrAddDefaultSegment();
        addGroupBy(rootQuery, segment, field, path, setQuery);
      }}
    />
  );
}
