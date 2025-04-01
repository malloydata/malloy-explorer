import React from 'react';
import {DropdownMenu, DropdownSubMenuItem} from '../DropdownMenu';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {useNestOperations} from './hooks/useNestOperations';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';

interface NestFieldDropdownMenuProps {
  segment: ASTSegmentViewDefinition;
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
        <OperationDropdownMenuItems
          segment={segment}
          field={field}
          path={path}
          withEmptyNest={true}
        />
      ) : (
        <>
          {nestOperations.map((operation, index) => (
            <DropdownSubMenuItem key={index} label={operation.name}>
              <OperationDropdownMenuItems
                segment={operation.view.getOrAddDefaultSegment()}
                field={field}
                path={path}
              />
            </DropdownSubMenuItem>
          ))}
        </>
      )}
    </DropdownMenu>
  );
}
