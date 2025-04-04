/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useMemo} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
  ASTView,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {segmentNestNo} from '../../utils/segment';
import {AddFieldItem} from './AddFieldItem';
import {isIndexView} from '../../utils/fields';

export interface AddViewProps {
  rootQuery: ASTQuery;
  view: ASTQuery | ASTView;
  segment: ASTSegmentViewDefinition;
}

export function AddView({rootQuery, view, segment}: AddViewProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const allFields = segment.getInputSchema().fields;
  const fields = useMemo(
    () =>
      allFields.filter(field => field.kind === 'view' && !isIndexView(field)),
    [allFields]
  );

  return (
    <AddFieldItem
      label="Add view"
      icon="view"
      segment={segment}
      fields={fields}
      types={['view']}
      onClick={field => {
        if (view === rootQuery && rootQuery.isEmpty()) {
          rootQuery.setView(field.name);
        } else {
          const nestNo = segmentNestNo(segment, field.name);

          segment.addNest(
            field.name,
            nestNo > 1 ? `${field.name} ${nestNo}` : undefined
          );
        }
        setQuery?.(rootQuery.build());
      }}
    />
  );
}
