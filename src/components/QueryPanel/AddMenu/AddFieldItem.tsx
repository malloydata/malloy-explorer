/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {IconType} from '../../primitives';
import {ViewParent} from '../../utils/fields';
import {ParsedFilter} from '@malloydata/malloy-query-builder';
import {FieldList} from './FieldList';
import stylex from '@stylexjs/stylex';

export interface AddFieldItemProps {
  label: string;
  icon: IconType;
  view: ViewParent;
  fields: FieldInfo[];
  onAddOperation(field: FieldInfo, path: string[], filter?: ParsedFilter): void;
  types: Array<'dimension' | 'measure' | 'view'>;
  filter?: (
    view: ViewParent,
    field: Malloy.FieldInfo,
    path: string[]
  ) => boolean;
  disabledMessage?: string;
  isFilterOperation?: boolean;
  search: string;
}

export function AddFieldItem({
  view,
  fields,
  onAddOperation,
  types,
  filter,
  isFilterOperation,
  search,
}: AddFieldItemProps) {
  return (
    <FieldList
      types={types}
      filter={filter}
      view={view}
      fields={fields}
      onAddOperation={onAddOperation}
      isFilterOperation={isFilterOperation}
      search={search}
      customStyle={styles.list}
    />
  );
}

const styles = stylex.create({
  list: {
    minWidth: 250,
    maxWidth: 400,
  },
});
