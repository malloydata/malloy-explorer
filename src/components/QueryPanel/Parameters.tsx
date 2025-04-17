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
import {LiteralValueEditor} from './LiteralValueEditor';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {Token, TokenGroup} from '../primitives';
import {atomicTypeToIcon} from '../utils/icon';
import CollapsiblePanel from '../primitives/CollapsiblePanel';
import stylex from '@stylexjs/stylex';

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
      <CollapsiblePanel title="Source parameters">
        <div {...stylex.props(styles.content)}>
          {sourceParameters.map(parameter => (
            <TokenGroup key={parameter.name} customStyle={styles.tokenGroup}>
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
