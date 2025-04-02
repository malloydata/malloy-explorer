import React from 'react';
import {useOperations} from './hooks/useOperations';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {DropdownMenuItem} from '../primitives';

type Operation = 'groupBy' | 'aggregate' | 'filter' | 'orderBy';

interface OperationDropdownMenuItemsProps {
  segment?: ASTSegmentViewDefinition;
  field: FieldInfo;
  path: string[];
  withEmptyNest?: boolean;
}

export function OperationDropdownMenuItems({
  segment,
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
  } = useOperations(segment, field, path);

  const handleMenuItemClick = (operation: Operation) => {
    if (field.kind === 'dimension' || field.kind === 'measure') {
      const currentSegment = withEmptyNest
        ? segment
            ?.addEmptyNest(getNestName(segment))
            .view.definition.getOrAddDefaultSegment()
        : segment;

      if (operation === 'groupBy' && isGroupByAllowed) {
        currentSegment?.addGroupBy(field.name, path);
      } else if (operation === 'aggregate' && isAggregateAllowed) {
        currentSegment?.addAggregate(field.name, path);
      } else if (operation === 'filter' && isFilterAllowed) {
        if (field.type.kind === 'string_type') {
          currentSegment?.addWhere(field.name, path, '-null');
        } else if (field.type.kind === 'boolean_type') {
          currentSegment?.addWhere(field.name, path, 'true');
        } else if (field.type.kind === 'number_type') {
          currentSegment?.addWhere(field.name, path, '0');
        } else if (field.type.kind === 'date_type') {
          currentSegment?.addWhere(field.name, path, 'today');
        } else if (field.type.kind === 'timestamp_type') {
          currentSegment?.addWhere(field.name, path, 'now');
        }
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
            onClick={() => handleMenuItemClick('aggregate')}
          />
          <DropdownMenuItem
            icon="filter"
            label="Filter"
            disabled={!isFilterAllowed}
            onClick={() => handleMenuItemClick('filter')}
          />
          <DropdownMenuItem
            icon="orderBy"
            label="Order by"
            disabled={!isOrderByAllowed}
            onClick={() => handleMenuItemClick('orderBy')}
          />
        </>
      ) : field.kind === 'dimension' ? (
        <>
          <DropdownMenuItem
            icon="groupBy"
            label="Group by"
            disabled={!isGroupByAllowed}
            onClick={() => handleMenuItemClick('groupBy')}
          />
          <DropdownMenuItem
            icon="filter"
            label="Filter"
            disabled={!isFilterAllowed}
            onClick={() => handleMenuItemClick('filter')}
          />
          <DropdownMenuItem
            icon="orderBy"
            label="Order by"
            disabled={!isOrderByAllowed}
            onClick={() => handleMenuItemClick('orderBy')}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
