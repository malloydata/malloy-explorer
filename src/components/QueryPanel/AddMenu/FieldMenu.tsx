/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {Divider, TextInput} from '../../primitives';
import {addMenuStyles} from './styles';
import {FieldList} from './FieldList';
export interface FieldMenuProps {
  segment: ASTSegmentViewDefinition;
  fields: Array<Malloy.FieldInfo>;
  types: Array<'dimension' | 'measure' | 'view'>;
  removeDuplicates?: boolean;
  onClick: (field: Malloy.FieldInfo, path: string[]) => void;
}

export function FieldMenu({
  segment,
  fields,
  types,
  removeDuplicates = false,
  onClick,
}: FieldMenuProps) {
  const [search, setSearch] = useState('');

  return (
    <div {...stylex.props(addMenuStyles.content)} role="menu">
      <div {...stylex.props(addMenuStyles.item)}>
        <TextInput
          icon="search"
          value={search}
          onChange={setSearch}
          placeholder="Search..."
        />
      </div>
      <Divider />
      <div style={{overflow: 'auto', overflowY: 'scroll', flex: 1}}>
        <FieldList
          segment={segment}
          fields={fields}
          search={search}
          types={types}
          removeDuplicates={removeDuplicates}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
