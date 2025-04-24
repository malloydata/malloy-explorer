/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery} from '@malloydata/malloy-query-builder';
import {hoverStyles} from './hover.stylex';
import {styles as commonStyles} from '../../styles';
import {FieldMenu} from '../AddMenu/FieldMenu';
import stylex from '@stylexjs/stylex';
import {viewParentDoesNotHaveField, ViewParent} from '../../utils/fields';

export interface OperationActionTitleProps {
  rootQuery: ASTQuery;
  view: ViewParent;
  title: string;
  actionTitle: string;
  fields: Malloy.FieldInfo[];
  types: Array<'dimension' | 'measure' | 'view'>;
  onClick: (field: Malloy.FieldInfo, path: string[]) => void;
}

export function OperationActionTitle({
  actionTitle,
  view,
  fields,
  title,
  types,
  onClick,
}: OperationActionTitleProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div {...stylex.props(commonStyles.title, hoverStyles.main)}>
      <div>{title}</div>
      <div
        {...stylex.props(
          hoverStyles.hoverActions,
          isMenuOpen ? hoverStyles.hoverOpen : undefined
        )}
      >
        <Popover.Root onOpenChange={setIsMenuOpen}>
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
                view={view}
                fields={fields}
                types={types}
                filter={viewParentDoesNotHaveField}
                onAddOperation={onClick}
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
