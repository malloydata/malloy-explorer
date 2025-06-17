/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {JSONSchemaArray} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';
import {PillInput} from '../../filters/PillInput';

export default function ArrayEditor({
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaArray, string[]>) {
  return (
    <>
      <div {...stylex.props(styles.left, styles.label)}>
        <label>{option.title ?? name}:</label>
      </div>
      <PillInput
        values={current as string[]}
        setValues={values => {
          updateCurrent(path, values);
        }}
      />
      {option.description ? <InfoHover info={option.description} /> : <div />}
    </>
  );
}
