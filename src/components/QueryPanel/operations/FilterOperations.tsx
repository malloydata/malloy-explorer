/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useCallback, useContext} from 'react';
import {
  ASTQuery,
  ASTWhereViewOperation,
  ASTHavingViewOperation,
  ParsedFilter,
  ASTFilterWithFilterString,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Token} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {ClearButton} from './ClearButton';
import {ErrorElement} from '../../ErrorElement';
import {FilterPopover} from '../../filters/FilterPopover';
import {parsedToLabels} from '../../utils/filters';

export interface FilterOperationsProps {
  rootQuery: ASTQuery;
  filters: Array<ASTWhereViewOperation | ASTHavingViewOperation>;
}

export function FilterOperations({rootQuery, filters}: FilterOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.title)}>filter by</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {filters.map((filterOperation, key) => {
          return (
            <ErrorElement
              key={key}
              fallback={
                <div>
                  Invalid filter
                  <ClearButton
                    onClick={() => {
                      filterOperation.delete();
                      setQuery?.(rootQuery.build());
                    }}
                  />
                </div>
              }
            >
              <SingleFilterOperation
                filterOperation={filterOperation}
                rootQuery={rootQuery}
              />
            </ErrorElement>
          );
        })}
      </div>
    </div>
  );
}

interface SingleFilterOperationProps {
  rootQuery: ASTQuery;
  filterOperation: ASTWhereViewOperation | ASTHavingViewOperation;
}
function SingleFilterOperation({
  rootQuery,
  filterOperation,
}: SingleFilterOperationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const setFilter = useCallback(
    (filter: ParsedFilter) => {
      if (filterOperation.filter instanceof ASTFilterWithFilterString) {
        filterOperation.filter.setFilter(filter);
      }
      setQuery?.(rootQuery.build());
    },
    [filterOperation.filter, rootQuery, setQuery]
  );

  if (!(filterOperation.filter instanceof ASTFilterWithFilterString)) {
    return null;
  }

  const {fieldReference, filterString} = filterOperation.filter;
  const filter = filterOperation.filter.getFilter();
  const fieldInfo = fieldReference.getFieldInfo();
  if (fieldInfo.kind !== 'dimension' && fieldInfo.kind !== 'measure') {
    throw new Error(`Invalid filter field kind: ${fieldInfo.kind}`);
  }

  const {op, value} = parsedToLabels(filter, filterString);

  const label = `${fieldInfo.name} ${op} ${value}`;

  return (
    <div {...stylex.props(hoverStyles.main)}>
      <FilterPopover
        fieldInfo={fieldInfo}
        path={fieldReference.path ?? []}
        filter={filter}
        setFilter={setFilter}
        trigger={<Token icon="filter" color="cyan" label={label} />}
        layoutProps={{align: 'start', side: 'bottom', sideOffset: 1}}
      />
      <div {...stylex.props(hoverStyles.hoverActions)}>
        <ClearButton
          onClick={() => {
            filterOperation.delete();
            setQuery?.(rootQuery.build());
          }}
        />
      </div>
    </div>
  );
}
