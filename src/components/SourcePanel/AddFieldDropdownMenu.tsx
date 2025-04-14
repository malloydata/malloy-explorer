import React, {useContext} from 'react';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {FieldInfo} from '@malloydata/malloy-interfaces';
import {OperationDropdownMenuItems} from './OperationDropdownMenuItems';
import {DropdownMenu, DropdownMenuLabel} from '../primitives';
import {useFilterModal} from '../filters/hooks/useFilterModal';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

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
  const {setQuery, rootQuery} = useContext(QueryEditorContext);
  const {openFilterModal, FilterModal} = useFilterModal(
    (field, path: string[], filter) => {
      if (field.kind === 'dimension') {
        segment?.addWhere(field.name, path, filter);
      } else {
        segment?.addHaving(field.name, path, filter);
      }
      setQuery?.(rootQuery?.build());
    }
  );
  return (
    <>
      <DropdownMenu {...props}>
        <DropdownMenuLabel label="Add to main query as..." />
        <OperationDropdownMenuItems
          segment={segment}
          field={field}
          path={path}
          openFilterModal={openFilterModal}
        />
      </DropdownMenu>
      <FilterModal />
    </>
  );
}
