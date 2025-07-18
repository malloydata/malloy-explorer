/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  JSONSchemaArray,
  JSONSchemaNumber,
  JSONSchemaObject,
  JSONSchemaOneOf,
  JSONSchemaString,
} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';
import {PillInput} from '../../filters/PillInput';
import {SelectDropdown} from '../../primitives/SelectDropdown';
import {useState} from 'react';
import ObjectEditor from './ObjectEditor';

export default function OneOfEditor({
  view,
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaOneOf, unknown>) {
  return (
    <>
      <div {...stylex.props(styles.label, styles.left)}>
        <label>{option.title ?? name}:</label>
      </div>
      <div />
      {option.description ? <InfoHover info={option.description} /> : <div />}
      {option.oneOf.map((subOption, key) => {
        switch (subOption.type) {
          case 'string':
            return (
              <OneOfStringEditor
                view={view}
                key={key}
                name={name}
                path={path}
                updateCurrent={updateCurrent}
                current={current}
                option={subOption}
              />
            );
          case 'number':
            return (
              <OneOfNumberEditor
                view={view}
                key={key}
                name={name}
                path={path}
                updateCurrent={updateCurrent}
                current={current}
                option={subOption}
              />
            );
          case 'array':
            return (
              <OneOfArrayEditor
                view={view}
                key={key}
                name={name}
                path={path}
                updateCurrent={updateCurrent}
                current={current}
                option={subOption}
              />
            );
          case 'object':
            return (
              <OneOfObjectEditor
                view={view}
                key={key}
                name={name}
                path={path}
                updateCurrent={updateCurrent}
                current={current}
                option={subOption}
              />
            );
          case 'boolean':
        }
        return null;
      })}
    </>
  );
}

function OneOfStringEditor({
  path,
  current,
  updateCurrent,
  option,
}: EditorProps<JSONSchemaString, unknown>) {
  const isString = typeof current === 'string';
  const [value, setValue] = useState<string>(
    isString ? (current as string) : ''
  );
  if (option.enum) {
    return (
      <>
        <div {...stylex.props(styles.left)}>
          <input
            type="radio"
            checked={isString && option.enum.includes(current)}
            onChange={({target: {checked}}) => {
              if (checked) {
                updateCurrent(path, value);
              }
            }}
          />
        </div>
        {option.enum.length > 1 ? (
          <SelectDropdown
            value={value}
            options={option.enum.map(value => ({
              label: value,
              value,
            }))}
            onChange={value => {
              setValue(value);
              updateCurrent(path, value);
            }}
          />
        ) : (
          <div>{option.enum[0]}</div>
        )}
        <div />
      </>
    );
  } else {
    return (
      <>
        <div {...stylex.props(styles.left)}>
          <input
            type="radio"
            checked={isString}
            onChange={({target: {checked}}) => {
              if (checked) {
                updateCurrent(path, value);
              }
            }}
          />
        </div>
        <input
          value={value}
          onChange={({target: {value}}) => {
            setValue(value);
            updateCurrent(path, value);
          }}
        />
        <div />
      </>
    );
  }
}

function OneOfNumberEditor({
  path,
  current,
  updateCurrent,
  option,
}: EditorProps<JSONSchemaNumber, unknown>) {
  const isNumber = typeof current === 'number';
  const [value, setValue] = useState<number>(
    isNumber ? (current as number) : (option.minimum ?? 0)
  );
  return (
    <>
      <div {...stylex.props(styles.left)}>
        <input
          type="radio"
          checked={isNumber}
          onChange={({target: {checked}}) => {
            if (checked) {
              updateCurrent(path, value);
            }
          }}
        />
      </div>
      <input
        type="number"
        min={option.minimum}
        max={option.maximum}
        value={value}
        onChange={({target: {valueAsNumber}}) => {
          setValue(valueAsNumber);
          updateCurrent(path, valueAsNumber);
        }}
        {...stylex.props(styles.input)}
      />
      <div />
    </>
  );
}

function OneOfArrayEditor({
  path,
  current,
  updateCurrent,
}: EditorProps<JSONSchemaArray, unknown>) {
  const isArray = Array.isArray(current);
  const [value, setValue] = useState<string[]>(
    isArray ? (current as string[]) : []
  );
  return (
    <>
      <div {...stylex.props(styles.left)}>
        <input
          type="radio"
          checked={isArray}
          onChange={({target: {checked}}) => {
            if (checked) {
              updateCurrent(path, value);
            }
          }}
        />
      </div>
      <PillInput
        values={value}
        setValues={values => {
          setValue(values);
          updateCurrent(path, values);
        }}
      />
      <div />
    </>
  );
}

function OneOfObjectEditor({
  path,
  current,
  option,
  updateCurrent,
  view,
}: EditorProps<JSONSchemaObject, unknown>) {
  const isObject =
    current != null && typeof current === 'object' && !Array.isArray(current);
  const [value, setValue] = useState<Record<string, unknown>>(
    isObject ? (current as Record<string, unknown>) : {}
  );

  return (
    <>
      <div {...stylex.props(styles.left)}>
        <input
          type="radio"
          checked={isObject}
          onChange={({target: {checked}}) => {
            if (checked) {
              updateCurrent(path, value);
            }
          }}
        />
      </div>
      <div {...stylex.props(styles.nest)}>
        <ObjectEditor
          current={value}
          updateCurrent={(path, value) => {
            setValue(value as Record<string, unknown>);
            updateCurrent(path, value);
          }}
          view={view}
          name={''}
          path={path}
          option={option}
        />
      </div>
    </>
  );
}
