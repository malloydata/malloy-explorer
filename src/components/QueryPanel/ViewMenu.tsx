/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Menu, MenuItem} from '../Menu';
import AggregateIcon from '../../assets/refinements/insert_measure.svg?react';
import GroupByIcon from '../../assets/refinements/insert_group_by.svg?react';
import FilterIcon from '../../assets/refinements/insert_filter.svg?react';
import LimitIcon from '../../assets/refinements/insert_limit.svg?react';
import OrderByIcon from '../../assets/refinements/insert_order_by.svg?react';
import NestIcon from '../../assets/refinements/insert_nest.svg?react';
import QueryIcon from '../../assets/types/type-icon-query.svg?react';
import {styles} from '../styles';
import stylex from '@stylexjs/stylex';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {LimitDialog} from '../dialogs/LimitDialog';
import {FilterDialog} from '../dialogs/FilterDialog';
import {Icon} from '../primitives';
import {atomicTypeToIcon, relationshipToIcon} from '../utils/icon';
import {Label} from '../Label';

export interface ViewMenuProps {
  rootQuery: ASTQuery;
  view: ASTView | ASTQuery;
}

const FILTERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;

const ORDERABLE_TYPES: Malloy.AtomicTypeType[] = [
  'string_type',
  'number_type',
  'boolean_type',
  'date_type',
  'timestamp_type',
] as const;

export function ViewMenu({rootQuery, view}: ViewMenuProps) {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterField, setFilterField] = useState<
    Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure | undefined
  >(undefined);
  const [limitDialogOpen, setLimitDialogOpen] = useState(false);

  const {setQuery} = useContext(QueryEditorContext);

  const segment = view.getOrAddDefaultSegment();

  const schema = segment.getInputSchema();

  const createGroupByMenu = (
    fields: Malloy.FieldInfo[],
    path: string[]
  ): MenuItem[] => {
    return fields
      .filter(field => field.kind === 'dimension' || field.kind === 'join')
      .filter(
        field => field.kind === 'join' || !segment.hasField(field.name, path)
      )
      .map(field => {
        if (field.kind === 'dimension') {
          return {
            icon: <Icon name={atomicTypeToIcon(field.type.kind)} />,
            label: field.name,
            detail: <div>Path: {[...path, field.name].join('.')}</div>,
            onClick: () => {
              segment.addGroupBy(field.name, path);
              setQuery?.(rootQuery.build());
            },
          };
        } else {
          return {
            icon: <Icon name={relationshipToIcon(field.relationship)} />,
            label: field.name,
            subMenu: createGroupByMenu(field.schema.fields, [
              ...path,
              field.name,
            ]),
          };
        }
      });
  };

  const createAggregateMenu = (
    fields: Malloy.FieldInfo[],
    path: string[]
  ): MenuItem[] => {
    return fields
      .filter(field => field.kind === 'measure' || field.kind === 'join')
      .filter(
        field => field.kind === 'join' || !segment.hasField(field.name, path)
      )
      .map(field => {
        if (field.kind === 'measure') {
          return {
            icon: <Icon name={atomicTypeToIcon(field.type.kind)} />,
            label: field.name,
            detail: <div>Path: {[...path, field.name].join('.')}</div>,
            onClick: () => {
              segment.addAggregate(field.name, path);
              setQuery?.(rootQuery.build());
            },
          };
        } else {
          return {
            icon: <Icon name={relationshipToIcon(field.relationship)} />,
            label: field.name,
            subMenu: createAggregateMenu(field.schema.fields, [
              ...path,
              field.name,
            ]),
          };
        }
      });
  };

  const createFilterMenu = (
    fields: Malloy.FieldInfo[],
    path: string[]
  ): MenuItem[] => {
    return fields
      .filter(
        field =>
          field.kind === 'dimension' ||
          field.kind === 'measure' ||
          field.kind === 'join'
      )
      .filter(
        field =>
          field.kind === 'join' || FILTERABLE_TYPES.includes(field.type.kind)
      )
      .map(field => {
        if (field.kind === 'dimension' || field.kind === 'measure') {
          return {
            icon: <Icon name={atomicTypeToIcon(field.type.kind)} />,
            label: field.name,
            detail: <div>Path: {[...path, field.name].join('.')}</div>,
            onClick: () => {
              setFilterDialogOpen(true);
              setFilterField(field);
            },
          };
        } else {
          return {
            icon: <Icon name={relationshipToIcon(field.relationship)} />,
            label: field.name,
            subMenu: createFilterMenu(field.schema.fields, [
              ...path,
              field.name,
            ]),
          };
        }
      });
  };

  const groupByMenu: MenuItem[] = createGroupByMenu(schema.fields, []);
  const aggregateMenu: MenuItem[] = createAggregateMenu(schema.fields, []);
  const filterMenu: MenuItem[] = createFilterMenu(schema.fields, []);

  const outputSchemaFields: Malloy.FieldInfo[] =
    segment.getOutputSchema().fields;

  const orderByMenu: MenuItem[] = outputSchemaFields
    .filter(field => field.kind === 'dimension')
    .filter(field => ORDERABLE_TYPES.includes(field.type.kind))
    .map(field => {
      return {
        icon: <Icon name={atomicTypeToIcon(field.type.kind)} />,
        label: field.name,
        subMenu: [
          {
            label: 'Ascending',
            onClick: () => {
              segment.addOrderBy(field.name, 'asc');
              setQuery?.(rootQuery.build());
            },
          },
          {
            label: 'Descending',
            onClick: () => {
              segment.addOrderBy(field.name, 'desc');
              setQuery?.(rootQuery.build());
            },
          },
        ],
      };
    });

  const nestMenu: MenuItem[] = schema.fields
    .filter(field => field.kind === 'view')
    .map(field => {
      return {
        icon: <QueryIcon {...stylex.props(styles.icon)} />,
        label: field.name,
        onClick: () => {
          if (view === rootQuery && rootQuery.isEmpty()) {
            rootQuery.setView(field.name);
          } else {
            segment.addNest(field.name, 'Nest');
          }
          setQuery?.(rootQuery.build());
        },
      };
    });

  const hasLimit =
    segment.operations.items.find(operation => operation.kind === 'limit') !==
    undefined;

  return (
    <>
      <Menu
        trigger={
          <div {...stylex.props(styles.labelWithIcon, viewMenuStyles.p6)}>
            <Icon name="insert" />
            <Label>Add</Label>
          </div>
        }
        items={[
          {
            icon: <QueryIcon {...stylex.props(styles.icon)} />,
            label: 'Views',
            subMenu: nestMenu,
          },
          {
            icon: <FilterIcon {...stylex.props(styles.icon)} />,
            label: 'Filter',
            subMenu: filterMenu,
          },
          {
            icon: <AggregateIcon {...stylex.props(styles.icon)} />,
            label: 'Aggregate',
            subMenu: aggregateMenu,
          },
          {
            icon: <GroupByIcon {...stylex.props(styles.icon)} />,
            label: 'Group By',
            subMenu: groupByMenu,
          },
          {
            label: '-',
          },
          {
            icon: <LimitIcon {...stylex.props(styles.icon)} />,
            label: 'Limit',
            onClick: () => {
              setLimitDialogOpen(true);
            },
            disable: () => hasLimit,
          },
          {
            icon: <OrderByIcon {...stylex.props(styles.icon)} />,
            label: 'Order By',
            subMenu: orderByMenu,
            disable: () => outputSchemaFields.length === 0,
          },
          {
            icon: <NestIcon {...stylex.props(styles.icon)} />,
            label: 'Add blank nested query',
            onClick: () => {
              segment.addEmptyNest('nest');
              setQuery?.(rootQuery.build());
            },
          },
        ]}
      />
      <LimitDialog
        open={limitDialogOpen}
        setOpen={setLimitDialogOpen}
        rootQuery={rootQuery}
        segment={segment}
      />
      <FilterDialog
        open={filterDialogOpen}
        setOpen={setFilterDialogOpen}
        rootQuery={rootQuery}
        segment={segment}
        filterField={filterField}
      />
    </>
  );
}

const viewMenuStyles = stylex.create({
  p6: {
    padding: 6,
  },
});
