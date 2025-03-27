/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
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

export interface AddEmptyNestProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddOrderBy({rootQuery, segment}: AddEmptyNestProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const outputSchemaFields = segment.getOutputSchema().fields;

  const fields = outputSchemaFields
    .filter(field => field.kind === 'dimension')
    .filter(field => ORDERABLE_TYPES.includes(field.type.kind));

  const disabled = fields.length === 0 ? 'true' : undefined;
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          role="menuitem"
          tabIndex={-1}
          {...stylex.props(addMenuStyles.item, addMenuStyles.clickable)}
          data-disabled={disabled}
        >
          <div {...stylex.props(addMenuStyles.label)}>
            <Icon name="orderBy" />
            <div>Add order by</div>
          </div>
          <Icon name="chevronRight" color="gray" />
        </div>
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <FieldMenu
          types={['dimension']}
          fields={fields}
          onClick={field => {
            segment.addOrderBy(field.name, 'asc');
            setQuery?.(rootQuery.build());
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}

const ORDERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;
