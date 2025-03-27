/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import Icon from '../../primitives/Icon';
import {addMenuStyles} from './styles';
import stylex from '@stylexjs/stylex';
import * as Popover from '@radix-ui/react-popover';
import {FieldMenu} from './FieldMenu';

export interface AddViewProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddView({rootQuery, segment}: AddViewProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const fields = segment.getInputSchema().fields;

  const disabled = fields.length === 0 ? 'true' : undefined;

  const nestNo = segment.operations.items.reduce((acc, operation) => {
    return operation.kind === 'nest' ? acc + 1 : acc;
  }, 1);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          {...stylex.props(addMenuStyles.item, addMenuStyles.clickable)}
          data-disabled={disabled}
        >
          <div {...stylex.props(addMenuStyles.label)}>
            <Icon name="view" />
            <div>Add view</div>
          </div>
          <Icon name="chevronRight" color="gray" />
        </div>
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <FieldMenu
          types={['view']}
          fields={fields}
          onClick={field => {
            segment.addNest(field.name, `Nest ${nestNo}`);
            setQuery?.(rootQuery.build());
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
