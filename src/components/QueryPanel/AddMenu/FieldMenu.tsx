/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Divider, TextInput} from '../../primitives';
import {addMenuStyles} from './styles';
import {FieldList} from './FieldList';
export interface FieldMenuProps {
  fields: Array<Malloy.FieldInfo>;
  types: Array<'dimension' | 'measure' | 'view'>;
  onClick: (field: Malloy.FieldInfo, path: string[]) => void;
}

export function FieldMenu({fields, types, onClick}: FieldMenuProps) {
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
      <FieldList
        fields={fields}
        search={search}
        types={types}
        onClick={onClick}
      />
    </div>
  );
}
