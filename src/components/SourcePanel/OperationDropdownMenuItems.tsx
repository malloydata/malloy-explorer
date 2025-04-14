import React from 'react';
import {useOperations} from './hooks/useOperations';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {DropdownMenuItem} from '../primitives';
import {OpenFilterModalCallback} from '../filters/hooks/useFilterModal';

type Operation = 'groupBy' | 'aggregate' | 'filter' | 'orderBy';

interface OperationDropdownMenuItemsProps {
  segment?: ASTSegmentViewDefinition;
  field: FieldInfo;
  path: string[];
  withEmptyNest?: boolean;
  openFilterModal: OpenFilterModalCallback;
}

export function OperationDropdownMenuItems({
  segment,
  field,
  path,
  withEmptyNest = false,
  openFilterModal,
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
        openFilterModal({fieldInfo: field, path});
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
