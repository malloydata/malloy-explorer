import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {useUpdateQuery} from '../../hooks/useQueryUpdate';
import {FieldHoverCard} from '../FieldHoverCard';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
  ParsedFilter,
} from '@malloydata/malloy-query-builder';
import {
  addAggregate,
  addFilter,
  addGroupBy,
  addNest,
  addOrderByFromSource,
  getSegmentIfPresent,
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
import {ViewParent} from '../utils/fields';

type Operation = 'groupBy' | 'aggregate' | 'filter' | 'orderBy';

interface FieldTokenWithActionsProps {
  rootQuery: ASTQuery;
  field: Malloy.FieldInfo;
  path: string[];
  viewDef: ASTArrowQueryDefinition;
}

export function FieldTokenWithActions({
  rootQuery,
  field,
  path,
  viewDef,
}: FieldTokenWithActionsProps) {
  const {focusedNestView} = useQueryFocus();
  const updateQuery = useUpdateQuery();

  const view = focusedNestView ?? viewDef;

  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const showHover = isFilterPopoverOpen || isTooltipOpen;

  return (
    <FieldToken
      field={field}
      hoverActions={
        <QueryEditorActions
          rootQuery={rootQuery}
          field={field}
          view={view}
          path={path}
          setIsFilterPopoverOpen={setIsFilterPopoverOpen}
          setIsTooltipOpen={setIsTooltipOpen}
        />
      }
      onClick={() => {
        if (queryEditorClick(rootQuery, view, field, path)) {
          updateQuery();
        }
      }}
      hoverActionsVisible={showHover}
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

interface QueryEditorActions {
  rootQuery: ASTQuery;
  view: ViewParent;
  field: Malloy.FieldInfo;
  path: string[];
  setIsTooltipOpen: (open: boolean) => void;
  setIsFilterPopoverOpen: (open: boolean) => void;
}

function QueryEditorActions({
  rootQuery,
  view,
  field,
  path,
  setIsTooltipOpen,
  setIsFilterPopoverOpen,
}: QueryEditorActions) {
  const updateQuery = useUpdateQuery();
  const {
    groupByDisabledReason,
    aggregateDisabledReason,
    filterDisabledReason,
    orderByDisabledReason,
  } = useOperations(view, field, path);

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
      updateQuery();
    }
  };

  const handleSetView = () => {
    if (field.kind === 'view' && rootQuery.isEmpty()) {
      rootQuery.setView(field.name);
      updateQuery();
    }
  };

  const handleAddView = () => {
    if (field.kind === 'view') {
      addNest(view, field);
      updateQuery();
    }
  };

  return field.kind === 'view' ? (
    <>
      <ActionButton
        icon="insert"
        disabled={!rootQuery.isEmpty()}
        onClick={handleSetView}
        tooltip={
          !rootQuery.isEmpty()
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
  ) : null;
}

function queryEditorClick(
  rootQuery: ASTQuery,
  view: ViewParent,
  field: Malloy.FieldInfo,
  path: string[]
) {
  const segment = getSegmentIfPresent(view);

  if (field.kind === 'dimension') {
    if (!segment?.hasField(field.name, path)) {
      addGroupBy(view, field, path);
    } else {
      return false;
    }
  } else if (field.kind === 'measure') {
    if (!segment?.hasField(field.name, path)) {
      addAggregate(view, field, path);
    } else {
      return false;
    }
  } else if (field.kind === 'view') {
    if (rootQuery.isEmpty()) {
      rootQuery.setView(field.name);
    } else {
      addNest(view, field);
    }
  } else {
    return false;
  }
  return true;
}
