/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import moment from 'moment';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {SelectDropdown} from './SelectDropdown';
import {textColors} from './colors.stylex';
import NumberInput from './NumberInput';
import Button from './Button';

interface DatePickerProps {
  value: Date;
  setValue: (value: Date) => void;
  maxLevel:
    | 'year'
    | 'month'
    | 'day'
    | 'quarter'
    | 'week'
    | 'hour'
    | 'minute'
    | 'second';
  style?: StyleXStyles;
}

function granularityIndex(
  granularity:
    | 'year'
    | 'month'
    | 'day'
    | 'quarter'
    | 'week'
    | 'hour'
    | 'minute'
    | 'second'
) {
  return [
    'year',
    'quarter',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ].indexOf(granularity);
}

function monthName(month: number) {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][month];
}

export default function DatePicker({
  value,
  setValue,
  maxLevel,
  style,
}: DatePickerProps) {
  const [date, setDate] = useState(value);
  const calendar = getCalendar(date);
  const [pickLevel, setPickLevel] = useState<
    'day' | 'month' | 'year' | 'quarter' | 'week' | 'hour' | 'minute' | 'second'
  >(maxLevel);
  const yearBucket = Math.floor(moment(date).year() / 10) * 10;

  useEffect(() => {
    if (granularityIndex(maxLevel) < granularityIndex(pickLevel)) {
      setPickLevel(maxLevel);
    } else if (pickLevel === 'quarter' && maxLevel !== 'quarter') {
      setPickLevel(maxLevel);
    } else if (pickLevel === 'week' && maxLevel !== 'week') {
      setPickLevel(maxLevel);
    }
  }, [maxLevel, pickLevel]);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const setYear = (year: number) => {
    const newDate = moment(date).year(year).toDate();
    setDate(newDate);
    setValue(newDate);
    if (maxLevel !== 'year') {
      if (maxLevel === 'quarter') {
        setPickLevel('quarter');
      } else {
        setPickLevel('month');
      }
    }
  };

  const yearButton = (offset: number) => {
    const click = () => setYear(yearBucket + offset);
    if (offset === -1 || offset === 10) {
      return (
        <div
          onClick={click}
          {...stylex.props(styles.year, styles.nonCurrentYear)}
        >
          {yearBucket + offset}
        </div>
      );
    }
    return (
      <div
        onClick={click}
        {...stylex.props(
          styles.year,
          moment(date).year() === yearBucket + offset && styles.yearSelected
        )}
      >
        {yearBucket + offset}
      </div>
    );
  };

  const setMonth = (month: number) => {
    const newDate = moment(date).month(month).toDate();
    setDate(newDate);
    setValue(newDate);
    if (maxLevel !== 'month') {
      if (maxLevel === 'week') {
        setPickLevel('week');
      } else {
        setPickLevel('day');
      }
    }
  };

  const setDay = (day: Date) => {
    setDate(day);
    setValue(day);
    if (maxLevel !== 'day') {
      setPickLevel(maxLevel);
    }
  };

  const setWeekByDay = (dateOfFirstDayOfWeek: Date) => {
    setDate(dateOfFirstDayOfWeek);
    setValue(dateOfFirstDayOfWeek);
    if (maxLevel !== 'week') {
      setPickLevel('day');
    }
  };

  const setQuarter = (quarter: number) => {
    const newDate = moment(date)
      .quarter(quarter + 1)
      .toDate();
    setDate(newDate);
    setValue(newDate);
  };

  const monthButton = (month: number) => {
    const click = () => setMonth(month);
    const isSelected =
      moment(date).month() === month &&
      moment(date).year() === moment(value).year();
    return (
      <div
        onClick={click}
        {...stylex.props(styles.month, isSelected && styles.monthSelected)}
      >
        {monthName(month)}
      </div>
    );
  };

  const quarterButton = (quarter: number) => {
    const click = () => setQuarter(quarter);
    const isSelected =
      moment(date).quarter() - 1 === quarter &&
      moment(date).year() === moment(value).year();
    return (
      <div
        onClick={click}
        {...stylex.props(styles.quarter, isSelected && styles.quarterSelected)}
      >
        Q{quarter + 1}
      </div>
    );
  };

  return (
    <div {...stylex.props(styles.outer, style)}>
      <div {...stylex.props(styles.controlRow)}>
        <div {...stylex.props(styles.arrowButton)}>
          <Button
            variant="default"
            size="compact"
            icon="chevronLeft"
            onClick={() => {
              if (pickLevel === 'day' || pickLevel === 'week') {
                setDate(moment(date).subtract(1, 'month').toDate());
              } else if (pickLevel === 'month' || pickLevel === 'quarter') {
                setDate(moment(date).subtract(1, 'year').toDate());
              } else if (pickLevel === 'year') {
                setDate(moment(date).subtract(10, 'years').toDate());
              } else {
                setDay(moment(date).subtract(1, 'days').toDate());
              }
            }}
          />
        </div>
        <div
          {...stylex.props(styles.middleButton)}
          onClick={() => {
            if (pickLevel === 'day' || pickLevel === 'week') {
              setPickLevel('month');
            } else if (pickLevel === 'month' || pickLevel === 'quarter') {
              setPickLevel('year');
            } else if (
              pickLevel === 'hour' ||
              pickLevel === 'minute' ||
              pickLevel === 'second'
            ) {
              setPickLevel('day');
            }
          }}
        >
          {(pickLevel === 'day' || pickLevel === 'week') &&
            moment(date).format('MMMM YYYY')}
          {(pickLevel === 'month' || pickLevel === 'quarter') &&
            moment(date).format('YYYY')}
          {pickLevel === 'year' && (
            <>
              {yearBucket}-{yearBucket + 9}
            </>
          )}
          {(pickLevel === 'hour' ||
            pickLevel === 'minute' ||
            pickLevel === 'second') && (
            <>{moment(date).format('MMMM D, YYYY')}</>
          )}
        </div>
        <div {...stylex.props(styles.arrowButton)}>
          <Button
            variant="default"
            size="compact"
            icon="chevronRight"
            onClick={() => {
              if (pickLevel === 'day' || pickLevel === 'week') {
                setDate(moment(date).add(1, 'month').toDate());
              } else if (pickLevel === 'month' || pickLevel === 'quarter') {
                setDate(moment(date).add(1, 'year').toDate());
              } else if (pickLevel === 'year') {
                setDate(moment(date).add(10, 'years').toDate());
              } else {
                setDay(moment(date).add(1, 'days').toDate());
              }
            }}
          />
        </div>
      </div>
      {pickLevel === 'day' && (
        <div {...stylex.props(styles.calendar)}>
          <div {...stylex.props(styles.weekHeader)}>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>S</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>M</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>T</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>W</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>T</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>F</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>S</div>
          </div>
          {calendar.map((week, index) => (
            <div key={index} {...stylex.props(styles.week)}>
              {week.map(day => (
                <div
                  key={day.number}
                  onClick={() => {
                    setDay(day.date);
                  }}
                  {...stylex.props(
                    styles.cell,
                    styles.day,
                    day.isCurrentMonth
                      ? styles.currentMonthDay
                      : styles.otherMonthDay,
                    value.getTime() === day.date.valueOf() && styles.daySelected
                  )}
                >
                  {day.number}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {pickLevel === 'month' && (
        <div {...stylex.props(styles.monthPicker)}>
          <div {...stylex.props(styles.monthsRow)}>
            {monthButton(0)}
            {monthButton(1)}
            {monthButton(2)}
          </div>
          <div {...stylex.props(styles.monthsRow)}>
            {monthButton(3)}
            {monthButton(4)}
            {monthButton(5)}
          </div>
          <div {...stylex.props(styles.monthsRow)}>
            {monthButton(6)}
            {monthButton(7)}
            {monthButton(8)}
          </div>
          <div {...stylex.props(styles.monthsRow)}>
            {monthButton(9)}
            {monthButton(10)}
            {monthButton(11)}
          </div>
        </div>
      )}
      {pickLevel === 'year' && (
        <div {...stylex.props(styles.yearPicker)}>
          <div {...stylex.props(styles.yearsRow)}>
            {yearButton(-1)}
            {yearButton(0)}
            {yearButton(1)}
          </div>
          <div {...stylex.props(styles.yearsRow)}>
            {yearButton(2)}
            {yearButton(3)}
            {yearButton(4)}
          </div>
          <div {...stylex.props(styles.yearsRow)}>
            {yearButton(5)}
            {yearButton(6)}
            {yearButton(7)}
          </div>
          <div {...stylex.props(styles.yearsRow)}>
            {yearButton(8)}
            {yearButton(9)}
            {yearButton(10)}
          </div>
        </div>
      )}
      {pickLevel === 'quarter' && (
        <div {...stylex.props(styles.quarterPicker)}>
          {quarterButton(0)}
          {quarterButton(1)}
          {quarterButton(2)}
          {quarterButton(3)}
        </div>
      )}
      {pickLevel === 'week' && (
        <div {...stylex.props(styles.calendar)}>
          <div {...stylex.props(styles.weekHeader)}>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>S</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>M</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>T</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>W</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>T</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>F</div>
            <div {...stylex.props(styles.cell, styles.dayHeader)}>S</div>
          </div>
          {calendar.map((week, index) => (
            <div
              key={index}
              onClick={() => {
                setWeekByDay(week[0].date);
              }}
              {...stylex.props(
                styles.weekButton,
                value.getTime() === week[0].date.valueOf() &&
                  styles.weekSelected
              )}
            >
              {week.map(day => (
                <div
                  key={day.number}
                  {...stylex.props(
                    styles.cell,
                    styles.dayNotButton,
                    day.isCurrentMonth
                      ? styles.currentMonthDay
                      : styles.otherMonthDay
                  )}
                >
                  {day.number}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {(pickLevel === 'hour' ||
        pickLevel === 'minute' ||
        pickLevel === 'second') && (
        <div {...stylex.props(styles.timePicker)}>
          <div {...stylex.props(styles.timePickerInner)}>
            <NumberInput
              label="Hours"
              value={parseInt(moment(date).format('hh'))}
              setValue={hour12 => {
                const amPm = moment(date).hour() >= 12 ? 'PM' : 'AM';
                const newHour24 = parseInt(
                  moment(`${hour12} ${amPm}`, ['hh A']).format('H')
                );
                setValue(moment(date).hour(newHour24).toDate());
              }}
            ></NumberInput>
            {(maxLevel === 'minute' || maxLevel === 'second') && (
              <NumberInput
                label="Minutes"
                value={moment(date).minutes()}
                setValue={minute => {
                  setValue(moment(date).minute(minute).toDate());
                }}
              ></NumberInput>
            )}
            {maxLevel === 'second' && (
              <NumberInput
                label="Seconds"
                value={moment(date).seconds()}
                setValue={second => {
                  setValue(moment(date).second(second).toDate());
                }}
              ></NumberInput>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}
            >
              <SelectDropdown
                value={moment(date).hour() >= 12 ? 'PM' : 'AM'}
                onChange={(amPm: 'AM' | 'PM') => {
                  const hour12 = parseInt(moment(date).format('h'));
                  const newHour24 = parseInt(
                    moment(`${hour12} ${amPm}`, ['hh A']).format('H')
                  );
                  setValue(moment(date).hour(newHour24).toDate());
                }}
                options={[
                  {value: 'AM', label: 'AM'},
                  {value: 'PM', label: 'PM'},
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  // Container styles
  outer: {
    userSelect: 'none',
    fontSize: 'var(--malloy-composer-fontSize, 14px)',
    fontFamily: 'var(--malloy-composer-fontFamily, sans-serif)',
  },
  controlRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '5px',
    marginBottom: '5px',
  },
  arrowButton: {
    borderRadius: '5px',
    paddingTop: '2px',
    paddingLeft: '4px',
    paddingRight: '4px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#efefef',
    },
  },
  middleButton: {
    borderRadius: '5px',
    padding: '4px',
    paddingTop: '5px',
    flexGrow: '1',
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'none',
    fontWeight: 'normal',
    ':hover': {
      backgroundColor: '#efefef',
    },
  },
  year: {
    width: '60px',
    minWidth: '60px',
    maxWidth: '60px',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #efefef',
    color: '#505050',
    fontWeight: 'normal',
    cursor: 'pointer',
    textTransform: 'none',
    borderRadius: '5px',
    ':hover': {
      backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
      borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
    },
  },
  yearSelected: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
  },
  nonCurrentYear: {
    color: '#909090',
  },
  month: {
    width: '60px',
    minWidth: '60px',
    maxWidth: '60px',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #efefef',
    color: '#505050',
    cursor: 'pointer',
    textTransform: 'none',
    borderRadius: '5px',
    fontWeight: 'normal',
    ':hover': {
      backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
      borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
    },
  },
  monthSelected: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
  },
  quarter: {
    width: 'calc(100% - 22px)',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #efefef',
    color: '#505050',
    cursor: 'pointer',
    textTransform: 'none',
    borderRadius: '5px',
    fontWeight: 'normal',
    ':hover': {
      backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
      borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
    },
  },
  quarterSelected: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
  },

  // Calendar styles
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    userSelect: 'none',
  },
  weekHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    justifyContent: 'space-between',
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    justifyContent: 'space-between',
  },

  // Cell styles
  cell: {
    width: '16.5px',
    height: '16.5px',
    minWidth: '16.5px',
    maxWidth: '16.5px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeader: {
    fontWeight: 'bold',
    color: '#505050',
  },
  dayNotButton: {
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '12px',
  },
  day: {
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '12px',
    border: '1px solid transparent',
    ':hover': {
      backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    },
  },

  // Week button styles
  weekButton: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row',
    gap: '2px',
    borderRadius: '50px',
    justifyContent: 'space-between',
    border: '1px solid transparent',
    ':hover': {
      backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    },
  },
  weekSelected: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    color: textColors.dimension,
    borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
  },

  // Day state styles
  currentMonthDay: {
    color: '#505050',
  },
  otherMonthDay: {
    color: '#909090',
  },
  daySelected: {
    backgroundColor: 'var(--malloy-composer-form-focusBackground, #f0f6ff)',
    color: textColors.dimension,
    borderColor: 'var(--malloy-composer-focus, #c3d7f7)',
  },

  // Year picker styles
  yearPicker: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    justifyContent: 'space-around',
    height: '209.5px',
  },
  yearsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '2px',
  },

  // Month picker styles
  monthPicker: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    justifyContent: 'space-around',
    height: '209.5px',
  },
  monthsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    justifyContent: 'space-between',
  },

  // Quarter picker styles
  quarterPicker: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    justifyContent: 'space-around',
    height: '209.5px',
  },

  // Time picker styles
  timePicker: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    justifyContent: 'space-around',
    height: '90px',
  },
  timePickerInner: {
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    justifyContent: 'space-around',
    gap: '10px',
  },
});

function getCalendar(date: Date) {
  const firstDayOfMonth = moment(date).date(1);
  const dow = firstDayOfMonth.day();
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const daysInPreviousMonth = firstDayOfMonth
    .clone()
    .subtract(1, 'day')
    .daysInMonth();
  const calendar = [];
  for (let week = 0; week < 6; week++) {
    const row = [];
    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < dow) {
        const diff = dow - day;
        row.push({
          number: daysInPreviousMonth - diff + 1,
          date: firstDayOfMonth.clone().subtract(diff, 'days').toDate(),
          isCurrentMonth: false,
        });
      } else {
        const dom = week * 7 + day - dow;
        if (dom < daysInMonth) {
          row.push({
            number: dom + 1,
            date: firstDayOfMonth.clone().add(dom, 'days').toDate(),
            isCurrentMonth: true,
          });
        } else {
          row.push({
            number: dom - daysInMonth + 1,
            date: firstDayOfMonth.clone().add(dom, 'days').toDate(),
            isCurrentMonth: false,
          });
        }
      }
    }
    calendar.push(row);
  }
  return calendar;
}
