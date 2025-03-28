import React, {useState} from 'react';
import FieldToken from '../FieldToken';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Button} from '../primitives';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {Menu, MenuItem} from '../Menu';
import {useQueryOperations} from './hooks/useQueryOperations';

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

  const {isAggregateAllowed, isGroupByAllowed, isOrderByAllowed} =
    useQueryOperations(segment, field, path);

  const [isNestFieldMenuOpen, setIsNestFieldMenuOpen] = useState<
    boolean | undefined
  >();
  const [isAddFieldMenuOpen, setIsAddFieldMenuOpen] = useState<
    boolean | undefined
  >();

  const addFieldToMainQuery = () => {
    if (field.kind === 'view') {
      rootQuery?.setView(field.name);
      setQuery?.(rootQuery?.build());
    }
  };

  const hasAddFieldMenu =
    field.kind === 'measure' || field.kind === 'dimension';

  const addFieldMenuItems = (): MenuItem[] => {
    if (field.kind === 'measure') {
      return [
        {
          label: 'Aggregate',
          onClick: () => {
            if (isAggregateAllowed) {
              segment?.addAggregate(field.name, path);
              setQuery?.(rootQuery?.build());
            }
          },
          disable: () => !isAggregateAllowed,
        },
        {
          label: 'Filter',
          onClick: () => {
            const segment = rootQuery?.getOrAddDefaultSegment();
            segment?.addAggregate(field.name, path);
            setQuery?.(rootQuery?.build());
          },
        },
        {
          label: 'Order by',
          onClick: () => {
            if (isOrderByAllowed) {
              segment?.addOrderBy(field.name, 'asc');
              setQuery?.(rootQuery?.build());
            }
          },
          disable: () => !isOrderByAllowed,
        },
      ];
    } else if (field.kind === 'dimension') {
      return [
        {
          label: 'Filter',
          onClick: () => {},
        },
        {
          label: 'Group by',
          onClick: () => {
            if (isGroupByAllowed) {
              segment?.addGroupBy(field.name, path);
              setQuery?.(rootQuery?.build());
            }
          },
          disable: () => !isGroupByAllowed,
        },
        {
          label: 'Order by',
          onClick: () => {
            if (isOrderByAllowed) {
              segment?.addOrderBy(field.name, 'asc');
              setQuery?.(rootQuery?.build());
            }
          },
          disable: () => !isOrderByAllowed,
        },
      ];
    } else {
      return [];
    }
  };

  const hadNestFieldMenu = true;

  const nestFieldMenuItems = (): MenuItem[] => {
    return [];
  };

  return (
    <FieldToken
      field={field}
      onClick={addFieldToMainQuery}
      hasMenu={hasAddFieldMenu}
      menuItems={addFieldMenuItems()}
      hoverActionsVisible={isAddFieldMenuOpen || isNestFieldMenuOpen}
      hoverActions={
        <>
          {hasAddFieldMenu ? (
            <Menu
              trigger={<Button variant="flat" size="compact" icon="insert" />}
              items={addFieldMenuItems()}
              onOpenChange={open => setIsAddFieldMenuOpen(open)}
            />
          ) : (
            <Button
              variant="flat"
              size="compact"
              icon="insert"
              onClick={addFieldToMainQuery}
            />
          )}
          {hadNestFieldMenu ? (
            <Menu
              trigger={
                <Button
                  variant="flat"
                  size="compact"
                  icon="nest"
                  onClick={() => {}}
                />
              }
              items={nestFieldMenuItems()}
              onOpenChange={open => setIsNestFieldMenuOpen(open)}
            />
          ) : (
            <Button
              variant="flat"
              size="compact"
              icon="nest"
              onClick={() => {}}
            />
          )}
        </>
      }
    />
  );
}
