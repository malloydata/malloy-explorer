import React from 'react';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {DropdownMenu, DropdownMenuLabel} from '../primitives';

type DropdownMenuProps = React.ComponentProps<typeof DropdownMenu>;

interface AddFieldDropdownMenuProps
  extends Omit<DropdownMenuProps, 'children'> {
  segment?: ASTSegmentViewDefinition;
  field: FieldInfo;
  path: string[];
}

export function AddFieldDropdownMenu({
  segment,
  field,
  path,
  ...props
}: AddFieldDropdownMenuProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel label="Add to main query as..." />
      <OperationDropdownMenuItems segment={segment} field={field} path={path} />
    </DropdownMenu>
  );
}
