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
  in_last,
} from '@malloydata/malloy-filter';
import {useState} from 'react';
//import DatePicker from '../primitives/DatePicker';
import moment from 'moment';
import {SelectDropdown} from '../primitives/SelectDropdown';
import stylex from '@stylexjs/stylex';
import {DateInput, formats, guessUnits} from '../DateInput';
import {DatePicker} from '../primitives';
import {filterStyles} from './styles';

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

function unitsFromFilter(
  filter: TemporalFilter,
  isDateTime: boolean
): TemporalUnit {
  if (
    filter.operator === 'last' ||
    filter.operator === 'next' ||
    filter.operator === 'in_last'
  ) {
    return filter.units;
  } else if (filter.operator === 'to') {
    return guessUnits(filter.fromMoment, isDateTime);
  } else if (
    filter.operator === 'before' &&
    filter.before.moment === 'literal'
  ) {
    return guessUnits(filter.before, isDateTime);
  } else if (filter.operator === 'after') {
    return guessUnits(filter.after, isDateTime);
  } else if (filter.operator === 'in') {
    return guessUnits(filter.in, isDateTime);
  }
  return isDateTime ? 'second' : 'day';
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
  // Default filter if none provided
  filter ??= {
    operator: 'last',
    n: '7',
    units: 'day',
  };

  const [units, setUnits] = useState<TemporalUnit>(
    unitsFromFilter(filter, isDateTime)
  );

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

  // TODO "for"

  return (
    <div {...stylex.props(filterStyles.editor)}>
      <div {...stylex.props(filterStyles.editorRow)}>
        <SelectDropdown
          value={type}
          onChange={changeType}
          options={
            [
              {value: 'in_last', label: 'last'},
              {value: 'last', label: 'last complete'},
              {value: 'next', label: 'next complete'},
              {value: 'after', label: 'after'},
              {value: 'before', label: 'before'},
              {value: 'in', label: 'is'},
              {value: 'to', label: 'between'},
              {value: 'null', label: 'null'},
              {value: '-null', label: 'not null'},
            ] as TypeOption[]
          }
          customStyle={filterStyles.editorCell}
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
    case 'in_last':
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
  currentFilter: JustUnits | in_last;
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
        {...stylex.props(filterStyles.input, filterStyles.editorCell)}
        onChange={updateN}
      />
      <SelectDropdown
        options={options}
        value={units}
        onChange={updateUnits}
        customStyle={filterStyles.editorCell}
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
      customStyle={filterStyles.editorCell}
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
      <div {...stylex.props(filterStyles.editorRow)}>
        <DateInput
          value={date}
          setValue={updateDate}
          units={units}
          customStyle={{...filterStyles.input, ...filterStyles.editorCell}}
        />
      </div>
      <div {...stylex.props(filterStyles.editorRow)}>
        <DatePicker
          value={date}
          setValue={updateDate}
          units={units}
          maxLevel={maxLevel}
          customStyle={filterStyles.editorCell}
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
      <div {...stylex.props(filterStyles.editorRow)}>
        <DateInput
          value={fromDate}
          setValue={updateFromDate}
          units={units}
          customStyle={{...filterStyles.input, ...filterStyles.editorCell}}
          onFocus={() => updateFocusedDate('from')}
          isActive={focusedDate === 'from'}
        />
        <DateInput
          value={toDate}
          setValue={updateToDate}
          units={units}
          customStyle={{...filterStyles.input, ...filterStyles.editorCell}}
          onFocus={() => updateFocusedDate('to')}
          isActive={focusedDate === 'to'}
        />
      </div>
      <div {...stylex.props(filterStyles.editorRow)}>
        <DatePicker
          value={date}
          setValue={updateDate}
          units={units}
          maxLevel={maxLevel}
          customStyle={filterStyles.editorCell}
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
    literal: moment.utc(date).format(formats[units]),
  };
}

function extractDateFromMoment(momentObj?: Moment): Date {
  if (momentObj && momentObj.moment === 'literal') {
    return moment.utc(momentObj.literal).toDate();
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
    case 'in_last':
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
    case 'in_last':
    case 'last':
    case 'next':
      return {operator: type, n, units};
    case 'after':
      return {operator: type, after: fromMoment};
    case 'before':
      return {operator: type, before: fromMoment};
    case 'in':
      return {operator: type, in: fromMoment};
    case 'to':
      return {operator: type, fromMoment, toMoment};
    case 'null':
      return {operator: 'null'};
    case '-null':
      return {operator: 'null', not: true};
  }
  return filter;
}
