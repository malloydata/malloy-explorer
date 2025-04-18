/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  TemporalFilter,
  Moment,
  TemporalUnit,
  JustUnits,
  After,
  Before,
  TemporalLiteral,
  To,
  InMoment,
} from '@malloydata/malloy-filter';
import {useState} from 'react';
//import DatePicker from '../primitives/DatePicker';
import moment from 'moment';
import {SelectDropdown} from '../primitives/SelectDropdown';
import stylex from '@stylexjs/stylex';
import {DateInput, formats} from '../DateInput';
import {DatePicker} from '../primitives';

type TemporalFilterOperator = TemporalFilter['operator'];
type TemporalFilterType = TemporalFilterOperator | '-null';

type TypeOption = {
  value: TemporalFilterType;
  label: string;
};

// Helper function to determine the filter type from a TemporalFilter
function typeFromFilter(filter: TemporalFilter): TemporalFilterType | '-null' {
  if (filter.operator === 'null' && filter.not) {
    return '-null';
  }
  return filter.operator;
}

export interface DateTimeFilterCoreProps {
  filter: TemporalFilter | null;
  setFilter: (filter: TemporalFilter) => void;
  isDateTime: boolean;
}

export const DateTimeFilterCore: React.FC<DateTimeFilterCoreProps> = ({
  filter,
  setFilter,
  isDateTime,
}) => {
  const [units, setUnits] = useState<TemporalUnit>('day');
  // Default filter if none provided
  filter ??= {
    operator: 'last',
    n: '7',
    units: 'day',
  };

  // Keep a copy of the filter locally
  const [currentFilter, setCurrentFilter] = useState<TemporalFilter>(filter);

  const changeType = (type: TemporalFilterType) => {
    updateFilter(dateTimeFilterChangeType(currentFilter, type, units));
  };

  const updateFilter = (newFilter: TemporalFilter) => {
    setCurrentFilter(newFilter);
    setFilter(newFilter);
  };

  const maxLevel = isDateTime ? 'second' : 'day';
  const type = typeFromFilter(currentFilter);

  // TODO "for" | "in_last"

  return (
    <div {...stylex.props(styles.editor)}>
      <div {...stylex.props(styles.editorRow)}>
        <SelectDropdown
          value={type}
          onChange={changeType}
          options={
            [
              {value: 'last', label: 'last'},
              {value: 'next', label: 'next'},
              {value: 'after', label: 'after'},
              {value: 'before', label: 'before'},
              {value: 'in', label: 'is'},
              {value: 'to', label: 'between'},
              {value: 'null', label: 'null'},
              {value: '-null', label: 'not null'},
            ] as TypeOption[]
          }
          customStyle={styles.editorCell}
        />
        {getTopEditorRow(
          currentFilter,
          updateFilter,
          units,
          setUnits,
          maxLevel
        )}
      </div>
      {getBottomEditorRow(
        currentFilter,
        updateFilter,
        units,
        setUnits,
        maxLevel
      )}
    </div>
  );
};

function getTopEditorRow(
  currentFilter: TemporalFilter,
  updateFilter: (filter: TemporalFilter) => void,
  units: TemporalUnit,
  setUnits: (unit: TemporalUnit) => void,
  maxLevel: 'day' | 'second'
) {
  switch (currentFilter.operator) {
    case 'last':
    case 'next':
      return (
        <NUnitFilter
          currentFilter={currentFilter}
          maxLevel={maxLevel}
          updateFilter={updateFilter}
          units={units}
          setUnits={setUnits}
        />
      );
    case 'after':
    case 'before':
    case 'to':
    case 'in':
      return (
        <UnitFilter
          currentFilter={currentFilter}
          maxLevel={maxLevel}
          updateFilter={updateFilter}
          units={units}
          setUnits={setUnits}
        />
      );
  }

  return null;
}

function getBottomEditorRow(
  currentFilter: TemporalFilter,
  updateFilter: (filter: TemporalFilter) => void,
  units: TemporalUnit,
  setUnits: (unit: TemporalUnit) => void,
  maxLevel: 'day' | 'second'
) {
  switch (currentFilter.operator) {
    case 'after':
    case 'before':
    case 'in':
      return (
        <SingleDateFilter
          currentFilter={currentFilter}
          maxLevel={maxLevel}
          updateFilter={updateFilter}
          units={units}
          setUnits={setUnits}
        />
      );
    case 'to':
      return (
        <DoubleDateFilter
          currentFilter={currentFilter}
          maxLevel={maxLevel}
          updateFilter={updateFilter}
          units={units}
          setUnits={setUnits}
        />
      );
  }

  return null;
}

interface TemporalUnitOption {
  value: TemporalUnit;
  label: string;
}

const DateUnits: TemporalUnitOption[] = [
  {value: 'year', label: 'years'},
  {value: 'quarter', label: 'quarters'},
  {value: 'month', label: 'months'},
  {value: 'week', label: 'weeks'},
  {value: 'day', label: 'days'},
];

const TimeUnits: TemporalUnitOption[] = [
  {value: 'hour', label: 'hours'},
  {value: 'minute', label: 'minutes'},
  {value: 'second', label: 'seconds'},
];

interface NUnitFilterProps {
  currentFilter: JustUnits;
  updateFilter: (filter: TemporalFilter) => void;
  units: TemporalUnit;
  setUnits: (units: TemporalUnit) => void;
  maxLevel: 'day' | 'second';
}

function NUnitFilter({
  currentFilter,
  updateFilter,
  setUnits,
  maxLevel,
}: NUnitFilterProps) {
  const {n, units} = currentFilter;
  const options = maxLevel === 'day' ? DateUnits : [...DateUnits, ...TimeUnits];

  const updateN = (event: React.ChangeEvent<HTMLInputElement>) => {
    const n = event.target.value;
    updateFilter({...currentFilter, n});
  };

  const updateUnits = (units: TemporalUnit) => {
    setUnits(units);
    updateFilter({...currentFilter, units});
  };

  return (
    <>
      <input
        type="number"
        value={n}
        {...stylex.props(styles.input, styles.editorCell)}
        onChange={updateN}
      />
      <SelectDropdown
        options={options}
        value={units}
        onChange={updateUnits}
        customStyle={styles.editorCell}
      />
    </>
  );
}

interface UnitFilterProps {
  currentFilter: TemporalFilter;
  updateFilter: (filter: TemporalFilter) => void;
  units: TemporalUnit;
  setUnits: (units: TemporalUnit) => void;
  maxLevel: 'day' | 'second';
}

function UnitFilter({units, setUnits, maxLevel}: UnitFilterProps) {
  const options = maxLevel === 'day' ? DateUnits : [...DateUnits, ...TimeUnits];

  return (
    <SelectDropdown
      options={options}
      value={units}
      onChange={setUnits}
      customStyle={styles.editorCell}
    />
  );
}
interface SingleDateFilterProps {
  currentFilter: Before | After | InMoment;
  updateFilter: (filter: TemporalFilter) => void;
  units: TemporalUnit;
  setUnits: (units: TemporalUnit) => void;
  maxLevel: 'day' | 'second';
}

function SingleDateFilter({
  currentFilter,
  updateFilter,
  units,
  maxLevel,
}: SingleDateFilterProps) {
  const moment =
    currentFilter.operator === 'after'
      ? currentFilter.after
      : currentFilter.operator === 'before'
        ? currentFilter.before
        : currentFilter.in;
  const date = extractDateFromMoment(moment);

  const updateDate = (date: Date) => {
    updateFilter({
      ...currentFilter,
      [currentFilter.operator]: createTemporalLiteral(date, units),
    });
  };

  return (
    <>
      <div {...stylex.props(styles.editorRow)}>
        <DateInput
          value={date}
          setValue={updateDate}
          units={units}
          customStyle={{...styles.input, ...styles.editorCell}}
        />
      </div>
      <div {...stylex.props(styles.editorRow)}>
        <DatePicker
          value={date}
          setValue={updateDate}
          units={units}
          maxLevel={maxLevel}
          customStyle={styles.editorCell}
        />
      </div>
    </>
  );
}

interface DoubleDateFilterProps {
  currentFilter: To;
  updateFilter: (filter: TemporalFilter) => void;
  units: TemporalUnit;
  setUnits: (units: TemporalUnit) => void;
  maxLevel: 'day' | 'second';
}

function DoubleDateFilter({
  currentFilter,
  updateFilter,
  units,
  maxLevel,
}: DoubleDateFilterProps) {
  const {fromMoment, toMoment} = currentFilter;
  const fromDate = extractDateFromMoment(fromMoment);
  const toDate = extractDateFromMoment(toMoment);
  const [date, setDate] = useState(fromDate);
  const [focusedDate, setFocusedDate] = useState<'from' | 'to'>('from');

  const updateFromDate = (date: Date) => {
    updateFilter({
      ...currentFilter,
      fromMoment: createTemporalLiteral(date, units),
    });
  };

  const updateToDate = (date: Date) => {
    updateFilter({
      ...currentFilter,
      toMoment: createTemporalLiteral(date, units),
    });
  };

  const updateDate = (date: Date) => {
    if (focusedDate === 'from') {
      updateFromDate(date);
    } else {
      updateToDate(date);
    }
    setDate(date);
  };

  const updateFocusedDate = (focusedDate: 'from' | 'to') => {
    setFocusedDate(focusedDate);
    if (focusedDate === 'from') {
      const fromDate = extractDateFromMoment(fromMoment);
      setDate(fromDate);
    } else {
      const toDate = extractDateFromMoment(toMoment);
      setDate(toDate);
    }
  };

  return (
    <>
      <div {...stylex.props(styles.editorRow)}>
        <DateInput
          value={fromDate}
          setValue={updateFromDate}
          units={units}
          customStyle={{...styles.input, ...styles.editorCell}}
          onFocus={() => updateFocusedDate('from')}
          isActive={focusedDate === 'from'}
        />
        <DateInput
          value={toDate}
          setValue={updateToDate}
          units={units}
          customStyle={{...styles.input, ...styles.editorCell}}
          onFocus={() => updateFocusedDate('to')}
          isActive={focusedDate === 'to'}
        />
      </div>
      <div {...stylex.props(styles.editorRow)}>
        <DatePicker
          value={date}
          setValue={updateDate}
          units={units}
          maxLevel={maxLevel}
          customStyle={styles.editorCell}
        />
      </div>
    </>
  );
}

function createTemporalLiteral(
  date: Date,
  units: TemporalUnit
): TemporalLiteral {
  return {
    moment: 'literal',
    literal: moment(date).format(formats[units]),
  };
}

function extractDateFromMoment(momentObj?: Moment): Date {
  if (momentObj && momentObj.moment === 'literal') {
    return moment(momentObj.literal).toDate();
  }

  // For other moment types, default to now
  return new Date();
}

// Helper function to change the filter type
export function dateTimeFilterChangeType(
  filter: TemporalFilter,
  type: TemporalFilterType,
  units: TemporalUnit
): TemporalFilter {
  let n = '7';
  let fromMoment: Moment = createTemporalLiteral(new Date(), units);
  let toMoment: Moment = createTemporalLiteral(new Date(), units);

  switch (filter.operator) {
    case 'last':
    case 'next':
      n = filter.n;
      units = filter.units;
      break;
    case 'after':
      fromMoment = filter.after;
      toMoment = filter.after;
      break;
    case 'before':
      fromMoment = filter.before;
      toMoment = filter.before;
      break;
    case 'to':
      fromMoment = filter.fromMoment;
      toMoment = filter.toMoment;
      break;
  }

  switch (type) {
    case 'last':
    case 'next':
      return {operator: type, n, units};
    case 'after':
      return {operator: type, after: fromMoment};
    case 'before':
      return {operator: type, before: fromMoment};
    case 'to':
      return {operator: type, fromMoment, toMoment};
    case 'null':
      return {operator: 'null'};
    case '-null':
      return {operator: 'null', not: true};
  }
  return filter;
}

const styles = stylex.create({
  editor: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  editorRow: {
    display: 'flex',
    gap: 8,
  },
  editorCell: {
    flexGrow: 1,
  },
  input: {
    border: '1px solid #e0e0e0',
    color: 'rgb(95, 99, 104)',
    padding: '4px 8px 4px 8px',
    borderRadius: 5,
  },
});
