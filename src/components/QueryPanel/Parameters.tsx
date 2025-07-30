/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {
  ASTArrowQueryDefinition,
  ASTQueryDefinition,
  ASTReferenceQueryArrowSource,
} from '@malloydata/malloy-query-builder';
import {LiteralValueEditor} from './LiteralValueEditor';
import {Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon} from '../utils/icon';
import CollapsiblePanel from '../primitives/CollapsiblePanel';
import {useUpdateQuery} from '../../hooks/useQueryUpdate';

/**
 * Source
 */
export interface ParametersProps {
  definition: ASTQueryDefinition;
}

export function Parameters({definition}: ParametersProps) {
  const updateQuery = useUpdateQuery();

  if (
    definition instanceof ASTArrowQueryDefinition &&
    definition.source instanceof ASTReferenceQueryArrowSource
  ) {
    const {source} = definition;

    const sourceParameters = source.getSourceParameters();

    if (!sourceParameters || sourceParameters.length === 0) {
      return null;
    }

    return (
      <CollapsiblePanel title="Source parameters">
        <div {...stylex.props(styles.content)}>
          {sourceParameters.map(parameter => (
            <TokenGroup key={parameter.name} customStyle={styles.tokenGroup}>
              <Token
                icon={atomicTypeToIcon(parameter.type.kind)}
                label={parameter.name}
              />
              <LiteralValueEditor
                filterType={
                  parameter.type.kind === 'filter_expression_type'
                    ? parameter.type.filter_type.kind
                    : 'string_type'
                }
                value={
                  source.tryGetParameter(parameter.name)?.parameter.value ??
                  parameter.default_value
                }
                setValue={value => {
                  source.setParameter(parameter.name, value);
                  updateQuery();
                }}
              />
            </TokenGroup>
          ))}
        </div>
      </CollapsiblePanel>
    );
  }
  return null;
}

const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingLeft: '16px',
  },
  tokenGroup: {
    display: 'flex',
  },
});
