/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {addMenuStyles} from './styles';
import {Token} from '../../primitives';
import {SearchIndexResult, useSearch} from './hooks/useSearch';
import {useMemo} from 'react';
import {textColors} from '../../primitives/colors.stylex';

export interface FieldListProps {
  search: string;
  filter?: (value: string) => boolean;
  onClick: (value: SearchIndexResult) => void;
  fieldPath?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  customStyle?: StyleXStyles;
  showPath?: boolean;
  hideNoMatchMessage?: boolean;
}

export function ValueList({
  onClick,
  search,
  filter,
  fieldPath,
  ref,
  customStyle,
  showPath = true,
  hideNoMatchMessage = false,
}: FieldListProps) {
  const {searchResults} = useSearch(search, fieldPath);
  const stringSearchResults = useMemo(
    () =>
      searchResults &&
      searchResults
        .filter(r => r.fieldType === 'string' && r.fieldValue !== null)
        .filter(r => (filter ? filter(r.fieldValue ?? '') : true))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 100),
    [searchResults, filter]
  );

  return (
    <div ref={ref} {...stylex.props(customStyle)}>
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
            {showPath ? (
              <div {...stylex.props(styles.field)}>{value.fieldName}</div>
            ) : null}
          </div>
        ))
      ) : search && !hideNoMatchMessage ? (
        <div {...stylex.props(addMenuStyles.item)} data-disabled="true">
          No matching values
        </div>
      ) : null}
    </div>
  );
}

export interface ValueProps {
  value: SearchIndexResult;
}

export function Value({value}: ValueProps) {
  return (
    <Token
      label={value.fieldValue ?? '∅'}
      icon="filter"
      color="purple"
      customStyle={styles.token}
    />
  );
}

const styles = stylex.create({
  valueItem: {
    height: 20,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  field: {
    color: textColors.disabled,
  },
  token: {
    cursor: 'pointer',
  },
});
