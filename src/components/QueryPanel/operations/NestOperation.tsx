/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  ASTNestViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {View} from '../View';
import {Icon} from '../../primitives';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {useContext} from 'react';
import CollapsiblePanel from '../../primitives/CollapsiblePanel';

export interface NestOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  nests: ASTNestViewOperation[];
}

const viewStyles = stylex.create({
  indent: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    width: '100%',
  },
});

export function NestOperations({rootQuery, nests}: NestOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  if (nests.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.tokenContainer)}>
      {nests.map((nest, key) => {
        const actions = [
          {
            icon: <Icon name="clear" />,
            label: 'Delete Query',
            onClick: () => {
              nest.delete();
              setQuery?.(rootQuery.build());
            },
          },
        ];

        return (
          <div key={key} {...stylex.props(viewStyles.indent)}>
            <CollapsiblePanel title={nest.name} icon="nest" menuItems={actions}>
              <View rootQuery={rootQuery} view={nest.view} />
            </CollapsiblePanel>
          </div>
        );
      })}
    </div>
  );
}
