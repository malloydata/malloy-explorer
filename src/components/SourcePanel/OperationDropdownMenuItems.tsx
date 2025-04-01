import React from 'react';
import {useOperations} from './hooks/useOperations';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {DropdownMenuItem} from '../primitives';

type Operation = 'aggregate' | 'groupBy' | 'orderBy';

interface OperationDropdownMenuItemsProps {
  segment: ASTSegmentViewDefinition;
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

  const {isAggregateAllowed, isGroupByAllowed, isOrderByAllowed} =
    useOperations(segment, field, path);

  const handleMenuItemClick = (operation: Operation) => {
    const currentSegment = withEmptyNest
      ? segment
          .addEmptyNest(getNestName(segment))
          .view.definition.getOrAddDefaultSegment()
      : segment;

    if (operation === 'aggregate' && isAggregateAllowed) {
      currentSegment.addAggregate(field.name, path);
    } else if (operation === 'groupBy' && isGroupByAllowed) {
      currentSegment.addGroupBy(field.name, path);
    } else if (operation === 'orderBy' && isOrderByAllowed) {
      currentSegment.addOrderBy(field.name, 'asc');
    }

    setQuery?.(rootQuery?.build());
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
