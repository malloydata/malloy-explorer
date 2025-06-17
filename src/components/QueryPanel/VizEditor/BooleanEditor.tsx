/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {JSONSchemaBoolean} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';

export default function BooleanEditor({
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaBoolean, boolean>) {
  return (
    <>
      <div {...stylex.props(styles.left)}>
        <label
          key={`${name}-label`}
          {...stylex.props(styles.label)}
          htmlFor={`${name}-checkbox`}
        >
          {option.title ?? name}:
        </label>
      </div>
      <div {...stylex.props(styles.right)}>
        <input
          type="checkbox"
          checked={current}
          onChange={({target: {checked}}) => {
            updateCurrent(path, checked);
          }}
          id={`${name}-checkbox`}
        />
      </div>
      {option.description ? <InfoHover info={option.description} /> : <div />}
    </>
  );
}
