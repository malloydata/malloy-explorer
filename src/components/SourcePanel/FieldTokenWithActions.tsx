import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {getNestName} from './utils';
import {NestFieldDropdownMenu} from './NestFieldDropdownMenu';
import {useNestOperations} from './hooks/useNestOperations';
import {AddFieldDropdownMenu} from './AddFieldDropdownMenu';
import {FieldHoverCard} from '../FieldHoverCard';

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
      segment?.addNest(field.name, getNestName(segment, field.name));
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
            trigger={
              <Button
                variant="flat"
                size="compact"
                icon="insert"
                tooltip="Add to main query"
              />
            }
            onOpenChange={open => setIsAddFieldMenuOpen(open)}
          />
        ) : (
          <Button
            variant="flat"
            size="compact"
            icon="insert"
            onClick={addViewToMainQuery}
            tooltip="Add to main query"
          />
        )}
        {hasNestFieldMenu ? (
          <NestFieldDropdownMenu
            segment={segment}
            field={field}
            path={path}
            trigger={
              <Button
                variant="flat"
                size="compact"
                icon="nest"
                tooltip="Add to nested query"
              />
            }
            onOpenChange={open => setIsNestFieldMenuOpen(open)}
          />
        ) : (
          <Button
            variant="flat"
            size="compact"
            icon="nest"
            onClick={nestViewWithinMainQuery}
            tooltip="Add to nested query"
          />
        )}
      </>
    );
  };

  return hasAddFieldMenu ? (
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
      tooltip={<FieldHoverCard field={field} path={path} />}
    />
  ) : (
    <FieldToken
      field={field}
      onClick={addViewToMainQuery}
      hoverActions={hoverActions()}
      hoverActionsVisible={isAddFieldMenuOpen || isNestFieldMenuOpen}
      tooltip={<FieldHoverCard field={field} path={path} />}
    />
  );
}
