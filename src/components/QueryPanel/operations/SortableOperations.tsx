/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useMemo} from 'react';
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
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import {ClearButton} from './ClearButton';
import {addGroupBy} from '../../utils/segment';
import {OperationActionTitle} from './OperationActionTitle';
import FieldToken from '../../FieldToken';
import {getInputSchemaFromViewParent, ViewParent} from '../../utils/fields';
import {FieldHoverCard} from '../../FieldHoverCard';

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
      id: operation.field.name,
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
        operation instanceof ASTGroupByViewOperation
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
            const segment = view.getOrAddDefaultSegment();
            addGroupBy(rootQuery, segment, field, path, setQuery);
          },
        }
      : {
          title: 'aggregate',
          actionTitle: 'Add aggregate',
          types: ['measure'] as 'measure'[],
          onClick: (field: Malloy.FieldInfo, path: string[]) => {
            const segment = view.getOrAddDefaultSegment();
            segment.addAggregate(field.name, path);
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
  operation: ASTAggregateViewOperation | ASTGroupByViewOperation;
  color: 'green' | 'cyan';
}

function SortableOperation({id, operation, color}: SortableOperationProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);
  const fieldInfo = operation.getFieldInfo();
  const path = operation.field.getReference().path ?? [];
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id, data: {name: fieldInfo.name}});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div id={id} ref={setNodeRef} style={style}>
      <FieldToken
        field={fieldInfo}
        color={color}
        hoverActions={
          <ClearButton
            onClick={() => {
              operation.delete();
              setQuery?.(rootQuery?.build());
            }}
          />
        }
        tooltip={<FieldHoverCard field={fieldInfo} path={path} />}
        tooltipProps={{
          side: 'right',
          align: 'start',
          alignOffset: 28,
        }}
        dragProps={{attributes, listeners}}
      />
    </div>
  );
}
