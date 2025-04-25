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
import {AddFieldItem} from './AddFieldItem';
import {
  getInputSchemaFromViewParent,
  viewParentDoesNotHaveField,
  ViewParent,
  isNotAnnotatedFilteredField,
} from '../../utils/fields';

export interface AddAggregateProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddAggregate({rootQuery, view}: AddAggregateProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const {fields} = getInputSchemaFromViewParent(view);

  return (
    <AddFieldItem
      label="Add aggregate"
      icon="aggregate"
      view={view}
      fields={fields}
      types={['measure']}
      filter={(parent, field, path) =>
        viewParentDoesNotHaveField(parent, field, path) &&
        isNotAnnotatedFilteredField(field)
      }
      onAddOperation={(field, path) => {
        const segment = view.getOrAddDefaultSegment();
        segment.addAggregate(field.name, path);
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
