/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Menu} from './Menu';
import AggregateIcon from '../assets/refinements/insert_measure.svg?react';
import GroupByIcon from '../assets/refinements/insert_group_by.svg?react';
import LimitIcon from '../assets/refinements/insert_limit.svg?react';
import OrderByIcon from '../assets/refinements/insert_order_by.svg?react';
import NestIcon from '../assets/refinements/insert_nest.svg?react';
import InsertIcon from '../assets/refinements/insert.svg?react';
import {styles} from './styles';
import stylex from '@stylexjs/stylex';
import {QueryContext} from '../contexts/QueryContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';

export interface ViewMenuProps {
  source: Malloy.SourceInfo;
  query: Malloy.Query;
  path: string[];
}

export function ViewMenu({source, query, path}: ViewMenuProps) {
  const {setQuery} = useContext(QueryContext);
  const qb = useQueryBuilder(source, query);

  if (path.length) {
    return null;
  }

  const segment = path.length
    ? qb.findView(path).getOrAddDefaultSegment()
    : qb.getOrAddDefaultSegment();

  return (
    <Menu
      icon={<InsertIcon {...stylex.props(styles.menuIcon)} />}
      items={[
        {
          icon: <GroupByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Group By...',
          onClick: () => {
            segment.addGroupBy(
              source.schema.fields.filter(
                field =>
                  field.kind === 'dimension' && !segment.hasField(field.name)
              )[0].name,
              path
            );
            setQuery?.(qb.build());
          },
          when: () => {
            return (
              source.schema.fields.filter(
                field =>
                  field.kind === 'dimension' && !segment.hasField(field.name)
              ) !== undefined
            );
          },
        },
        {
          icon: <AggregateIcon {...stylex.props(styles.icon)} />,
          label: 'Add Measure...',
          onClick: () => {
            segment.addAggregate(
              source.schema.fields.filter(
                field =>
                  field.kind === 'measure' && !segment.hasField(field.name)
              )[0].name
            );
            setQuery?.(qb.build());
          },
          when: () => {
            return (
              source.schema.fields.filter(
                field =>
                  field.kind === 'measure' && !segment.hasField(field.name)
              ) !== undefined
            );
          },
        },
        {
          icon: <LimitIcon {...stylex.props(styles.icon)} />,
          label: 'Add Limit...',
          onClick: () => {
            segment.setLimit(10);
            setQuery?.(qb.build());
          },
        },
        {
          icon: <OrderByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Order By...',
          onClick: () => {
            segment.addOrderBy(
              source.schema.fields.filter(
                field => field.kind === 'measure' || field.kind === 'dimension'
              )[0].name
            );
            setQuery?.(qb.build());
          },
        },
        {
          icon: <NestIcon {...stylex.props(styles.icon)} />,
          label: 'Add Nest...',
          onClick: () => {
            segment.addEmptyNest('nest');
            setQuery?.(qb.build());
          },
        },
      ]}
    />
  );
}
