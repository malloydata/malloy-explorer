import React from 'react';
import {useOperations} from './hooks/useOperations';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {DropdownMenuItem} from '../primitives';
import {ViewParent} from '../utils/fields';

type Operation = 'groupBy' | 'aggregate' | 'filter' | 'orderBy';

interface OperationDropdownMenuItemsProps {
  view: ViewParent;
  field: FieldInfo;
  path: string[];
  withEmptyNest?: boolean;
}

export function OperationDropdownMenuItems({
  view,
  field,
  path,
  withEmptyNest = false,
}: OperationDropdownMenuItemsProps) {
  const {rootQuery, setQuery, openFilterModal} =
    React.useContext(QueryEditorContext);

  const {
    isGroupByAllowed,
    isAggregateAllowed,
    isFilterAllowed,
    isOrderByAllowed,
  } = useOperations(view, field, path);

  const handleMenuItemClick = (
    event: React.MouseEvent,
    operation: Operation
  ) => {
    if (field.kind === 'dimension' || field.kind === 'measure') {
      if (operation === 'filter' && isFilterAllowed) {
        const x = event.clientX;
        const y = event.clientY;
        openFilterModal({view, fieldInfo: field, path, x, y});
      } else {
        const segment = view.getOrAddDefaultSegment();
        const currentSegment = withEmptyNest
          ? segment
              ?.addEmptyNest(getNestName(segment))
              .view.definition.getOrAddDefaultSegment()
          : segment;

        if (operation === 'groupBy' && isGroupByAllowed) {
          currentSegment?.addGroupBy(field.name, path);
        } else if (operation === 'aggregate' && isAggregateAllowed) {
          currentSegment?.addAggregate(field.name, path);
        } else if (operation === 'orderBy' && isOrderByAllowed) {
          currentSegment?.addOrderBy(field.name, 'asc');
        }
        setQuery?.(rootQuery?.build());
      }
    }
  };

  return (
    <>
      {field.kind === 'measure' ? (
        <>
          <DropdownMenuItem
            icon="aggregate"
            label="Aggregate"
            disabled={!isAggregateAllowed}
            onClick={event => handleMenuItemClick(event, 'aggregate')}
          />
          <DropdownMenuItem
            icon="filter"
            label="Filter"
            disabled={!isFilterAllowed}
            onClick={event => handleMenuItemClick(event, 'filter')}
          />
          <DropdownMenuItem
            icon="orderBy"
            label="Order by"
            disabled={!isOrderByAllowed}
            onClick={event => handleMenuItemClick(event, 'orderBy')}
          />
        </>
      ) : field.kind === 'dimension' ? (
        <>
          <DropdownMenuItem
            icon="groupBy"
            label="Group by"
            disabled={!isGroupByAllowed}
            onClick={event => handleMenuItemClick(event, 'groupBy')}
          />
          <DropdownMenuItem
            icon="filter"
            label="Filter"
            disabled={!isFilterAllowed}
            onClick={event => handleMenuItemClick(event, 'filter')}
          />
          <DropdownMenuItem
            icon="orderBy"
            label="Order by"
            disabled={!isOrderByAllowed}
            onClick={event => handleMenuItemClick(event, 'orderBy')}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
