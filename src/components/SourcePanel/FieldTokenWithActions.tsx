import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {NestFieldDropdownMenu} from './NestFieldDropdownMenu';
import {useNestOperations} from './hooks/useNestOperations';
import {AddFieldDropdownMenu} from './AddFieldDropdownMenu';
import {FieldHoverCard} from '../FieldHoverCard';
import {ASTArrowQueryDefinition} from '@malloydata/malloy-query-builder';
import {addNest} from '../utils/segment';

interface FieldTokenWithActionsProps {
  field: Malloy.FieldInfo;
  path: string[];
}

export function FieldTokenWithActions({
  field,
  path,
}: FieldTokenWithActionsProps) {
  const {rootQuery, setQuery} = React.useContext(QueryEditorContext);

  const [isAddFieldMenuOpen, setIsAddFieldMenuOpen] = useState<
    boolean | undefined
  >();

  const [isNestFieldMenuOpen, setIsNestFieldMenuOpen] = useState<
    boolean | undefined
  >();

  const nestViews = useNestOperations(rootQuery);
  const viewDef = rootQuery?.definition;

  if (!(viewDef instanceof ASTArrowQueryDefinition)) {
    return null;
  }

  const hasAddFieldMenu =
    field.kind === 'measure' || field.kind === 'dimension';

  const hasNestFieldMenu =
    field.kind === 'measure' ||
    field.kind === 'dimension' ||
    (field.kind === 'view' && nestViews.length > 0);

  const addViewToMainQuery = () => {
    if (field.kind === 'view') {
      if (rootQuery?.isEmpty()) {
        rootQuery?.setView(field.name);
      } else {
        addNest(viewDef, field);
      }
      setQuery?.(rootQuery?.build());
    }
  };

  const nestViewWithinMainQuery = () => {
    if (field.kind === 'view') {
      addNest(viewDef, field);
      setQuery?.(rootQuery?.build());
    }
  };

  const hoverActions = () => {
    return (
      <>
        {hasAddFieldMenu ? (
          <AddFieldDropdownMenu
            view={viewDef}
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
            view={viewDef}
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
      view={viewDef}
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
      tooltipProps={{
        side: 'right',
        align: 'start',
        alignOffset: 28,
      }}
    />
  ) : (
    <FieldToken
      field={field}
      onClick={addViewToMainQuery}
      hoverActions={hoverActions()}
      hoverActionsVisible={isAddFieldMenuOpen || isNestFieldMenuOpen}
      tooltip={<FieldHoverCard field={field} path={path} />}
      tooltipProps={{
        side: 'right',
        align: 'start',
        alignOffset: 28,
      }}
    />
  );
}
