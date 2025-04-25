/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Popover from '@radix-ui/react-popover';
import {FilterDialog} from './FilterDialog';
import {ParsedFilter} from '@malloydata/malloy-query-builder';
import stylex from '@stylexjs/stylex';

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
}

export function FilterPopover({
  fieldInfo,
  path,
  filter,
  setFilter,
  trigger,
  anchor,
  layoutProps,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={true}>
      {anchor ? (
        <Popover.Anchor asChild>{anchor}</Popover.Anchor>
      ) : (
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      )}
      <Popover.Portal>
        <Popover.Content {...layoutProps} {...stylex.props(styles.content)}>
          <FilterDialog
            fieldInfo={fieldInfo}
            filter={filter}
            path={path}
            onFilterApply={setFilter}
            onOpenChange={setOpen}
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
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
