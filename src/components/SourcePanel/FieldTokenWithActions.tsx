import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {NestFieldDropdownMenu} from './NestFieldDropdownMenu';
import {useNestOperations} from './hooks/useNestOperations';
import {AddFieldDropdownMenu} from './AddFieldDropdownMenu';
import HoverCard from '../HoverCard';

interface FieldTokenWithActionsProps {
  field: Malloy.FieldInfo;
  path: string[];
}

export function FieldTokenWithActions({
  field,
  path,
}: FieldTokenWithActionsProps) {
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

  const segment = rootQuery?.getOrAddDefaultSegment();

  const [isAddFieldMenuOpen, setIsAddFieldMenuOpen] = useState<
    boolean | undefined
  >();

  const [isNestFieldMenuOpen, setIsNestFieldMenuOpen] = useState<
    boolean | undefined
  >();

  const nestViews = useNestOperations(rootQuery);

  const hasAddFieldMenu =
    field.kind === 'measure' || field.kind === 'dimension';

  const hasNestFieldMenu =
    field.kind === 'measure' ||
    field.kind === 'dimension' ||
    (field.kind === 'view' && nestViews.length > 0);

  const addViewToMainQuery = () => {
    if (field.kind === 'view') {
      rootQuery?.setView(field.name);
      setQuery?.(rootQuery?.build());
    }
  };

  const nestViewWithinMainQuery = () => {
    if (field.kind === 'view') {
      segment?.addNest(field.name, getNestName(segment));
      setQuery?.(rootQuery?.build());
    }
  };

  const hoverActions = () => {
    return (
      <>
        {hasAddFieldMenu ? (
          <AddFieldDropdownMenu
            segment={segment}
            field={field}
            path={path}
            trigger={<Button variant="flat" size="compact" icon="insert" />}
            onOpenChange={open => setIsAddFieldMenuOpen(open)}
          />
        ) : (
          <Button
            variant="flat"
            size="compact"
            icon="insert"
            onClick={addViewToMainQuery}
          />
        )}
        {hasNestFieldMenu ? (
          <NestFieldDropdownMenu
            segment={segment}
            field={field}
            path={path}
            trigger={<Button variant="flat" size="compact" icon="nest" />}
            onOpenChange={open => setIsNestFieldMenuOpen(open)}
          />
        ) : (
          <Button
            variant="flat"
            size="compact"
            icon="nest"
            onClick={nestViewWithinMainQuery}
          />
        )}
      </>
    );
  };

  return (
    <HoverCard field={field} pathParts={path}>
      {hasAddFieldMenu ? (
        <AddFieldDropdownMenu
          segment={segment}
          field={field}
          path={path}
          trigger={
            <FieldToken
              field={field}
              hoverActionsVisible={isAddFieldMenuOpen || isNestFieldMenuOpen}
              hoverActions={hoverActions()}
              asButtonTrigger
            />
          }
          onOpenChange={open => setIsAddFieldMenuOpen(open)}
        />
      ) : (
        <FieldToken
          field={field}
          onClick={addViewToMainQuery}
          hoverActions={hoverActions()}
          hoverActionsVisible={isAddFieldMenuOpen || isNestFieldMenuOpen}
        />
      )}
    </HoverCard>
  );
}
