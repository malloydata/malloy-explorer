/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactElement} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import stylex from '@stylexjs/stylex';
import {addMenuStyles} from './styles';

export interface AddItemProps {
  icon?: ReactElement;
  label: string;
  detail?: ReactElement;
  onClick?: () => void;
  disable?: () => boolean;
}

export function AddItem({icon, label, detail, disable, onClick}: AddItemProps) {
  const disabled = disable?.();
  const doOnClick = () => {
    if (!disable?.()) onClick?.();
  };

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      {...stylex.props(addMenuStyles.item, addMenuStyles.clickable)}
      onClick={doOnClick}
      data-disabled={disabled ? 'true' : undefined}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div {...stylex.props(addMenuStyles.label)}>
            {icon}
            <div>{label}</div>
          </div>
        </Tooltip.Trigger>
        {detail ? (
          <Tooltip.Portal>
            <Tooltip.Content
              {...stylex.props(addMenuStyles.tooltip)}
              side="right"
              align="start"
              alignOffset={-16}
            >
              {detail}
            </Tooltip.Content>
          </Tooltip.Portal>
        ) : null}
      </Tooltip.Root>
    </div>
  );
}
