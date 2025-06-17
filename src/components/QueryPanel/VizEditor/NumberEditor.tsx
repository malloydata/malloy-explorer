/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {JSONSchemaNumber} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';

export default function NumberEditor({
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaNumber>) {
  return (
    <>
      <div {...stylex.props(styles.left, styles.label)}>
        <label>{option.title ?? name}:</label>
      </div>
      <input
        value={current as number}
        type="number"
        min={option.minimum}
        max={option.maximum}
        onChange={({target: {valueAsNumber}}) => {
          updateCurrent(path, valueAsNumber);
        }}
        key={name}
      />
      {option.description ? <InfoHover info={option.description} /> : <div />}
    </>
  );
}
