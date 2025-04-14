import React from 'react';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
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
import {useFilterModal} from '../filters/hooks/useFilterModal';

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
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);
  const {FilterModal, openFilterModal} = useFilterModal(
    (field, path: string[], filter) => {
      if (field.kind === 'dimension') {
        segment?.addWhere(field.name, path, filter);
      } else {
        segment?.addHaving(field.name, path, filter);
      }
      setQuery?.(rootQuery?.build());
    }
  );

  const nestOperations = useNestOperations(rootQuery);

  const nestViewWithinNestQuery = (operation: NestOperation) => {
    const segment = operation.view.getOrAddDefaultSegment();
    segment.addNest(field.name, getNestName(segment, field.name));
    setQuery?.(rootQuery?.build());
  };

  return (
    <>
      <DropdownMenu trigger={trigger} onOpenChange={onOpenChange}>
        {nestOperations.length === 0 ? (
          <>
            <DropdownMenuLabel label={'Add to new nested query as...'} />
            <OperationDropdownMenuItems
              segment={segment}
              field={field}
              path={path}
              withEmptyNest={true}
              openFilterModal={openFilterModal}
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
                  <>
                    <DropdownMenuLabel
                      label={`Add to ${operation.name} query as...`}
                    />
                    <OperationDropdownMenuItems
                      segment={operation.view.getOrAddDefaultSegment()}
                      field={field}
                      path={path}
                      openFilterModal={openFilterModal}
                    />
                  </>
                </DropdownSubMenuItem>
              );
            })}
          </>
        )}
      </DropdownMenu>
      <FilterModal />
    </>
  );
}
