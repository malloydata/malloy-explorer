/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import {autoUpdate, offset, shift, useFloating} from '@floating-ui/react-dom';
import * as Malloy from '@malloydata/malloy-interfaces';
import * as Dialog from '@radix-ui/react-dialog';
import stylex from '@stylexjs/stylex';
import {FilterDialog} from '../FilterDialog';
import {ASTQuery, ParsedFilter} from '@malloydata/malloy-query-builder';
import {ViewParent} from '../../utils/fields';

export interface OpenFilterModalParams {
  view: ViewParent;
  fieldInfo: Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure;
  path: string[];
  filter?: ParsedFilter;
  x?: number;
  y?: number;
}

export type OpenFilterModalCallback = ({
  view,
  fieldInfo,
  path,
  filter,
}: OpenFilterModalParams) => void;

export interface UseFilterModelProps {
  setQuery: ((rootQuery: Malloy.Query | undefined) => void) | undefined;
  rootQuery: ASTQuery | undefined;
}

export function useFilterModal({setQuery, rootQuery}: UseFilterModelProps) {
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

  const {view, fieldInfo, path, x, y} = current;
  const filter = current.filter ?? getDefaultFilter(current.fieldInfo);

  const setFilter = (filter: ParsedFilter) => {
    const segment = view.getOrAddDefaultSegment();
    if (fieldInfo.kind === 'dimension') {
      segment.addWhere(fieldInfo.name, path, filter);
    } else {
      segment.addHaving(fieldInfo.name, path, filter);
    }
    setQuery?.(rootQuery?.build());
  };

  const FilterModal = () => {
    const {refs, floatingStyles} = useFloating({
      placement: 'right-start',
      strategy: 'fixed',
      open,
      middleware: [
        offset({mainAxis: 3, crossAxis: 3}),
        shift({boundary: document.body}),
      ],
      whileElementsMounted: autoUpdate,
    });

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay {...stylex.props(styles.overlay)}>
            <div
              style={{position: 'fixed', left: x, top: y}}
              ref={refs.setReference}
            />
          </Dialog.Overlay>
          <Dialog.Content
            {...stylex.props(styles.content)}
            style={floatingStyles}
            ref={refs.setFloating}
          >
            <Dialog.Title {...stylex.props(styles.displayNone)}>
              Add filter
            </Dialog.Title>
            <Dialog.Description {...stylex.props(styles.displayNone)}>
              Add {filter.kind} filter
            </Dialog.Description>
            <FilterDialog
              fieldInfo={fieldInfo}
              path={path}
              filter={filter}
              setFilter={filter => setFilter(filter)}
              setOpen={setOpen}
            />
          </Dialog.Content>
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
    return {kind: 'number', parsed: {operator: '>', values: ['0']}};
  } else if (fieldInfo.type.kind === 'date_type') {
    return {
      kind: 'date',
      parsed: {operator: 'last', n: '7', units: 'day'},
    };
  } else {
    return {
      kind: 'timestamp',
      parsed: {operator: 'last', n: '7', units: 'day'},
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
  content: {
    zIndex: 100,
  },
});
