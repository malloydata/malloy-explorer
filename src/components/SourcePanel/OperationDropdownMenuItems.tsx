import React, {useState} from 'react';
import {useOperations} from './hooks/useOperations';
import {
  FieldInfo,
  FieldInfoWithDimension,
  FieldInfoWithMeasure,
} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {DropdownMenuItem, DropdownSubMenuItem} from '../primitives';
import {ViewParent} from '../utils/fields';
import {FilterDialog} from '../filters/FilterDialog';
import {ParsedFilter} from '@malloydata/malloy-query-builder';

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
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

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
          <FilterDropdownSubmenuItem
            view={view}
            isFilterAllowed={isFilterAllowed}
            field={field}
            path={path}
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
          <FilterDropdownSubmenuItem
            view={view}
            isFilterAllowed={isFilterAllowed}
            field={field}
            path={path}
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

interface FilterDropdownSubmenuItemProps {
  view: ViewParent;
  isFilterAllowed: boolean;
  field: FieldInfoWithDimension | FieldInfoWithMeasure;
  path: string[];
}

function FilterDropdownSubmenuItem({
  view,
  isFilterAllowed,
  field,
  path,
}: FilterDropdownSubmenuItemProps) {
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSet = (filter: ParsedFilter) => {
    const segment = view.getOrAddDefaultSegment();
    if (field.kind === 'dimension') {
      segment.addWhere(field.name, path, filter);
    } else {
      segment.addHaving(field.name, path, filter);
    }
    setQuery?.(rootQuery?.build());
  };

  return (
    <DropdownSubMenuItem
      icon="filter"
      label="Filter"
      disabled={!isFilterAllowed}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <FilterDialog
        fieldInfo={field}
        path={path}
        onFilterApply={handleFilterSet}
        onOpenChange={setIsOpen}
      />
    </DropdownSubMenuItem>
  );
}
