/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {LiteralValue} from './LiteralValue';
import {Label} from './Label';
import {TypeIcon} from './TypeIcon';

/**
 * Source
 */
export interface ParametersProps {
  rootQuery: ASTQuery;
}

export function Parameters({rootQuery}: ParametersProps) {
  if (rootQuery.definition instanceof ASTArrowQueryDefinition) {
    const parameters = rootQuery.definition.as
      .ArrowQueryDefinition()
      .source.as.ReferenceQueryArrowSource()
      .getSourceParameters();
    if (!parameters || parameters.length === 0) {
      return null;
    }

    return (
      <div {...stylex.props(styles.heading)}>
        <div {...stylex.props(styles.title)}>Parameters:</div>
        {parameters.map((parameter, key) => (
          <div key={key} {...stylex.props(styles.labelWithIcon)}>
            <TypeIcon type={parameter.type} />
            <Label>
              {parameter.name} <LiteralValue value={parameter.default_value} />
            </Label>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
