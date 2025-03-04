/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Menu, MenuItem} from './Menu';
import AggregateIcon from '../assets/refinements/insert_measure.svg?react';
import GroupByIcon from '../assets/refinements/insert_group_by.svg?react';
import LimitIcon from '../assets/refinements/insert_limit.svg?react';
import OrderByIcon from '../assets/refinements/insert_order_by.svg?react';
import NestIcon from '../assets/refinements/insert_nest.svg?react';
import InsertIcon from '../assets/refinements/insert.svg?react';
import QueryIcon from '../assets/types/type-icon-query.svg?react';
import {styles} from './styles';
import stylex from '@stylexjs/stylex';
import {QueryContext} from '../contexts/QueryContext';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {TypeIcon} from './TypeIcon';
import {JoinIcon} from './JoinIcon';

export interface ViewMenuProps {
  rootQuery: ASTQuery;
  view: ASTView | ASTQuery;
}

export function ViewMenu({rootQuery, view}: ViewMenuProps) {
  const {setQuery} = useContext(QueryContext);

  const segment = view.getOrAddDefaultSegment();

  const schema = segment.getInputSchema();

  console.log('ViewMenu schema', schema);

  const createGroupByMenu = (
    fields: Malloy.FieldInfo[],
    path: string[]
  ): MenuItem[] => {
    return fields
      .filter(field => field.kind === 'dimension' || field.kind === 'join')
      .map(field => {
        if (field.kind === 'dimension') {
          return {
            icon: <TypeIcon type={field.type} />,
            label: field.name,
            detail: <div>Path: {[...path, field.name].join('.')}</div>,
            onClick: () => {
              segment.addGroupBy(field.name, path);
              setQuery?.(rootQuery.build());
            },
          };
        } else {
          return {
            icon: <JoinIcon relationship={field.relationship} />,
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
      .map(field => {
        if (field.kind === 'measure') {
          return {
            icon: <TypeIcon type={field.type} />,
            label: field.name,
            detail: <div>Path: {[...path, field.name].join('.')}</div>,
            onClick: () => {
              segment.addAggregate(field.name, path);
              setQuery?.(rootQuery.build());
            },
          };
        } else {
          return {
            icon: <JoinIcon relationship={field.relationship} />,
            label: field.name,
            subMenu: createAggregateMenu(field.schema.fields, [
              ...path,
              field.name,
            ]),
          };
        }
      });
  };

  const groupByMenu: MenuItem[] = createGroupByMenu(schema.fields, []);
  const aggregateMenu: MenuItem[] = createAggregateMenu(schema.fields, []);

  let outputSchemaFields: Malloy.FieldInfo[] = [];

  try {
    outputSchemaFields = segment.getOutputSchema().fields;
    console.log(outputSchemaFields);
  } catch (error) {
    console.error(error); // TODO remove when fixed
    debugger;
  }

  const orderByMenu: MenuItem[] = outputSchemaFields
    .filter(field => field.kind === 'dimension' || field.kind === 'measure')
    .map(field => {
      return {
        icon: <TypeIcon type={field.type} />,
        label: field.name,
        onClick: () => {
          segment.addOrderBy(field.name);
          setQuery?.(rootQuery.build());
        },
      };
    });

  const nestMenu: MenuItem[] = schema.fields
    .filter(field => field.kind === 'view')
    .map(field => {
      return {
        icon: <QueryIcon {...stylex.props(styles.icon)} />,
        label: field.name,
        onClick: () => {
          segment.addNest(field.name);
          setQuery?.(rootQuery.build());
        },
      };
    });

  nestMenu.unshift({
    label: 'New Nest...',
    onClick: () => {
      segment.addEmptyNest('nest');
      setQuery?.(rootQuery.build());
    },
  });

  return (
    <Menu
      icon={<InsertIcon {...stylex.props(styles.menuIcon)} />}
      items={[
        {
          icon: <GroupByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Group By',
          subMenu: groupByMenu,
        },
        {
          icon: <AggregateIcon {...stylex.props(styles.icon)} />,
          label: 'Add Aggregate',
          subMenu: aggregateMenu,
        },
        {
          icon: <OrderByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Order By',
          subMenu: orderByMenu,
        },
        {
          icon: <NestIcon {...stylex.props(styles.icon)} />,
          label: 'Add Nest',
          subMenu: nestMenu,
        },
        {
          icon: <LimitIcon {...stylex.props(styles.icon)} />,
          label: 'Set Limit...',
          onClick: () => {
            segment.setLimit(10);
            setQuery?.(rootQuery.build());
          },
        },
      ]}
    />
  );
}
