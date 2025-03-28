/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import {ASTView, ASTQuery} from '@malloydata/malloy-query-builder';
import * as Popover from '@radix-ui/react-popover';
import stylex from '@stylexjs/stylex';
import {Divider, Icon, TextInput} from '../../primitives';
import {colors} from './colors.stylex';
import {AddLimit} from './AddLimit';
import {AddEmptyNest} from './AddEmptyNest';
import {addMenuStyles} from './styles';
import {AddOrderBy} from './AddOrderBy';
import {AddGroupBy} from './AddGroupBy';
import {AddAggregate} from './AddAggregate';
import {AddWhere} from './AddWhere';
import {AddView} from './AddView';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {FieldList} from './FieldList';

export interface AddMenuProps {
  rootQuery: ASTQuery;
  view: ASTView | ASTQuery;
}

export function AddMenu({rootQuery, view}: AddMenuProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const [search, setSearch] = useState('');

  const segment = view.getOrAddDefaultSegment();

  return (
    <Popover.Root
      onOpenChange={open => {
        if (!open) {
          setSearch('');
        }
      }}
    >
      <Popover.Trigger asChild>
        <div {...stylex.props(styles.trigger)}>
          <Icon name="insert" />
          <span>Add</span>
        </div>
      </Popover.Trigger>
      <Popover.Content
        {...stylex.props(addMenuStyles.content)}
        side="bottom"
        align="start"
        role="menu"
      >
        <div {...stylex.props(addMenuStyles.item)}>
          <TextInput
            icon="search"
            value={search}
            onChange={setSearch}
            placeholder="Search..."
          />
        </div>
        <Divider />
        {search ? (
          <FieldList
            fields={segment.getInputSchema().fields}
            types={['dimension', 'measure', 'view']}
            onClick={function (field: FieldInfo, path: string[]): void {
              if (field.kind === 'dimension') {
                segment.addGroupBy(field.name, path);
              } else if (field.kind === 'measure') {
                segment.addAggregate(field.name, path);
              } else {
                const nestNo = segment.operations.items.reduce(
                  (acc, operation) => {
                    return operation.kind === 'nest' ? acc + 1 : acc;
                  },
                  1
                );
                segment.addNest(field.name, `Nest ${nestNo}`);
              }
              setQuery?.(rootQuery.build());
            }}
            search={search}
          />
        ) : (
          <>
            <AddGroupBy rootQuery={rootQuery} segment={segment} />
            <AddAggregate rootQuery={rootQuery} segment={segment} />
            <AddWhere rootQuery={rootQuery} segment={segment} />
            <AddView rootQuery={rootQuery} segment={segment} />
            <Divider />
            <AddLimit rootQuery={rootQuery} segment={segment} />
            <AddOrderBy rootQuery={rootQuery} segment={segment} />
            <AddEmptyNest rootQuery={rootQuery} segment={segment} />
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}

const styles = stylex.create({
  trigger: {
    padding: 6,
    border: 'none',
    background: {
      default: 'transparent',
      ':hover': colors.hover,
    },
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 4,
  },
});
