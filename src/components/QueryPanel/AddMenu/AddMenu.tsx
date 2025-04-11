/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import {ASTQuery} from '@malloydata/malloy-query-builder';
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
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';

export interface AddMenuProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddMenu({rootQuery, view}: AddMenuProps) {
  const [open, setOpen] = useState(false);
  const {setQuery} = useContext(QueryEditorContext);
  const [search, setSearch] = useState('');

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
      <Popover.Portal>
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
                view={view}
                fields={getInputSchemaFromViewParent(view).fields}
                types={['dimension', 'measure', 'view']}
                onClick={function (field: FieldInfo, path: string[]): void {
                  const segment = view.getOrAddDefaultSegment();
                  if (field.kind === 'dimension') {
                    segment.addGroupBy(field.name, path);
                    if (!segmentHasLimit(segment)) {
                      segment.setLimit(1000);
                    }
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
                  const segment = view.getOrAddDefaultSegment();
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
              <AddGroupBy rootQuery={rootQuery} view={view} />
              <AddAggregate rootQuery={rootQuery} view={view} />
              <AddWhere rootQuery={rootQuery} view={view} />
              <AddView rootQuery={rootQuery} view={view} />
              <Divider />
              <AddLimit rootQuery={rootQuery} view={view} />
              <AddOrderBy rootQuery={rootQuery} view={view} />
              <AddEmptyNest rootQuery={rootQuery} view={view} />
            </>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
