/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import Icon from '../../primitives/Icon';
import {addMenuStyles} from './styles';
import stylex from '@stylexjs/stylex';
import * as Popover from '@radix-ui/react-popover';
import {FieldMenu} from './FieldMenu';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {IconType} from '../../primitives';
import {Tooltip, TooltipContent, TooltipTrigger} from '@radix-ui/react-tooltip';
import {tooltipStyles} from '../../primitives/styles';

export interface AddGroupByProps {
  label: string;
  icon: IconType;
  fields: FieldInfo[];
  onClick(field: FieldInfo, path: string[]): void;
  types: Array<'dimension' | 'measure' | 'view'>;
  disabledMessage?: string;
}

export function AddFieldItem({
  fields,
  icon,
  label,
  onClick,
  types,
  disabledMessage,
}: AddGroupByProps) {
  const disabled = fields.length === 0;
  const [open, setOpen] = useState(false);

  const trigger = (
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
  );

  if (disabled && disabledMessage) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>
          <div {...stylex.props(tooltipStyles.default)}>{disabledMessage}</div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        asChild
        disabled={disabled}
        onMouseEnter={() => setOpen(true)}
      >
        {trigger}
      </Popover.Trigger>
      <Popover.Content side="right" align="start" alignOffset={-16}>
        <Popover.Arrow width={0} height={0} />
        <FieldMenu types={types} fields={fields} onClick={onClick} />
      </Popover.Content>
    </Popover.Root>
  );
}
