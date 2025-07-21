/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useCallback, useContext, useMemo, useState} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from '../../styles';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove, SortableContext, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
  ASTAggregateViewOperation,
  ASTCalculateViewOperation,
  ASTField,
  ASTGroupByViewOperation,
  ASTNestViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
  ASTTimeTruncationExpression,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {ClearButton} from './ClearButton';
import {OperationActionTitle} from './OperationActionTitle';
import FieldToken from '../../FieldToken';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {FieldHoverCard} from '../../FieldHoverCard';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  IconType,
  SelectorToken,
  Token,
  TokenGroup,
} from '../../primitives';
import {RenameDialog} from './RenameDialog';
import {atomicTypeToIcon} from '../../utils/icon';
import {
  addAggregate,
  addGroupBy,
  recomputePartitionByAndPrimaryAxis,
} from '../../utils/segment';
import {hoverActionsVars} from './hover.stylex';
import {getPrimaryAxis} from '../../utils/axis';

export interface SortableOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  operations: Array<
    | ASTAggregateViewOperation
    | ASTGroupByViewOperation
    | ASTCalculateViewOperation
  >;
  kind: 'aggregate' | 'group_by';
}

export function SortableOperations({
  rootQuery,
  segment,
  view,
  operations,
  kind,
}: SortableOperationsProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const items = useMemo(() => {
    return operations.map(operation => ({
      id: operation.name,
      operation,
    }));
  }, [operations]);

  if (operations.length === 0) {
    return null;
  }

  function handleDragEnd(event: DragEndEvent) {
    const operations = segment.operations.items.filter(
      operation =>
        operation instanceof ASTAggregateViewOperation ||
        operation instanceof ASTGroupByViewOperation ||
        operation instanceof ASTNestViewOperation
    );
    const names = operations.map(operation => operation.name);
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const oldIndex = names.indexOf(active.id as string);
      const newIndex = names.indexOf(over.id as string);
      segment.reorderFields(arrayMove(names, oldIndex, newIndex));
      setQuery?.(rootQuery.build());
    }
  }

  const {fields} = getInputSchemaFromViewParent(view);

  const props =
    kind === 'group_by'
      ? {
          title: 'group by',
          actionTitle: 'Add group by',
          types: ['dimension'] as 'dimension'[],
          onClick: (field: Malloy.FieldInfo, path: string[]) => {
            addGroupBy(view, field, path);
            setQuery?.(rootQuery.build());
          },
        }
      : {
          title: 'aggregate',
          actionTitle: 'Add aggregate',
          types: ['measure'] as 'measure'[],
          onClick: (field: Malloy.FieldInfo, path: string[]) => {
            addAggregate(view, field, path);
            setQuery?.(rootQuery.build());
          },
        };

  return (
    <div>
      <OperationActionTitle
        rootQuery={rootQuery}
        view={view}
        fields={fields}
        {...props}
      />
      <div {...stylex.props(styles.tokenContainer)}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items}>
            {items.map(item => (
              <SortableOperation
                rootQuery={rootQuery}
                key={item.id}
                id={item.id}
                color={kind === 'group_by' ? 'cyan' : 'green'}
                view={view}
                operation={item.operation}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

interface SortableOperationProps {
  rootQuery: ASTQuery;
  id: string;
  view: ViewParent;
  operation:
    | ASTAggregateViewOperation
    | ASTGroupByViewOperation
    | ASTCalculateViewOperation;
  color: 'green' | 'cyan';
}

const NULL_PATH: string[] = [] as const;

function SortableOperation({
  rootQuery,
  id,
  view,
  operation,
  color,
}: SortableOperationProps) {
  const {setQuery} = useContext(QueryEditorContext);
  const fieldInfo = operation.getFieldInfo();
  const field =
    operation instanceof ASTCalculateViewOperation ? null : operation.field;
  const path =
    operation instanceof ASTCalculateViewOperation
      ? (operation.expression.node.field_reference.path ?? NULL_PATH)
      : (operation.field.getReference()?.path ?? NULL_PATH);
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id, data: {name: fieldInfo.name}});
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<
    | ASTGroupByViewOperation
    | ASTAggregateViewOperation
    | ASTCalculateViewOperation
  >();
  const [hoverActionsVisible, setHoverActionsVisible] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // TODO: Memo these across all components, not per-component
  const primaryAxis = useMemo(() => {
    return getPrimaryAxis(rootQuery);
  }, [rootQuery]);
  const canSmooth =
    operation.kind === 'aggregate' &&
    primaryAxis !== null &&
    primaryAxis?.kind === 'dimension' &&
    (primaryAxis.type.kind === 'timestamp_type' ||
      primaryAxis.type.kind === 'date_type');

  const enableSmoothing = useCallback(
    (operation: ASTAggregateViewOperation) => {
      if (!canSmooth) {
        return;
      }
      operation.convertToCalculateMovingAverage(7);
      recomputePartitionByAndPrimaryAxis(rootQuery.getOrAddDefaultSegment());
      setQuery?.(rootQuery.build());
    },
    [canSmooth, rootQuery, setQuery]
  );

  const hoverActions = useMemo(() => {
    return (
      <>
        <DropdownMenu
          key={[...path, fieldInfo.name].join('.')}
          trigger={
            <Button
              variant="flat"
              icon="meatballs"
              size="compact"
              tooltip="More Actions"
            />
          }
          onOpenChange={setHoverActionsVisible}
        >
          {[
            canSmooth ? (
              <DropdownMenuItem
                key="smoothing"
                label="Add smoothing"
                onClick={() => {
                  if (operation instanceof ASTAggregateViewOperation) {
                    enableSmoothing(operation);
                  }
                }}
              />
            ) : null,
            <DropdownMenuItem
              key="rename"
              label="Rename"
              onClick={() => {
                setRenameTarget(operation);
                setRenameOpen(true);
              }}
            />,
          ]}
        </DropdownMenu>
        <ClearButton
          onClick={() => {
            operation.delete();
            recomputePartitionByAndPrimaryAxis(
              rootQuery.getOrAddDefaultSegment()
            );
            setQuery?.(rootQuery?.build());
          }}
        />
      </>
    );
  }, [
    canSmooth,
    enableSmoothing,
    fieldInfo.name,
    operation,
    path,
    rootQuery,
    setQuery,
  ]);

  const hasSmoothedField = useMemo(() => {
    return rootQuery
      .getOrAddDefaultSegment()
      .operations.items.some(operation => {
        return operation.kind === 'calculate';
      });
  }, [rootQuery]);

  const granular = granularityMenuItems(fieldInfo, field);
  if (hasSmoothedField && granular && operation.name === primaryAxis?.name) {
    granular.options = granular.options.filter(
      option => option.value === 'day'
    );
  }
  let icon: IconType = 'orderBy';
  if (fieldInfo.kind === 'dimension' || fieldInfo.kind === 'measure') {
    icon = atomicTypeToIcon(fieldInfo.type.kind);
  }

  return (
    <div id={id} ref={setNodeRef} style={style}>
      {field && granular ? (
        <div
          {...stylex.props(
            customStyles.main,
            hoverActionsVisible && customStyles.showHoverActions
          )}
        >
          <TokenGroup customStyle={customStyles.tokenGroup}>
            <Token
              color={color}
              icon={icon}
              label={fieldInfo.name}
              dragProps={{attributes, listeners}}
            />
            <SelectorToken
              color={color}
              value={granular.value}
              onChange={(granulation: Malloy.TimestampTimeframe) => {
                if (field.expression instanceof ASTTimeTruncationExpression)
                  field.expression.truncation = granulation;
                setQuery?.(rootQuery.build());
              }}
              items={granular.options}
            />
          </TokenGroup>
          {hoverActions && (
            <div {...stylex.props(customStyles.hoverActions)}>
              {hoverActions}
            </div>
          )}
        </div>
      ) : operation instanceof ASTCalculateViewOperation ? (
        <TokenGroup customStyle={customStyles.tokenGroup}>
          <FieldToken
            field={fieldInfo}
            color={color}
            hoverActionsVisible={hoverActionsVisible}
            hoverActions={hoverActions}
            tooltip={<FieldHoverCard field={fieldInfo} path={path} />}
            tooltipProps={{
              side: 'right',
              align: 'start',
              alignOffset: 28,
            }}
            dragProps={{attributes, listeners}}
          />
          <SelectorToken
            color={color}
            value={'' + (operation.expression.node.rows_preceding ?? 7)}
            onChange={(value: string) => {
              if (value === '1') {
                // TODO: Convert to normal aggregate
              } else {
                operation.expression.node.rows_preceding = parseInt(value, 10);
                setQuery?.(rootQuery.build());
              }
            }}
            items={[
              {label: '7d', value: '7'},
              {label: '14d', value: '14'},
              {label: '28d', value: '28'},
              {label: '30d', value: '30'},
              {label: 'Remove smoothing', value: '1'},
            ]}
          />
        </TokenGroup>
      ) : (
        <>
          <FieldToken
            field={fieldInfo}
            color={color}
            hoverActionsVisible={hoverActionsVisible}
            hoverActions={hoverActions}
            tooltip={<FieldHoverCard field={fieldInfo} path={path} />}
            tooltipProps={{
              side: 'right',
              align: 'start',
              alignOffset: 28,
            }}
            dragProps={{attributes, listeners}}
          />
        </>
      )}
      <RenameDialog
        rootQuery={rootQuery}
        view={view}
        target={renameTarget}
        open={renameOpen}
        setOpen={setRenameOpen}
      />
    </div>
  );
}

const DateGranulation: Malloy.TimestampTimeframe[] = [
  'day',
  'week',
  'month',
  'quarter',
  'year',
] as const;

const TimestampGranulation: Malloy.TimestampTimeframe[] = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year',
] as const;

function granularityMenuItems(
  fieldInfo: Malloy.FieldInfo,
  field: ASTField | null
) {
  if (
    !field ||
    fieldInfo.kind !== 'dimension' ||
    !(field.expression instanceof ASTTimeTruncationExpression)
  ) {
    return null;
  }

  if (fieldInfo.type.kind === 'timestamp_type') {
    return {
      value: fieldInfo.type.timeframe ?? 'second',
      options: TimestampGranulation.map(value => ({label: value, value})),
    };
  }

  if (fieldInfo.type.kind === 'date_type') {
    return {
      value: fieldInfo.type.timeframe ?? 'day',
      options: DateGranulation.map(value => ({label: value, value})),
    };
  }

  return null;
}

const customStyles = stylex.create({
  tokenGroup: {
    display: 'flex',
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',
    [hoverActionsVars.display]: {
      default: 'none',
      ':hover': 'block',
    },
  },
  hoverActions: {
    display: hoverActionsVars.display,
    flexShrink: 0,
  },
  showHoverActions: {
    [hoverActionsVars.display]: 'block',
  },
});
