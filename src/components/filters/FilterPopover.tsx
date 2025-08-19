/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Popover from '@radix-ui/react-popover';
import {FilterDialog} from './FilterDialog';
import {ParsedFilter} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from '../primitives/colors.stylex';
import {ThemeContext} from '../primitives/contexts/ThemeContext';

interface FilterPopoverProps {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  path: string[];
  filter?: ParsedFilter;
  setFilter: (filter: ParsedFilter) => void;
  trigger?: React.ReactElement;
  anchor?: React.ReactElement;
  layoutProps?: {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
    alignOffset?: number;
    sideOffset?: number;
  };
  onOpenChange?: (open: boolean) => void;
}

export function FilterPopover({
  fieldInfo,
  path,
  filter,
  setFilter,
  trigger,
  anchor,
  layoutProps,
  onOpenChange,
}: FilterPopoverProps) {
  const {theme} = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };
  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange} modal={true}>
      {anchor ? (
        <Popover.Anchor asChild>{anchor}</Popover.Anchor>
      ) : (
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      )}
      <Popover.Portal>
        <Popover.Content
          {...layoutProps}
          {...stylex.props(styles.content, theme)}
        >
          <FilterDialog
            fieldInfo={fieldInfo}
            filter={filter}
            path={path}
            onFilterApply={setFilter}
            onOpenChange={handleOpenChange}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: backgroundColors.surfaceSubtle,
    borderRadius: 8,
  },
});
