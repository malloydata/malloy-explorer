import React from 'react';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {DropdownMenu, DropdownMenuLabel} from '../primitives';
import {ViewParent} from '../utils/fields';

type DropdownMenuProps = React.ComponentProps<typeof DropdownMenu>;

interface AddFieldDropdownMenuProps
  extends Omit<DropdownMenuProps, 'children'> {
  view: ViewParent;
  field: FieldInfo;
  path: string[];
}

export function AddFieldDropdownMenu({
  view,
  field,
  path,
  ...props
}: AddFieldDropdownMenuProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel label="Add to main query as..." />
      <OperationDropdownMenuItems view={view} field={field} path={path} />
    </DropdownMenu>
  );
}
