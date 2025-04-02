import React from 'react';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {useNestOperations} from './hooks/useNestOperations';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownSubMenuItem,
} from '../primitives';

interface NestFieldDropdownMenuProps {
  segment?: ASTSegmentViewDefinition;
  field: FieldInfo;
  path: string[];
  trigger: React.ReactElement;
  onOpenChange: (open: boolean) => void;
}

export function NestFieldDropdownMenu({
  segment,
  field,
  path,
  trigger,
  onOpenChange,
}: NestFieldDropdownMenuProps) {
  const {rootQuery} = React.useContext(QueryEditorContext);

  const nestOperations = useNestOperations(rootQuery);

  return (
    <DropdownMenu trigger={trigger} onOpenChange={onOpenChange}>
      {nestOperations.length === 0 ? (
        <>
          <DropdownMenuLabel label={'Add to new nested query as...'} />
          <OperationDropdownMenuItems
            segment={segment}
            field={field}
            path={path}
            withEmptyNest={true}
          />
        </>
      ) : (
        <>
          <DropdownMenuLabel label={'Add to nested query...'} />
          {nestOperations.map((operation, index) => (
            <DropdownSubMenuItem key={index} label={operation.name}>
              <>
                <DropdownMenuLabel
                  label={`Add to ${operation.name} query as...`}
                />
                <OperationDropdownMenuItems
                  segment={operation.view.getOrAddDefaultSegment()}
                  field={field}
                  path={path}
                />
              </>
            </DropdownSubMenuItem>
          ))}
        </>
      )}
    </DropdownMenu>
  );
}
