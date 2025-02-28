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
import InsertIcon from '../assets/refinements/insert.svg?react';
import {styles} from './styles';
import stylex from '@stylexjs/stylex';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {QueryContext} from '../contexts/QueryContext';
import {useQueryBuilder} from '../hooks/useQueryBuilder';

export interface ViewMenuProps {
  source: Malloy.SourceInfo;
}

export function ViewMenu({source}: ViewMenuProps) {
  const {query, setQuery} = useContext(QueryContext);
  const qb = useQueryBuilder(source, query);

  return (
    <Menu
      icon={<InsertIcon {...stylex.props(styles.menuIcon)} />}
      items={[
        {
          icon: <GroupByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Group By...',
          onClick: () => {
            const segment = qb.getOrAddDefaultSegment();
            segment.addGroupBy(
              source.schema.fields.filter(
                field => field.kind === 'dimension'
              )[0].name
            );
            setQuery?.(qb.build());
          },
        },
        {
          icon: <AggregateIcon {...stylex.props(styles.icon)} />,
          label: 'Add Measure...',
        },
        {
          icon: <LimitIcon {...stylex.props(styles.icon)} />,
          label: 'Add Limit...',
        },
        {
          icon: <OrderByIcon {...stylex.props(styles.icon)} />,
          label: 'Add Order By...',
        },
      ]}
    />
  );
}
