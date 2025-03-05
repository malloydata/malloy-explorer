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
import {TypeIcon} from './TypeIcon';
import {LiteralValue} from './LiteralValue';
import {LiteralIcon} from './LiteralIcon';
import {Label} from './Label';

/**
 * Source
 */
export interface ParametersProps {
  rootQuery: ASTQuery;
}

export function Parameters({rootQuery}: ParametersProps) {
  if (rootQuery.definition instanceof ASTArrowQueryDefinition) {
    const parameters = rootQuery.definition.sourceReference.parameters;
    if (!parameters || parameters.length === 0) {
      return null;
    }

    return (
      <div {...stylex.props(styles.heading)}>
        <div {...stylex.props(styles.title)}>Parameters:</div>
        {[...parameters.iter()].map((parameter, key) => (
          <div key={key} {...stylex.props(styles.labelWithIcon)}>
            <LiteralIcon value={parameter.parameter.value} />
            <Label>
              {parameter.parameter.name}{' '}
              <LiteralValue value={parameter.parameter.value} />
            </Label>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
