import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {FieldHoverCard} from '../FieldHoverCard';
import {
  ASTArrowQueryDefinition,
  ParsedFilter,
} from '@malloydata/malloy-query-builder';
import {addAggregate, addGroupBy, addNest} from '../utils/segment';
import {useOperations} from './hooks/useOperations';
import {FilterPopover} from '../filters/FilterPopover';

type Operation = 'groupBy' | 'aggregate' | 'filter' | 'orderBy';

interface FieldTokenWithActionsProps {
  field: Malloy.FieldInfo;
  path: string[];
  viewDef: ASTArrowQueryDefinition;
}

export function FieldTokenWithActions({
  field,
  path,
  viewDef,
}: FieldTokenWithActionsProps) {
  const {rootQuery, setQuery, currentNestView} =
    React.useContext(QueryEditorContext);

  const view = currentNestView ?? viewDef;

  const {
    isGroupByAllowed,
    isAggregateAllowed,
    isFilterAllowed,
    isOrderByAllowed,
  } = useOperations(view, field, path);

  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState<
    boolean | undefined
  >();

  const handleAddOperationAction = (
    operation: Operation,
    filter?: ParsedFilter
  ) => {
    if (field.kind === 'dimension' || field.kind === 'measure') {
      if (operation === 'groupBy' && isGroupByAllowed) {
        addGroupBy(view, field, path);
      } else if (operation === 'aggregate' && isAggregateAllowed) {
        addAggregate(view, field, path);
      } else if (operation === 'orderBy' && isOrderByAllowed) {
        const segment = view.getOrAddDefaultSegment();
        segment.addOrderBy(field.name, 'asc');
      } else if (operation === 'filter' && isFilterAllowed && filter) {
        const segment = view.getOrAddDefaultSegment();
        if (field.kind === 'dimension') {
          segment.addWhere(field.name, path, filter);
        } else {
          segment.addHaving(field.name, path, filter);
        }
      }
      setQuery?.(rootQuery?.build());
    }
  };

  const handleSetView = () => {
    if (field.kind === 'view' && rootQuery?.isEmpty()) {
      rootQuery?.setView(field.name);
      setQuery?.(rootQuery?.build());
    }
  };

  const handleAddView = () => {
    if (field.kind === 'view') {
      addNest(view, field);
      setQuery?.(rootQuery?.build());
    }
  };

  return (
    <FieldToken
      field={field}
      hoverActions={
        field.kind === 'view' ? (
          <>
            <ActionButton
              icon="insert"
              disabled={!rootQuery?.isEmpty()}
              onClick={handleSetView}
              tooltip="Add view"
            />

            <ActionButton
              icon="nest"
              onClick={handleAddView}
              tooltip="Add as new nested query"
            />
          </>
        ) : field.kind === 'measure' ? (
          <>
            <ActionButton
              icon="aggregate"
              tooltip="Add as aggregate"
              disabled={!isAggregateAllowed}
              onClick={() => handleAddOperationAction('aggregate')}
            />
            <FilterPopover
              fieldInfo={field}
              path={path}
              setFilter={filter => handleAddOperationAction('filter', filter)}
              trigger={
                <ActionButton
                  icon="filter"
                  tooltip="Add as filter"
                  disabled={!isFilterAllowed}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
            />
            <ActionButton
              icon="orderBy"
              tooltip="Add as order by"
              disabled={!isOrderByAllowed}
              onClick={() => handleAddOperationAction('orderBy')}
            />
          </>
        ) : field.kind === 'dimension' ? (
          <>
            <ActionButton
              icon="groupBy"
              tooltip="Add as group by"
              disabled={!isGroupByAllowed}
              onClick={() => handleAddOperationAction('groupBy')}
            />
            <FilterPopover
              fieldInfo={field}
              path={path}
              setFilter={filter => handleAddOperationAction('filter', filter)}
              trigger={
                <ActionButton
                  icon="filter"
                  tooltip="Add as filter"
                  disabled={!isFilterAllowed}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
            />
            <ActionButton
              icon="orderBy"
              tooltip="Add as order by"
              disabled={!isOrderByAllowed}
              onClick={() => handleAddOperationAction('orderBy')}
            />
          </>
        ) : null
      }
      hoverActionsVisible={isFilterPopoverOpen}
      tooltip={<FieldHoverCard field={field} path={path} />}
      tooltipProps={{
        side: 'right',
        align: 'start',
        alignOffset: 28,
      }}
    />
  );
}

type ActionButtonProps = React.ComponentProps<typeof Button>;

function ActionButton(props: ActionButtonProps) {
  return <Button variant="flat" size="compact" {...props} />;
}
