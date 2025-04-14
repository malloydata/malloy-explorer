import React, {useContext} from 'react';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {NestOperation, useNestOperations} from './hooks/useNestOperations';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownSubMenuItem,
} from '../primitives';
import {getNestName} from './utils';
import {ViewParent} from '../utils/fields';

interface NestFieldDropdownMenuProps {
  view: ViewParent;
  field: FieldInfo;
  path: string[];
  trigger: React.ReactElement;
  onOpenChange: (open: boolean) => void;
}

export function NestFieldDropdownMenu({
  view,
  field,
  path,
  trigger,
  onOpenChange,
}: NestFieldDropdownMenuProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);

  const nestOperations = useNestOperations(rootQuery);

  const nestViewWithinNestQuery = (operation: NestOperation) => {
    const segment = operation.view.getOrAddDefaultSegment();
    segment.addNest(field.name, getNestName(segment, field.name));
    setQuery?.(rootQuery?.build());
  };

  return (
    <DropdownMenu trigger={trigger} onOpenChange={onOpenChange}>
      {nestOperations.length === 0 ? (
        <>
          <DropdownMenuLabel label={'Add to new nested query as...'} />
          <OperationDropdownMenuItems
            view={view}
            field={field}
            path={path}
            withEmptyNest={true}
          />
        </>
      ) : (
        <>
          <DropdownMenuLabel label={'Add to nested query...'} />
          {nestOperations.map((operation, index) => {
            return field.kind === 'view' ? (
              <DropdownMenuItem
                key={index}
                label={operation.name}
                onClick={() => nestViewWithinNestQuery(operation)}
              />
            ) : (
              <DropdownSubMenuItem key={index} label={operation.name}>
                <DropdownMenuLabel
                  label={`Add to ${operation.name} query as...`}
                />
                <OperationDropdownMenuItems
                  view={operation.view.parent.as.View()}
                  field={field}
                  path={path}
                />
              </DropdownSubMenuItem>
            );
          })}
        </>
      )}
    </DropdownMenu>
  );
}
