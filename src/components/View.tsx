/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {ViewDefinition} from './ViewDefinition';
import {ViewMenu} from './ViewMenu';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';

const viewStyles = stylex.create({
  indent: {
    marginLeft: 12,
    width: '100%',
  },
});

export interface ViewProps {
  astQuery: ASTQuery;
  view: ASTView;
}

export function View({astQuery, view}: ViewProps) {
  return (
    <div {...stylex.props(viewStyles.indent)}>
      <div {...stylex.props(styles.queryHeader)}>
        <div {...stylex.props(styles.title)}>Query:</div>
        <ViewMenu astQuery={astQuery} view={view} />
      </div>
      <ViewDefinition astQuery={astQuery} viewDef={view.definition} />
    </div>
  );
}
