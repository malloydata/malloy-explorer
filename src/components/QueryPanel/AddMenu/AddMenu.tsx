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
import {Button, Divider, TextInput} from '../../primitives';
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
import {segmentHasLimit, segmentNestNo} from '../../utils/segment';
import {ValueList} from './ValueList';
import {SearchIndexResult} from './hooks/useSearch';

export interface AddMenuProps {
  rootQuery: ASTQuery;
  view: ASTView | ASTQuery;
}

export function AddMenu({rootQuery, view}: AddMenuProps) {
  const [open, setOpen] = useState(false);
  const {setQuery} = useContext(QueryEditorContext);
  const [search, setSearch] = useState('');

  const segment = view.getOrAddDefaultSegment();

  return (
    <Popover.Root
      open={open}
      onOpenChange={open => {
        setOpen(open);
        if (!open) {
          setSearch('');
        }
      }}
    >
      <Popover.Trigger asChild>
        <Button
          icon="insert"
          variant="flat"
          size="compact"
          onClick={() => setOpen(!open)}
          tooltip="Add query elements"
        />
      </Popover.Trigger>
      <Popover.Content
        onPointerDownOutside={() => setOpen(false)}
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
          <div style={{overflow: 'auto', overflowY: 'scroll', flex: 1}}>
            <FieldList
              fields={segment.getInputSchema().fields}
              types={['dimension', 'measure', 'view']}
              onClick={function (field: FieldInfo, path: string[]): void {
                if (field.kind === 'dimension') {
                  segment.addGroupBy(field.name, path);
                  if (!segmentHasLimit(segment)) {
                    segment.setLimit(10);
                  }
                  segment.addOrderBy(field.name);
                } else if (field.kind === 'measure') {
                  segment.addAggregate(field.name, path);
                } else {
                  const nestNo = segmentNestNo(segment, field.name);
                  segment.addNest(
                    field.name,
                    nestNo > 1 ? `${field.name} ${nestNo}` : undefined
                  );
                }
                setQuery?.(rootQuery.build());
              }}
              search={search}
            />
            <Divider />
            <ValueList
              search={search}
              onClick={(value: SearchIndexResult) => {
                const path = value.fieldName.split('.'); // TODO handle escaped .s
                const name = path.pop() as string;
                segment.addWhere(name, path, {
                  kind: 'string',
                  parsed: {operator: '=', values: [value.fieldValue ?? '∅']},
                });
                setQuery?.(rootQuery.build());
              }}
            />
          </div>
        ) : (
          <>
            <AddGroupBy rootQuery={rootQuery} segment={segment} />
            <AddAggregate rootQuery={rootQuery} segment={segment} />
            <AddWhere rootQuery={rootQuery} segment={segment} />
            <AddView rootQuery={rootQuery} view={view} segment={segment} />
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
