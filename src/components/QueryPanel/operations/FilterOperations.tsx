/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useCallback, useContext} from 'react';
import {
  ASTWhereViewOperation,
  ASTHavingViewOperation,
  ParsedFilter,
  ASTFilterWithFilterString,
  ASTReferenceExpression,
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
  filters: Array<ASTWhereViewOperation | ASTHavingViewOperation>;
}

export function FilterOperations({filters}: FilterOperationsProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);

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
                      setQuery?.(rootQuery?.build());
                    }}
                  />
                </div>
              }
            >
              <SingleFilterOperation filterOperation={filterOperation} />
            </ErrorElement>
          );
        })}
      </div>
    </div>
  );
}

interface SingleFilterOperationProps {
  filterOperation: ASTWhereViewOperation | ASTHavingViewOperation;
}
function SingleFilterOperation({filterOperation}: SingleFilterOperationProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);
  const setFilter = useCallback(
    (filter: ParsedFilter) => {
      if (filterOperation.filter instanceof ASTFilterWithFilterString) {
        filterOperation.filter.setFilter(filter);
      }
      setQuery?.(rootQuery?.build());
    },
    [filterOperation.filter, rootQuery, setQuery]
  );

  const {filter} = filterOperation;
  if (!(filter instanceof ASTFilterWithFilterString)) {
    return null;
  }

  const {expression, filterString} = filter;

  if (!(expression instanceof ASTReferenceExpression)) {
    return null;
  }

  const fieldInfo = filter.getFieldInfo();
  const parsedFilter = filter.getFilter();
  const path = expression.path ?? [];

  const {op, value} = parsedToLabels(parsedFilter, filterString);

  const label = `${fieldInfo.name} ${op} ${value}`;

  return (
    <div {...stylex.props(hoverStyles.main)}>
      <FilterPopover
        fieldInfo={fieldInfo}
        path={path}
        filter={parsedFilter}
        setFilter={setFilter}
        trigger={<Token icon="filter" color="cyan" label={label} />}
        layoutProps={{align: 'start', side: 'bottom', sideOffset: 1}}
      />
      <div {...stylex.props(hoverStyles.hoverActions)}>
        <ClearButton
          onClick={() => {
            filterOperation.delete();
            setQuery?.(rootQuery?.build());
          }}
        />
      </div>
    </div>
  );
}
