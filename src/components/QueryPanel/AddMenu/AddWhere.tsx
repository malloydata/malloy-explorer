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

export interface AddWhereProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddWhere({rootQuery, segment}: AddWhereProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const fields = segment.getInputSchema().fields;

  const disabled = fields.length === 0;
  return (
    <Popover.Root>
      <Popover.Trigger asChild disabled={disabled}>
        <div
          role="menuitem"
          tabIndex={-1}
          {...stylex.props(addMenuStyles.item, addMenuStyles.clickable)}
          data-disabled={disabled ? 'true' : undefined}
        >
          <div {...stylex.props(addMenuStyles.label)}>
            <Icon name="filter" />
            <div>Add filter</div>
          </div>
          <Icon name="chevronRight" color="gray" />
        </div>
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <FieldMenu
          types={['measure']}
          fields={fields}
          onClick={(field, path) => {
            if (field.kind === 'dimension' || field.kind === 'measure') {
              if (field.type.kind === 'string_type') {
                segment.addWhere(field.name, path, '-null');
              } else if (field.type.kind === 'boolean_type') {
                segment.addWhere(field.name, path, 'true');
              } else if (field.type.kind === 'number_type') {
                segment.addWhere(field.name, path, '0');
              } else if (field.type.kind === 'date_type') {
                segment.addWhere(field.name, path, 'today');
              }
              setQuery?.(rootQuery.build());
            }
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
