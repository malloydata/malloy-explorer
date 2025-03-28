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
import {segmentHasLimit} from '../../utils/segment';

export interface AddGroupByProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
}

export function AddGroupBy({rootQuery, segment}: AddGroupByProps) {
  const {setQuery} = useContext(QueryEditorContext);

  const allFields = segment.getInputSchema().fields;
  const fields = allFields.filter(
    field => !segment.hasField(field.name /* TODO , field.path */)
  );

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
            <Icon name="groupBy" />
            <div>Add group by</div>
          </div>
          <Icon name="chevronRight" color="gray" />
        </div>
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <FieldMenu
          types={['dimension']}
          fields={fields}
          onClick={(field, path) => {
            segment.addGroupBy(field.name, path);
            if (!segmentHasLimit(segment)) {
              segment.setLimit(10);
            }
            segment.addOrderBy(field.name);
            setQuery?.(rootQuery.build());
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
