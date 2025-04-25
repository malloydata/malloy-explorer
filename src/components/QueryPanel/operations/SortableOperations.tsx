/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useMemo, useState} from 'react';
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
  ASTGroupByViewOperation,
  ASTNestViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {ClearButton} from './ClearButton';
import {OperationActionTitle} from './OperationActionTitle';
import FieldToken from '../../FieldToken';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {FieldHoverCard} from '../../FieldHoverCard';
import {Button, DropdownMenu, DropdownMenuItem} from '../../primitives';
import {RenameDialog} from './RenameDialog';
import {addAggregate, addGroupBy} from '../../utils/segment';

export interface SortableOperationsProps {
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  view: ViewParent;
  operations: Array<ASTAggregateViewOperation | ASTGroupByViewOperation>;
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
  id: string;
  view: ViewParent;
  operation: ASTAggregateViewOperation | ASTGroupByViewOperation;
  color: 'green' | 'cyan';
}

function SortableOperation({
  id,
  view,
  operation,
  color,
}: SortableOperationProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);
  const fieldInfo = operation.getFieldInfo();
  const path = operation.field.getReference().path ?? [];
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id, data: {name: fieldInfo.name}});
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<
    ASTGroupByViewOperation | ASTAggregateViewOperation
  >();
  const [hoverActionsVisible, setHoverActionsVisible] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div id={id} ref={setNodeRef} style={style}>
      <FieldToken
        field={fieldInfo}
        color={color}
        hoverActionsVisible={hoverActionsVisible}
        hoverActions={
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
              <DropdownMenuItem
                label="Rename"
                onClick={() => {
                  setRenameTarget(operation);
                  setRenameOpen(true);
                }}
              />
            </DropdownMenu>
            <ClearButton
              onClick={() => {
                operation.delete();
                setQuery?.(rootQuery?.build());
              }}
            />
          </>
        }
        tooltip={<FieldHoverCard field={fieldInfo} path={path} />}
        tooltipProps={{
          side: 'right',
          align: 'start',
          alignOffset: 28,
        }}
        dragProps={{attributes, listeners}}
      />
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
