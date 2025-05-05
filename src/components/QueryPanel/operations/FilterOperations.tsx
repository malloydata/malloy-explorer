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
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Token} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {ClearButton} from './ClearButton';
import {ErrorElement} from '../../ErrorElement';
import {FilterPopover} from '../../filters/FilterPopover';
import {Moment} from '@malloydata/malloy-filter';

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
  const {fieldReference, filterString} = filterOperation.filter;
  const filter = filterOperation.filter.getFilter();
  const fieldInfo = fieldReference.getFieldInfo();
  const {setQuery} = useContext(QueryEditorContext);
  if (fieldInfo.kind !== 'dimension' && fieldInfo.kind !== 'measure') {
    throw new Error(`Invalid filter field kind: ${fieldInfo.kind}`);
  }
  const setFilter = useCallback(
    (filter: ParsedFilter) => {
      filterOperation.filter.setFilter(filter);
      setQuery?.(rootQuery.build());
    },
    [filterOperation.filter, rootQuery, setQuery]
  );

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

const parsedToLabels = (
  parsed: ParsedFilter,
  filterString: string
): {op: string; value: string} => {
  if (parsed.parsed === null) {
    return {op: '', value: filterString};
  }
  let op: string = '';
  let value: string = filterString;

  switch (parsed.kind) {
    case 'boolean':
      {
        const booleanClause = parsed.parsed;
        const {operator, not} = booleanClause;
        op = not ? 'is not' : 'is';
        value = operator;
      }
      break;
    case 'string':
      {
        const stringClause = parsed.parsed;
        const {operator} = stringClause;
        switch (operator) {
          case '~':
            op = 'is like';
            value = stringClause.escaped_values.join(', ');
            break;
          case '=':
            op = 'is';
            value = stringClause.values.join(', ');
            break;
          case 'contains':
            op = 'contains';
            value = stringClause.values.join(', ');
            break;
          case 'starts':
            op = 'starts with';
            value = stringClause.values.join(', ');
            break;
          case 'ends':
            op = 'is like';
            value = stringClause.values.join(', ');
            break;
          case 'empty':
            op = 'is empty';
            value = '';
            break;
          case 'null':
            op = stringClause.not ? 'is not' : 'is';
            value = 'null';
            break;
        }
      }
      break;
    case 'number':
      {
        const numberClause = parsed.parsed;
        const {operator} = numberClause;
        switch (operator) {
          case '=':
          case '!=':
          case '<=':
          case '>=':
          case '<':
          case '>':
            op = operator;
            value = numberClause.values.join(', ');
            break;
          case 'range':
            op = 'in between';
            value = numberClause.startValue + ' and ' + numberClause.endValue;
            break;
          case 'null':
            op = numberClause.not ? 'is not' : 'is';
            value = 'null';
            break;
        }
      }
      break;
    case 'date':
    case 'timestamp': {
      const temporalClause = parsed.parsed;
      const {operator} = temporalClause;
      switch (operator) {
        case 'after':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} after`;
            value = displayTimeFromMoment(temporalClause.after);
          }
          break;
        case 'before':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} before`;
            value = displayTimeFromMoment(temporalClause.before);
          }
          break;
        case 'in':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} in`;
            value = displayTimeFromMoment(temporalClause.in);
          }
          break;
        case 'in_last':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} in last`;
            value = temporalClause.n + ' ' + temporalClause.units;
          }
          break;
        case 'last':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} last complete`;
            value = temporalClause.n + ' ' + temporalClause.units;
          }
          break;
        case 'next':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} next complete`;
            value = temporalClause.n + ' ' + temporalClause.units;
          }
          break;
        case 'for':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} for`;
            value = temporalClause.n + ' ' + temporalClause.units;
          }
          break;
        case 'null':
          op = temporalClause.not ? 'is not' : 'is';
          value = 'null';
          break;
      }
    }
  }
  return {op, value};
};

function displayTimeFromMoment(momentObj?: Moment): string {
  if (!momentObj) {
    return '';
  }

  if (momentObj.moment === 'literal') {
    return momentObj.literal;
  } else if (momentObj.moment === 'now') {
    return 'now';
  }
  return momentObj.moment;
}
