/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import Icon from '../../primitives/Icon';
import {addMenuStyles} from './styles';
import stylex from '@stylexjs/stylex';
import * as Popover from '@radix-ui/react-popover';
import {FieldMenu} from './FieldMenu';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {IconType} from '../../primitives';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {fontStyles, tooltipStyles} from '../../primitives/styles';
import {ViewParent} from '../../utils/fields';

export interface AddGroupByProps {
  label: string;
  icon: IconType;
  view: ViewParent;
  fields: FieldInfo[];
  onClick(field: FieldInfo, path: string[], event: React.MouseEvent): void;
  types: Array<'dimension' | 'measure' | 'view'>;
  filter?: (
    view: ViewParent,
    field: Malloy.FieldInfo,
    path: string[]
  ) => boolean;
  disabledMessage?: string;
}

export function AddFieldItem({
  view,
  fields,
  icon,
  label,
  onClick,
  types,
  filter,
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
        <TooltipPortal>
          <TooltipContent>
            <div
              {...stylex.props(fontStyles.supporting, tooltipStyles.default)}
            >
              {disabledMessage}
            </div>
          </TooltipContent>
        </TooltipPortal>
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
      <Popover.Portal>
        <Popover.Content side="right" align="start" alignOffset={-16}>
          <Popover.Arrow width={0} height={0} />
          <FieldMenu
            types={types}
            filter={filter}
            view={view}
            fields={fields}
            onClick={onClick}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
