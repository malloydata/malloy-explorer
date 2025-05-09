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
import {
  addAggregate,
  addFilter,
  addGroupBy,
  addNest,
  addOrderBy,
} from '../utils/segment';
import {useOperations} from './hooks/useOperations';
import {FilterPopover} from '../filters/FilterPopover';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {fontStyles, tooltipStyles} from '../primitives/styles';
import stylex from '@stylexjs/stylex';

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

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

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
        addOrderBy(view, field);
      } else if (operation === 'filter' && isFilterAllowed && filter) {
        addFilter(view, field, path, filter);
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
              onTooltipOpenChange={setIsTooltipOpen}
            />

            <ActionButton
              icon="nest"
              onClick={handleAddView}
              tooltip="Add as new nested query"
              onTooltipOpenChange={setIsTooltipOpen}
            />
          </>
        ) : field.kind === 'measure' ? (
          <>
            <ActionButton
              icon="aggregate"
              tooltip="Add as aggregate"
              disabled={!isAggregateAllowed}
              onClick={() => handleAddOperationAction('aggregate')}
              onTooltipOpenChange={setIsTooltipOpen}
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
                  onTooltipOpenChange={setIsTooltipOpen}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
            />
            <ActionButton
              icon="orderBy"
              tooltip="Add as order by"
              disabled={!isOrderByAllowed}
              onClick={() => handleAddOperationAction('orderBy')}
              onTooltipOpenChange={setIsTooltipOpen}
            />
          </>
        ) : field.kind === 'dimension' ? (
          <>
            <ActionButton
              icon="groupBy"
              tooltip="Add as group by"
              disabled={!isGroupByAllowed}
              onClick={() => handleAddOperationAction('groupBy')}
              onTooltipOpenChange={setIsTooltipOpen}
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
                  onTooltipOpenChange={setIsTooltipOpen}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
            />
            <ActionButton
              icon="orderBy"
              tooltip="Add as order by"
              disabled={!isOrderByAllowed}
              onClick={() => handleAddOperationAction('orderBy')}
              onTooltipOpenChange={setIsTooltipOpen}
            />
          </>
        ) : null
      }
      onClick={
        field.kind === 'dimension' && isGroupByAllowed
          ? () => handleAddOperationAction('groupBy')
          : field.kind === 'measure' && isAggregateAllowed
            ? () => handleAddOperationAction('aggregate')
            : field.kind === 'view'
              ? () => handleAddView()
              : undefined
      }
      hoverActionsVisible={isFilterPopoverOpen || isTooltipOpen}
      tooltip={<FieldHoverCard field={field} path={path} />}
      tooltipProps={{
        side: 'right',
        align: 'start',
        alignOffset: 28,
      }}
    />
  );
}

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  tooltip: string;
  onTooltipOpenChange: (open: boolean) => void;
}

function ActionButton({
  tooltip,
  onTooltipOpenChange,
  ...props
}: ActionButtonProps) {
  return (
    <Tooltip delayDuration={300} onOpenChange={onTooltipOpenChange}>
      <TooltipTrigger asChild>
        {<Button variant="flat" size="compact" {...props} />}
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          sideOffset={8}
          {...stylex.props(fontStyles.body, tooltipStyles.default)}
        >
          {tooltip}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
