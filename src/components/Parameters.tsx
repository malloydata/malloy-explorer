/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import DatabaseIcon from '../assets/types/type-icon-database.svg?react';
import {styles} from './styles';
import {TypeIcon} from './TypeIcon';
import {LiteralValue} from './LiteralValue';

/**
 * Source
 */
export interface ParametersProps {
  parameters?: Malloy.ParameterInfo[];
}

export function Parameters({parameters}: ParametersProps) {
  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.heading)}>
      <div {...stylex.props(styles.title)}>Parameters:</div>
      {parameters.map((parameter, key) => (
        <div key={key} {...stylex.props(styles.labelWithIcon)}>
          <TypeIcon type={parameter.type} /> {parameter.name}{' '}
          <LiteralValue value={parameter.default_value} />
        </div>
      ))}
    </div>
  );
}
