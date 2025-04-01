import React from 'react';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {DropdownMenu} from '../primitives';

interface AddFieldDropdownMenuProps {
  segment: ASTSegmentViewDefinition;
  field: FieldInfo;
  path: string[];
  trigger: React.ReactElement;
  onOpenChange: (open: boolean) => void;
}

export function AddFieldDropdownMenu({
  segment,
  field,
  path,
  trigger,
  onOpenChange,
}: AddFieldDropdownMenuProps) {
  return (
    <DropdownMenu trigger={trigger} onOpenChange={onOpenChange}>
      <OperationDropdownMenuItems segment={segment} field={field} path={path} />
    </DropdownMenu>
  );
}
