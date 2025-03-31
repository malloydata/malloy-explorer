/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  Null,
  TemporalFilter,
  Before,
  After,
  To,
  InMoment,
  Moment,
  NowMoment,
  TemporalLiteral,
} from '@malloydata/malloy-filter';
import {EditableToken, SelectorToken, Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon, fieldKindToColor} from '../utils/icon';
import {DEFAULT_TOKEN_COLOR, TokenColor} from '../primitives/tokens/types';
import {useState} from 'react';
import DatePicker from '../primitives/DatePicker';
import moment from 'moment';
import {useClickOutside} from '../hooks/useClickOutside';

type DateTimeFilterType =
  | 'is_equal_to'
  | 'is_before'
  | 'is_after'
  | 'is_between'
  | 'is_null'
  | 'is_not_null';

// Helper function to determine the filter type from a TemporalFilter
function typeFromFilter(filter: TemporalFilter): DateTimeFilterType {
  if (filter.operator === 'null') {
    return filter.not ? 'is_not_null' : 'is_null';
  } else if (filter.operator === 'in') {
    return 'is_equal_to';
  } else if (filter.operator === 'before') {
    return 'is_before';
  } else if (filter.operator === 'after') {
    return 'is_after';
  } else if (filter.operator === 'to') {
    return 'is_between';
  }

  // Default to is_equal_to if we can't determine the type
  return 'is_equal_to';
}

// Helper function to create a temporal literal from a Date
function createTemporalLiteral(date: Date): TemporalLiteral {
  return {
    moment: 'literal',
    literal: moment(date).format('YYYY-MM-DD HH:mm:ss.0'),
  };
}

// Helper function to create a now moment
function createNowMoment(): NowMoment {
  return {
    moment: 'now',
  };
}

// Helper function to extract a Date from a Moment
function extractDateFromMoment(momentObj?: Moment): Date {
  if (!momentObj) {
    return new Date();
  }

  if (momentObj.moment === 'literal') {
    return new Date(momentObj.literal);
  } else if (momentObj.moment === 'now') {
    return new Date();
  }

  // For other moment types, default to now
  return new Date();
}

export interface DateTimeFilterBuilderProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  filter: TemporalFilter | null;
  setFilter: (filter: TemporalFilter) => void;
}

export const DateTimeFilterToken: React.FC<DateTimeFilterBuilderProps> = ({
  fieldInfo,
  filter,
  setFilter,
}) => {
  // Default filter if none provided
  filter ??= {
    operator: 'in',
    in: createNowMoment(),
  } as InMoment;

  // Keep a copy of the filter locally
  const [currentFilter, setCurrentFilter] = useState<TemporalFilter>(filter);

  const changeType = (type: string) => {
    updateFilter(
      dateTimeFilterChangeType(currentFilter, type as DateTimeFilterType)
    );
  };

  const updateFilter = (newFilter: TemporalFilter) => {
    setCurrentFilter(newFilter);
    setFilter(newFilter);
  };

  const type = typeFromFilter(currentFilter);

  // Determine if we're dealing with a date or a datetime
  const isDateTime = fieldInfo.type.kind === 'timestamp_type';
  const maxLevel = isDateTime ? 'second' : 'day';

  const typeDropdown = (
    <SelectorToken
      value={type}
      onChange={changeType}
      items={[
        {value: 'is_equal_to', label: 'is'},
        {value: 'is_before', label: 'is before'},
        {value: 'is_after', label: 'is after'},
        {value: 'is_between', label: 'is between'},
        {value: 'is_null', label: 'is null'},
        {value: 'is_not_null', label: 'is not null'},
      ]}
    />
  );

  const icon = atomicTypeToIcon(fieldInfo.type.kind);
  const color = fieldKindToColor(fieldInfo.kind);

  let editor = <span></span>;

  // Variables for case blocks
  let inDate: Date;
  let beforeDate: Date;
  let afterDate: Date;
  let fromDate: Date;
  let toDate: Date;

  switch (currentFilter.operator) {
    case 'in': {
      const inMoment = currentFilter as InMoment;
      inDate = extractDateFromMoment(inMoment.in);
      editor = (
        <DateTimeEditor
          _color={color}
          value={inDate}
          setValue={newDate => {
            updateFilter({
              ...currentFilter,
              in: createTemporalLiteral(newDate),
            } as InMoment);
          }}
          maxLevel={maxLevel as 'day' | 'second'}
        />
      );
      break;
    }
    case 'before': {
      const beforeMoment = currentFilter as Before;
      beforeDate = extractDateFromMoment(beforeMoment.before);
      editor = (
        <DateTimeEditor
          _color={color}
          value={beforeDate}
          setValue={newDate => {
            updateFilter({
              ...currentFilter,
              before: createTemporalLiteral(newDate),
            } as Before);
          }}
          maxLevel={maxLevel as 'day' | 'second'}
        />
      );
      break;
    }
    case 'after': {
      const afterMoment = currentFilter as After;
      afterDate = extractDateFromMoment(afterMoment.after);
      editor = (
        <DateTimeEditor
          _color={color}
          value={afterDate}
          setValue={newDate => {
            updateFilter({
              ...currentFilter,
              after: createTemporalLiteral(newDate),
            } as After);
          }}
          maxLevel={maxLevel as 'day' | 'second'}
        />
      );
      break;
    }
    case 'to': {
      const toMoment = currentFilter as To;
      fromDate = extractDateFromMoment(toMoment.fromMoment);
      toDate = extractDateFromMoment(toMoment.toMoment);
      editor = (
        <DateTimeRangeEditor
          _color={color}
          fromValue={fromDate}
          toValue={toDate}
          setFromValue={newFromDate => {
            updateFilter({
              ...currentFilter,
              fromMoment: createTemporalLiteral(newFromDate),
            } as To);
          }}
          setToValue={newToDate => {
            updateFilter({
              ...currentFilter,
              toMoment: createTemporalLiteral(newToDate),
            } as To);
          }}
          maxLevel={maxLevel as 'day' | 'second'}
        />
      );
      break;
    }
  }

  return (
    <TokenGroup color={color}>
      <Token icon={icon} label={fieldInfo.name} />
      {typeDropdown}
      {editor}
    </TokenGroup>
  );
};

interface ClickableDateTokenProps {
  color?: TokenColor;
  value: Date;
  setValue(value: Date): void;
  maxLevel: 'day' | 'second';
  label?: string;
}

function ClickableDateToken({
  color = DEFAULT_TOKEN_COLOR,
  value,
  setValue,
  maxLevel,
  label,
}: ClickableDateTokenProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format the date based on the maxLevel
  const formatDate = (date: Date): string => {
    if (maxLevel === 'day') {
      return moment(date).format('YYYY-MM-DD');
    } else {
      return moment(date).format('YYYY-MM-DD hh:mm:ss');
    }
  };

  const ref = React.useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
    // commitValue();
  });

  return (
    <div
      ref={ref}
      style={{position: 'relative'}}
      onFocus={() => setIsOpen(true)}
      onBlur={e => {
        if (e.relatedTarget && !ref.current.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <EditableToken
        value={label ? `${label}: ${formatDate(value)}` : formatDate(value)}
        color={color}
        onChange={text => {
          try {
            const date = new Date(text);
            if (date) {
              setValue(date);
            }
          } catch (_ex) {
            // TODO: flag to the user that the date is invalid
            console.warn('Failed to parse date');
          }
        }}
      />
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            marginTop: '5px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
          }}
        >
          <DatePicker
            value={value}
            setValue={newValue => {
              setValue(newValue);
              // setIsOpen(false);
            }}
            maxLevel={maxLevel}
          />
        </div>
      )}
    </div>
  );
}

interface DateTimeEditorProps {
  _color?: TokenColor;
  value: Date;
  setValue(value: Date): void;
  maxLevel: 'day' | 'second';
}

function DateTimeEditor({
  _color,
  value,
  setValue,
  maxLevel,
}: DateTimeEditorProps) {
  return (
    <ClickableDateToken
      color={_color}
      value={value}
      setValue={setValue}
      maxLevel={maxLevel}
    />
  );
}

interface DateTimeRangeEditorProps {
  _color?: TokenColor;
  fromValue: Date;
  toValue: Date;
  setFromValue(value: Date): void;
  setToValue(value: Date): void;
  maxLevel: 'day' | 'second';
}

function DateTimeRangeEditor({
  _color,
  fromValue,
  toValue,
  setFromValue,
  setToValue,
  maxLevel,
}: DateTimeRangeEditorProps) {
  return (
    <div style={{display: 'flex', gap: '10px'}}>
      <ClickableDateToken
        color={_color}
        value={fromValue}
        setValue={setFromValue}
        maxLevel={maxLevel}
      />
      <ClickableDateToken
        color={_color}
        value={toValue}
        setValue={setToValue}
        maxLevel={maxLevel}
      />
    </div>
  );
}

// Helper function to change the filter type
export function dateTimeFilterChangeType(
  filter: TemporalFilter,
  type: DateTimeFilterType
): TemporalFilter {
  // Get the current date value from the filter if possible
  let currentDate = new Date();
  let endDate = moment(currentDate).add(1, 'day').toDate();

  if (filter.operator === 'in') {
    currentDate = extractDateFromMoment((filter as InMoment).in);
  } else if (filter.operator === 'before') {
    currentDate = extractDateFromMoment((filter as Before).before);
  } else if (filter.operator === 'after') {
    currentDate = extractDateFromMoment((filter as After).after);
  } else if (filter.operator === 'to') {
    currentDate = extractDateFromMoment((filter as To).fromMoment);
    endDate = extractDateFromMoment((filter as To).toMoment);
  }

  // Create a new filter based on the type
  switch (type) {
    case 'is_equal_to':
      return {
        operator: 'in',
        in: createTemporalLiteral(currentDate),
      } as InMoment;
    case 'is_before':
      return {
        operator: 'before',
        before: createTemporalLiteral(currentDate),
      } as Before;
    case 'is_after':
      return {
        operator: 'after',
        after: createTemporalLiteral(currentDate),
      } as After;
    case 'is_between':
      return {
        operator: 'to',
        fromMoment: createTemporalLiteral(currentDate),
        toMoment: createTemporalLiteral(endDate),
      } as To;
    case 'is_null':
      return {
        operator: 'null',
      } as Null;
    case 'is_not_null':
      return {
        operator: 'null',
        not: true,
      } as Null;
    default:
      return filter;
  }
}
