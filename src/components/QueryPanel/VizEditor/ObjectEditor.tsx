/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {JSONSchemaObject} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import OneOfEditor from './OneOfEditor';
import ArrayEditor from './ArrayEditor';
import NumberEditor from './NumberEditor';
import StringEditor from './StringEditor';
import BooleanEditor from './BooleanEditor';
import FieldEditor from './FieldEditor';

export default function ObjectEditor({
  view,
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaObject, Record<string, unknown>>) {
  return (
    <>
      {name ? (
        <div {...stylex.props(styles.label, styles.heading)}>
          <label>{option.title ?? name}</label>
        </div>
      ) : null}
      {Object.entries(option.properties).map(([subName, subOption]) => {
        const key = [...path, name, subName].join('.');
        if (subOption.type === 'boolean') {
          return (
            <BooleanEditor
              view={view}
              name={subName}
              path={[...path, subName]}
              option={subOption}
              current={current[subName] as boolean}
              updateCurrent={updateCurrent}
              key={key}
            />
          );
        } else if (subOption.type === 'string') {
          return (
            <StringEditor
              view={view}
              name={subName}
              path={[...path, subName]}
              option={subOption}
              current={current[subName] as string}
              updateCurrent={updateCurrent}
              key={key}
            />
          );
        } else if (subOption.type === 'number') {
          return (
            <NumberEditor
              view={view}
              name={subName}
              path={[...path, subName]}
              option={subOption}
              current={current[subName] as number}
              updateCurrent={updateCurrent}
              key={key}
            />
          );
        } else if (subOption.type === 'object') {
          return (
            <ObjectEditor
              view={view}
              name={subName}
              path={[...path, subName]}
              option={subOption}
              current={(current[subName] ?? {}) as Record<string, unknown>}
              updateCurrent={updateCurrent}
              key={key}
            />
          );
        } else if (subOption.type === 'array') {
          if (subOption.items.type === 'string') {
            if (
              'subtype' in subOption.items &&
              subOption.items.subtype === 'field'
            ) {
              return (
                <FieldEditor
                  view={view}
                  name={subName}
                  path={[...path, subName]}
                  option={subOption}
                  current={(current[subName] ?? []) as string[]}
                  updateCurrent={updateCurrent}
                  key={key}
                />
              );
            } else {
              return (
                <ArrayEditor
                  view={view}
                  name={subName}
                  path={[...path, subName]}
                  option={subOption}
                  current={(current[subName] ?? []) as string[]}
                  updateCurrent={updateCurrent}
                  key={key}
                />
              );
            }
          } else {
            console.warn('Unsupported array type', subOption.items.type);
          }
        } else if (subOption.type === 'oneOf') {
          return (
            <OneOfEditor
              view={view}
              name={subName}
              path={[...path, subName]}
              option={subOption}
              current={current[subName]}
              updateCurrent={updateCurrent}
              key={key}
            />
          );
        }
        return null;
      })}
      <div {...stylex.props(styles.divider)} />
    </>
  );
}
