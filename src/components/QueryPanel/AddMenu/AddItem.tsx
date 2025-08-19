/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactElement, useContext} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import stylex from '@stylexjs/stylex';
import {addMenuStyles} from './styles';
import {Icon} from '../../primitives';
import {backgroundColors} from '../../primitives/colors.stylex';
import {ThemeContext} from '../../primitives/contexts/ThemeContext';

export interface AddItemProps {
  icon?: ReactElement;
  label: string;
  detail?: ReactElement;
  onClick?: () => void;
  disable?: () => boolean;
  open?: boolean;
}

export function AddItem({
  icon,
  label,
  detail,
  disable,
  onClick,
  open,
}: AddItemProps) {
  const {theme} = useContext(ThemeContext);
  const disabled = disable?.();
  const doOnClick = () => {
    if (!disable?.()) onClick?.();
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div
          role="menuitem"
          tabIndex={-1}
          {...stylex.props(
            addMenuStyles.item,
            addMenuStyles.clickable,
            open ? styles.open : null
          )}
          onClick={doOnClick}
          data-disabled={disabled ? 'true' : undefined}
        >
          <div {...stylex.props(addMenuStyles.label)}>
            {icon}
            <div>{label}</div>
          </div>
          {open !== undefined && <Icon name="chevronRight" color="gray" />}
        </div>
      </Tooltip.Trigger>
      {detail ? (
        <Tooltip.Portal>
          <Tooltip.Content
            {...stylex.props(addMenuStyles.tooltip, theme)}
            side="right"
            align="start"
            alignOffset={-16}
          >
            {detail}
          </Tooltip.Content>
        </Tooltip.Portal>
      ) : null}
    </Tooltip.Root>
  );
}

const styles = stylex.create({
  open: {
    background: backgroundColors.accentDeemphasized,
  },
});
