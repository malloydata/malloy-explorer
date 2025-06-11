/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Moment} from '@malloydata/malloy-filter';
import {ParsedFilter} from '@malloydata/malloy-query-builder';

export const parsedToLabels = (
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
            {
              const {not, values} = stringClause;
              op = not ? 'is not' : 'is';
              value = values.join(', ');
            }
            break;
          case 'contains':
            {
              const {not, values} = stringClause;
              op = not ? 'does not contain' : 'contains';
              value = values.join(', ');
            }
            break;
          case 'starts':
            {
              const {not, values} = stringClause;
              op = not ? 'does not start with' : 'starts with';
              value = values.join(', ');
            }
            break;
          case 'ends':
            {
              const {not, values} = stringClause;
              op = not ? 'does not end with' : 'ends with';
              value = values.join(', ');
            }
            break;
          case 'empty':
            {
              const {not} = stringClause;
              op = not ? 'is not empty' : 'is empty';
              value = '';
            }
            break;
          case 'null':
            {
              const {not} = stringClause;
              op = not ? 'is not' : 'is';
              value = 'null';
            }
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
            op = not ? 'through' : 'is after';
            value = displayTimeFromMoment(temporalClause.after);
          }
          break;
        case 'before':
          {
            const {not} = temporalClause;
            op = not ? 'starting' : 'is before';
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
