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
  addOrderByFromSource,
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
import {useQueryFocus} from '../MalloyQueryFocusProvider';

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
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

  const {focusedNestView} = useQueryFocus();

  const view = focusedNestView ?? viewDef;

  const {
    groupByDisabledReason,
    aggregateDisabledReason,
    filterDisabledReason,
    orderByDisabledReason,
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
      if (operation === 'groupBy' && !groupByDisabledReason) {
        addGroupBy(view, field, path);
      } else if (operation === 'aggregate' && !aggregateDisabledReason) {
        addAggregate(view, field, path);
      } else if (operation === 'orderBy' && !orderByDisabledReason) {
        addOrderByFromSource(view, path, field.name);
      } else if (operation === 'filter' && !filterDisabledReason && filter) {
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
              tooltip={
                !rootQuery?.isEmpty()
                  ? 'Can only add a view to an empty query.'
                  : 'Add view'
              }
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
              tooltip={aggregateDisabledReason || 'Add as aggregate'}
              disabled={!!aggregateDisabledReason}
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
                  tooltip={filterDisabledReason || 'Add as filter'}
                  disabled={!!filterDisabledReason}
                  onTooltipOpenChange={setIsTooltipOpen}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
              layoutProps={{align: 'start'}}
            />
            <ActionButton
              icon="orderBy"
              tooltip={orderByDisabledReason || 'Add as order by'}
              disabled={!!orderByDisabledReason}
              onClick={() => handleAddOperationAction('orderBy')}
              onTooltipOpenChange={setIsTooltipOpen}
            />
          </>
        ) : field.kind === 'dimension' ? (
          <>
            <ActionButton
              icon="groupBy"
              tooltip={groupByDisabledReason || 'Add as group by'}
              disabled={!!groupByDisabledReason}
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
                  tooltip={filterDisabledReason || 'Add as filter'}
                  disabled={!!filterDisabledReason}
                  onTooltipOpenChange={setIsTooltipOpen}
                />
              }
              onOpenChange={setIsFilterPopoverOpen}
              layoutProps={{align: 'start'}}
            />
            <ActionButton
              icon="orderBy"
              tooltip={orderByDisabledReason || 'Add as order by'}
              disabled={!!orderByDisabledReason}
              onClick={() => handleAddOperationAction('orderBy')}
              onTooltipOpenChange={setIsTooltipOpen}
            />
          </>
        ) : null
      }
      onClick={
        field.kind === 'dimension' && !groupByDisabledReason
          ? () => handleAddOperationAction('groupBy')
          : field.kind === 'measure' && !aggregateDisabledReason
            ? () => handleAddOperationAction('aggregate')
            : field.kind === 'view'
              ? () => {
                  if (rootQuery?.isEmpty()) {
                    handleSetView();
                  } else {
                    handleAddView();
                  }
                }
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
