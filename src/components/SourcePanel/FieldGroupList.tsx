/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {CollapsibleListItem, List} from '../primitives';
import {FieldItem, groupFieldItemsByKind, groupFieldItemsByPath} from './utils';
import {FieldTokenWithActions} from './FieldTokenWithActions';
import {SourceInfo} from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';

const getLabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.at(-1) ?? source.name;
};

const getSublabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.length > 0
    ? `joined to ${[...path.slice(0, -1), source.name].join(' > ')}`
    : undefined;
};

interface FieldGroupListProps {
  rootQuery: ASTQuery;
  source: SourceInfo;
  fieldItems: FieldItem[];
  fieldGroupType: 'view' | 'measure' | 'dimension';
}

export default function FieldGroupList({
  rootQuery,
  source,
  fieldItems,
  fieldGroupType,
}: FieldGroupListProps): React.ReactNode {
  const fieldGroupsByKindByPath = React.useMemo(() => {
    if (source) {
      return groupFieldItemsByKind(fieldItems).map(group => ({
        ...group,
        items: groupFieldItemsByPath(source, group.items),
      }));
    }
    return [];
  }, [source, fieldItems]);

  const items = React.useMemo(() => {
    return (
      fieldGroupsByKindByPath.find(({group}) => group === fieldGroupType)
        ?.items ?? []
    );
  }, [fieldGroupsByKindByPath, fieldGroupType]);

  const viewDef = rootQuery.definition;

  if (!(viewDef instanceof ASTArrowQueryDefinition)) {
    return null;
  }

  return (
    <div {...stylex.props(styles.main)}>
      <List>
        {items.map((item, index) => (
          <CollapsibleListItem
            key={item.groupPath.join('.')}
            label={getLabelFromPath(source, item.groupPath)}
            sublabel={getSublabelFromPath(source, item.groupPath)}
            isInitiallyExpanded={index === 0}
          >
            {item.items.map(({field, path}) => (
              <FieldTokenWithActions
                rootQuery={rootQuery}
                key={[...path, field.name].join('.')}
                field={field}
                path={path}
                viewDef={viewDef}
              />
            ))}
          </CollapsibleListItem>
        ))}
      </List>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    padding: '8px',
    fontWeight: 700,
  },
});
