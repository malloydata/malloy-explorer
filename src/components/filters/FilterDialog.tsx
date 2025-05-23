/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {useState} from 'react';
import stylex from '@stylexjs/stylex';
import {filterStyles} from './styles';
import {ParsedFilter} from '@malloydata/malloy-query-builder';
import {BooleanFilterCore} from './BooleanFilterCore';
import {
  BooleanFilter,
  NumberFilter,
  StringFilter,
  TemporalFilter,
} from '@malloydata/malloy-filter';
import {BasicStringFilter, StringFilterCore} from './StringFilterCore';
import {NumberFilterCore} from './NumberFilterCore';
import {DateTimeFilterCore} from './DateTimeFilterCore';
import {fontStyles} from '../primitives/styles';

export interface FilterDialogProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  path: string[];
  filter?: ParsedFilter;
  onFilterApply: (filter: ParsedFilter) => void;
  onOpenChange: (open: boolean) => void;
}

export function FilterDialog({
  fieldInfo,
  path,
  filter,
  onFilterApply,
  onOpenChange,
}: FilterDialogProps) {
  const [currentFilter, setCurrentFilter] = useState(
    filter ?? getDefaultFilter(fieldInfo)
  );
  const onCancel = () => {
    onOpenChange(false);
  };

  const onApply = () => {
    onFilterApply(currentFilter);
    onOpenChange(false);
  };

  const updateBooleanFilter = (parsed: BooleanFilter) => {
    setCurrentFilter({kind: 'boolean', parsed});
  };

  const updateStringFilter = (parsed: StringFilter) => {
    setCurrentFilter({kind: 'string', parsed});
  };

  const updateNumberFilter = (parsed: NumberFilter) => {
    setCurrentFilter({kind: 'number', parsed});
  };

  const updateTimestampFilter = (parsed: TemporalFilter) => {
    setCurrentFilter({kind: 'timestamp', parsed});
  };

  const updateDateFilter = (parsed: TemporalFilter) => {
    setCurrentFilter({kind: 'date', parsed});
  };

  return (
    <div
      {...stylex.props(fontStyles.body, filterStyles.filterDialog)}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          onApply();
        } else if (event.key === 'Esc') {
          onCancel();
        }
      }}
    >
      <div {...stylex.props(filterStyles.filterDialogHeader)}>
        {fieldInfo.name}
      </div>
      {currentFilter.kind === 'boolean' && (
        <BooleanFilterCore
          setFilter={updateBooleanFilter}
          filter={currentFilter.parsed ?? {operator: 'null'}}
        />
      )}
      {currentFilter.kind === 'string' && (
        <StringFilterCore
          setFilter={updateStringFilter}
          filter={
            (currentFilter.parsed as BasicStringFilter) ?? {operator: 'null'}
          }
          field={fieldInfo}
          path={path}
        />
      )}
      {currentFilter.kind === 'number' && (
        <NumberFilterCore
          setFilter={updateNumberFilter}
          filter={currentFilter.parsed ?? {operator: 'null'}}
        />
      )}
      {currentFilter.kind === 'date' && (
        <DateTimeFilterCore
          setFilter={updateDateFilter}
          filter={currentFilter.parsed ?? {operator: 'null'}}
          isDateTime={false}
        />
      )}
      {currentFilter.kind === 'timestamp' && (
        <DateTimeFilterCore
          setFilter={updateTimestampFilter}
          filter={currentFilter.parsed ?? {operator: 'null'}}
          isDateTime={true}
        />
      )}
      <div {...stylex.props(filterStyles.buttonGroup)}>
        <Button
          variant="default"
          label="Cancel"
          onClick={onCancel}
          style={{flexGrow: 1}}
        />
        <Button
          variant="primary"
          label="Apply"
          onClick={onApply}
          style={{flexGrow: 1}}
        />
      </div>
    </div>
  );
}

function getDefaultFilter(
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure
): ParsedFilter {
  if (fieldInfo.type.kind === 'string_type') {
    return {kind: 'string', parsed: {operator: '=', values: []}};
  } else if (fieldInfo.type.kind === 'boolean_type') {
    return {kind: 'boolean', parsed: {operator: 'true'}};
  } else if (fieldInfo.type.kind === 'number_type') {
    return {kind: 'number', parsed: {operator: '>', values: ['0']}};
  } else if (fieldInfo.type.kind === 'date_type') {
    return {
      kind: 'date',
      parsed: {operator: 'last', n: '7', units: 'day'},
    };
  } else {
    return {
      kind: 'timestamp',
      parsed: {operator: 'last', n: '7', units: 'day'},
    };
  }
}
