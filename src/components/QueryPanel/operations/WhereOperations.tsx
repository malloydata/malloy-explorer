/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
  ASTWhereViewOperation,
  ParsedFilter,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {Token, TokenGroup} from '../../primitives';
import {hoverStyles} from './hover.stylex';
import {atomicTypeToIcon, fieldKindToColor} from '../../utils/icon';
import {ClearButton} from './ClearButton';
import {StringFilterToken} from '../../filters/StringFilterToken';
import {BooleanFilterToken} from '../../filters/BooleanFilterToken';
import {NumberFilterToken} from '../../filters/NumberFilterToken';

export interface WhereOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  wheres: ASTWhereViewOperation[];
}

export function WhereOperations({rootQuery, wheres}: WhereOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (wheres.length === 0) {
    return null;
  }

  return (
    <div>
      <div {...stylex.props(styles.title)}>filter by</div>
      <div {...stylex.props(styles.tokenContainer)}>
        {wheres.map((where, key) => {
          const {fieldReference, filterString} = where.filter;
          const fieldInfo = fieldReference.getFieldInfo();

          if (fieldInfo.kind !== 'dimension' && fieldInfo.kind !== 'measure') {
            return null;
          }

          const icon = atomicTypeToIcon(fieldInfo.type.kind);
          const color = fieldKindToColor(fieldInfo.kind);
          const filter = where.filter.getFilter();

          console.info('xxx', {filter});

          if (filter.kind === 'string') {
            return (
              <StringFilterToken
                key={key}
                fieldInfo={fieldInfo}
                filter={filter.parsed}
                setFilter={filter => {
                  where.filter.setFilter({kind: 'string', parsed: filter});
                  setQuery?.(rootQuery.build());
                }}
              />
            );
          }

          if (filter.kind === 'boolean' && filter.parsed) {
            return (
              <BooleanFilterToken
                key={key}
                fieldInfo={fieldInfo}
                filter={filter.parsed}
                setFilter={filter => {
                  where.filter.setFilter({kind: 'boolean', parsed: filter});
                  setQuery?.(rootQuery.build());
                }}
              />
            );
          }
          if (filter.kind === 'number' && filter.parsed) {
            return (
              <NumberFilterToken
                key={key}
                fieldInfo={fieldInfo}
                filter={filter.parsed}
                setFilter={filter => {
                  where.filter.setFilter({kind: 'number', parsed: filter});
                  setQuery?.(rootQuery.build());
                }}
              />
            );
          }

          const {op, value} = parsedToLabels(filter, filterString);

          return (
            <div key={key} {...stylex.props(hoverStyles.main)}>
              <TokenGroup color={color}>
                <Token icon={icon} label={fieldInfo.name} />
                <Token label={op} />
                <Token label={value} />
              </TokenGroup>
              <div {...stylex.props(hoverStyles.hoverActions)}>
                <ClearButton
                  onClick={() => {
                    where.delete();
                    setQuery?.(rootQuery.build());
                  }}
                />
              </div>
            </div>
          );
        })}
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

  console.info({parsed});

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
            value = stringClause.escaped_values.join(',');
            break;
          case '=':
            op = 'is';
            value = stringClause.values.join(',');
            break;
          case 'contains':
            op = 'contains';
            value = stringClause.values.join(',');
            break;
          case 'starts':
            op = 'starts with';
            value = stringClause.values.join(',');
            break;
          case 'ends':
            op = 'is like';
            value = stringClause.values.join(',');
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
            value = numberClause.values.join(',');
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
            value = temporalClause.after.moment;
          }
          break;
        case 'before':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} before`;
            value = temporalClause.before.moment;
          }
          break;
        case 'in':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} in`;
            value = temporalClause.in.moment;
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
            op = `is${not ? ' not' : ''} last`;
            value = temporalClause.n + ' ' + temporalClause.units;
          }
          break;
        case 'next':
          {
            const {not} = temporalClause;
            op = `is${not ? ' not' : ''} nest`;
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
