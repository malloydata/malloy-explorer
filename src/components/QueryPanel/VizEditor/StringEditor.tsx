/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {JSONSchemaString} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';
import {SelectDropdown} from '../../primitives/SelectDropdown';

export default function StringEditor({
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaString>) {
  if (option.enum) {
    return (
      <>
        <div {...stylex.props(styles.left, styles.label)} key={`${name}-label`}>
          <label>{option.title ?? name}:</label>
        </div>
        <SelectDropdown
          value={current as string}
          options={option.enum.map(value => ({
            label: value,
            value,
          }))}
          onChange={value => {
            updateCurrent(path, value as string);
          }}
          key={name}
        />
        {option.description ? <InfoHover info={option.description} /> : <div />}
      </>
    );
  } else {
    return (
      <>
        <div {...stylex.props(styles.left, styles.label)} key={`${name}-label`}>
          <label>{option.title ?? name}:</label>
        </div>
        <input
          value={current as string}
          onChange={({target: {value}}) => {
            updateCurrent(path, value);
          }}
          key={name}
        />
        {option.description ? <InfoHover info={option.description} /> : <div />}
      </>
    );
  }
}
