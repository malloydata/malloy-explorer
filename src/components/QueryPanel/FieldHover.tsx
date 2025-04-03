/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Tooltip from '@radix-ui/react-tooltip';
import {FieldHoverCard} from '../FieldHoverCard';

export interface FieldHoverProps {
  align?: 'start' | 'center' | 'end';
  children: ReactNode;
  field: Malloy.FieldInfo;
  path: string[] | undefined;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function FieldHover({
  align = 'center',
  children,
  field,
  path,
  side = 'top',
}: FieldHoverProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={side} align={align} style={{zIndex: 1}}>
          <FieldHoverCard field={field} path={path ?? []} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
