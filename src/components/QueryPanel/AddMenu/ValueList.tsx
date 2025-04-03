/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {addMenuStyles} from './styles';
import {Token} from '../../primitives';
import {SearchIndexResult, useSearch} from './hooks/useSearch';
import {colors} from './colors.stylex';

export interface FieldListProps {
  search: string;
  onClick: (value: SearchIndexResult) => void;
}

export function ValueList({onClick, search}: FieldListProps) {
  const {searchResults} = useSearch(search);
  const stringSearchResults =
    searchResults &&
    searchResults
      .filter(r => r.fieldType === 'string' && r.fieldValue !== null)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 100);

  return (
    <div>
      {stringSearchResults?.length ? (
        stringSearchResults.map(value => (
          <div
            role="menuitem"
            tabIndex={-1}
            key={value.fieldName + ':' + value.fieldValue}
            {...stylex.props(addMenuStyles.item, styles.valueItem)}
            onClick={() => onClick(value)}
          >
            <Value value={value} />
            <div {...stylex.props(styles.field)}>{value.fieldName}</div>
          </div>
        ))
      ) : (
        <div {...stylex.props(addMenuStyles.item)} data-disabled="true">
          No matching values
        </div>
      )}
    </div>
  );
}

export interface ValueProps {
  value: SearchIndexResult;
}

export function Value({value}: ValueProps) {
  return <Token label={value.fieldValue ?? '∅'} icon="filter" color="purple" />;
}

const styles = stylex.create({
  valueItem: {
    height: 20,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    color: colors.disabledText,
  },
});
