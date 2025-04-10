/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {hoverStyles} from './hover.stylex';
import {styles as commonStyles} from '../../styles';
import {FieldMenu} from '../AddMenu/FieldMenu';
import stylex from '@stylexjs/stylex';

export interface OperationActionTitleProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  title: string;
  actionTitle: string;
  fields: Malloy.FieldInfo[];
  types: Array<'dimension' | 'measure' | 'view'>;
  onClick: (field: Malloy.FieldInfo, path: string[]) => void;
}

export function OperationActionTitle({
  actionTitle,
  segment,
  fields,
  title,
  types,
  onClick,
}: OperationActionTitleProps) {
  return (
    <div {...stylex.props(commonStyles.title, hoverStyles.main)}>
      <div>{title}</div>
      <div {...stylex.props(hoverStyles.hoverActions)}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <div {...stylex.props(styles.action)}>{actionTitle}</div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.PopoverContent
              side="right"
              align="start"
              alignOffset={-16}
            >
              <FieldMenu
                segment={segment}
                fields={fields}
                types={types}
                filter={(segment, field, path) =>
                  !segment.hasField(field.name, path)
                }
                onClick={onClick}
              />
            </Popover.PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}

const styles = stylex.create({
  action: {
    background: 'transparent',
    color: '#0064E0',
    marginLeft: 16,
    cursor: 'pointer',
  },
});
