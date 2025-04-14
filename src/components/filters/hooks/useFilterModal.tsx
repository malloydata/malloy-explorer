/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Dialog from '@radix-ui/react-dialog';
import stylex from '@stylexjs/stylex';
import {FilterDialog} from '../FilterDialog';
import {ParsedFilter} from '@malloydata/malloy-query-builder';

export interface OpenFilterModalParams {
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  path: string[];
  filter?: ParsedFilter;
}

export type OpenFilterModalCallback = ({
  fieldInfo,
  path,
  filter,
}: OpenFilterModalParams) => void;

export function useFilterModal(
  setFilter: (
    field: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure,
    path: string[],
    filter: ParsedFilter
  ) => void
) {
  const [open, setOpen] = useState(false);
  const [current, openFilterModal] = useState<
    OpenFilterModalParams | undefined
  >();

  useEffect(() => {
    setOpen(!!current);
  }, [current]);

  if (!current) {
    return {
      openFilterModal,
      FilterModal: () => null,
    };
  }

  const {fieldInfo, path} = current;
  const filter = current.filter ?? getDefaultFilter(current.fieldInfo);

  const FilterModal = () => {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay {...stylex.props(styles.overlay)}>
            <Dialog.Content>
              <Dialog.Title {...stylex.props(styles.displayNone)}>
                Add filter
              </Dialog.Title>
              <Dialog.Description {...stylex.props(styles.displayNone)}>
                Add {filter.kind} filter
              </Dialog.Description>
              <FilterDialog
                fieldInfo={fieldInfo}
                filter={filter}
                setFilter={filter => setFilter(fieldInfo, path, filter)}
                setOpen={setOpen}
              />
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

  return {
    openFilterModal,
    FilterModal,
  };
}

function getDefaultFilter(
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure
): ParsedFilter {
  if (fieldInfo.type.kind === 'string_type') {
    return {kind: 'string', parsed: {operator: '=', values: []}};
  } else if (fieldInfo.type.kind === 'boolean_type') {
    return {kind: 'boolean', parsed: {operator: 'true'}};
  } else if (fieldInfo.type.kind === 'number_type') {
    return {kind: 'number', parsed: {operator: '>', values: []}};
  } else if (fieldInfo.type.kind === 'date_type') {
    return {
      kind: 'date',
      parsed: {operator: 'after', after: {moment: 'now'}},
    };
  } else {
    return {
      kind: 'timestamp',
      parsed: {operator: 'after', after: {moment: 'now'}},
    };
  }
}

const styles = stylex.create({
  displayNone: {
    display: 'none',
  },
  overlay: {
    background: 'rgba(0 0 0 / 0.0)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 100,
  },
});
