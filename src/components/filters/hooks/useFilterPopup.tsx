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
import {FilterDialog} from '../FilterDialog';
import {ParsedFilter} from '@malloydata/malloy-query-builder';

export function useFilterPopup(
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure,
  path: string[],
  filter: ParsedFilter,
  setFilter: (filter: ParsedFilter) => void
) {
  const [open, setOpen] = useState(false);

  const FilterPopup = ({trigger}: {trigger: React.ReactElement}) => (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" side="bottom">
          <FilterDialog
            fieldInfo={fieldInfo}
            filter={filter}
            path={path}
            setFilter={setFilter}
            setOpen={setOpen}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );

  return {
    FilterPopup,
  };
}
