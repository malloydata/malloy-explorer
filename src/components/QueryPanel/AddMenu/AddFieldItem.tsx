/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import Icon from '../../primitives/Icon';
import {addMenuStyles} from './styles';
import stylex from '@stylexjs/stylex';
import * as Popover from '@radix-ui/react-popover';
import {FieldMenu} from './FieldMenu';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {IconType} from '../../primitives';

export interface AddGroupByProps {
  label: string;
  icon: IconType;
  fields: FieldInfo[];
  onClick(field: FieldInfo, path: string[]): void;
  types: Array<'dimension' | 'measure' | 'view'>;
}

export function AddFieldItem({
  fields,
  icon,
  label,
  onClick,
  types,
}: AddGroupByProps) {
  const disabled = fields.length === 0;
  return (
    <Popover.Root>
      <Popover.Trigger asChild disabled={disabled}>
        <div
          role="menuitem"
          tabIndex={-1}
          {...stylex.props(addMenuStyles.item, addMenuStyles.clickable)}
          data-disabled={disabled ? 'true' : undefined}
        >
          <div {...stylex.props(addMenuStyles.label)}>
            <Icon name={icon} />
            <div>{label}</div>
          </div>
          <Icon name="chevronRight" color="gray" />
        </div>
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <FieldMenu types={types} fields={fields} onClick={onClick} />
      </Popover.Content>
    </Popover.Root>
  );
}
