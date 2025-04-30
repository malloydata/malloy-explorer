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
import {Button, Divider, Icon, TextInput} from '../../primitives';
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
import {
  addAggregate,
  addGroupBy,
  addNest,
  getSegmentIfPresent,
} from '../../utils/segment';
import {ValueList} from './ValueList';
import {SearchIndexResult} from './hooks/useSearch';
import {
  getInputSchemaFromViewParent,
  isNotAnnotatedFilteredField,
  ViewParent,
} from '../../utils/fields';
import {AddItem} from './AddItem';

export interface AddMenuProps {
  rootQuery: ASTQuery;
  view: ViewParent;
}

export function AddMenu({rootQuery, view}: AddMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const {setQuery} = useContext(QueryEditorContext);
  const [search, setSearch] = useState('');
  const segment = getSegmentIfPresent(view);

  const toggleActive = (toggle: string) => {
    if (toggle === active) {
      setActive('');
    } else {
      setActive(toggle);
    }
  };

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
              customStyle={styles.search}
            />
          </div>
          <Divider />
          <div {...stylex.props(styles.body)}>
            {search && !active ? (
              <div {...stylex.props(styles.searchList)}>
                <FieldList
                  view={view}
                  fields={getInputSchemaFromViewParent(view).fields}
                  filter={(_, field, path) =>
                    !segment?.hasField(field.name, path) &&
                    isNotAnnotatedFilteredField(field)
                  }
                  types={['dimension', 'measure', 'view']}
                  onAddOperation={function (
                    field: FieldInfo,
                    path: string[]
                  ): void {
                    if (field.kind === 'dimension') {
                      addGroupBy(view, field, path);
                    } else if (field.kind === 'measure') {
                      addAggregate(view, field, path);
                    } else {
                      addNest(view, field);
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
                      parsed: {
                        operator: '=',
                        values: [value.fieldValue ?? '∅'],
                      },
                    });
                    setQuery?.(rootQuery.build());
                  }}
                />
              </div>
            ) : (
              <div
                data-testid="add-menu-operations"
                {...stylex.props(styles.operations)}
              >
                <AddItem
                  icon={<Icon name="groupBy" />}
                  label="Add group by"
                  onClick={() => toggleActive('group_by')}
                  open={active === 'group_by'}
                />
                <AddItem
                  icon={<Icon name="aggregate" />}
                  label="Add aggregate"
                  onClick={() => toggleActive('aggregate')}
                  open={active === 'aggregate'}
                />
                <AddItem
                  icon={<Icon name="filter" />}
                  label="Add filter"
                  onClick={() => toggleActive('where')}
                  open={active === 'where'}
                />
                <AddItem
                  icon={<Icon name="view" />}
                  label="Add view"
                  onClick={() => toggleActive('view')}
                  open={active === 'view'}
                />
                <Divider />
                <AddLimit rootQuery={rootQuery} view={view} />
                <AddItem
                  icon={<Icon name="orderBy" />}
                  label="Order by"
                  onClick={() => toggleActive('order_by')}
                  open={active === 'order_by'}
                />
                <AddEmptyNest rootQuery={rootQuery} view={view} />
              </div>
            )}
            <div
              data-testid="add-menu-right-column"
              style={{overflowY: 'auto'}}
            >
              {active === 'group_by' && (
                <AddGroupBy rootQuery={rootQuery} view={view} search={search} />
              )}
              {active === 'aggregate' && (
                <AddAggregate
                  rootQuery={rootQuery}
                  view={view}
                  search={search}
                />
              )}
              {active === 'where' && (
                <AddWhere rootQuery={rootQuery} view={view} search={search} />
              )}
              {active === 'view' && (
                <AddView rootQuery={rootQuery} view={view} search={search} />
              )}
              {active === 'order_by' && (
                <AddOrderBy rootQuery={rootQuery} view={view} search={search} />
              )}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const styles = stylex.create({
  body: {
    display: 'flex',
    overflowY: 'auto',
    paddingBottom: 8,
    maxHeight: '20em',
  },
  search: {
    width: '100%',
  },
  searchList: {
    overflowY: 'auto',
  },
  operations: {
    width: '15em',
  },
});
