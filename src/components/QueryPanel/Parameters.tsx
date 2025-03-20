/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../styles';
import {LiteralValueEditor} from './LiteralValueEditor';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon} from '../utils/icon';

/**
 * Source
 */
export interface ParametersProps {
  rootQuery: ASTQuery;
}

export function Parameters({rootQuery}: ParametersProps) {
  const {setQuery} = useContext(QueryEditorContext);

  if (rootQuery.definition instanceof ASTArrowQueryDefinition) {
    const source = rootQuery.definition.as
      .ArrowQueryDefinition()
      .source.as.ReferenceQueryArrowSource();

    const sourceParameters = source.getSourceParameters();

    if (!sourceParameters || sourceParameters.length === 0) {
      return null;
    }

    return (
      <div {...stylex.props(styles.queryCard)}>
        <div {...stylex.props(styles.title)}>Source parameters</div>
        {sourceParameters.map((parameter, key) => (
          <TokenGroup key={key}>
            <Token
              icon={atomicTypeToIcon(parameter.type.kind)}
              label={parameter.name}
            />
            <LiteralValueEditor
              value={
                source.tryGetParameter(parameter.name)?.parameter.value ??
                parameter.default_value
              }
              setValue={value => {
                source.setParameter(parameter.name, value);
                setQuery?.(rootQuery.build());
              }}
            />
          </TokenGroup>
        ))}
      </div>
    );
  }
  return null;
}
