/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {CollapsibleListItem, List} from '../primitives';
import {FieldItem, groupFieldItemsByKind, groupFieldItemsByPath} from './utils';
import {FieldTokenWithActions} from './FieldTokenWithActions';
import {SourceInfo} from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import {FieldTokenWithCopy} from './FieldTokenWithCopy';

const getLabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.at(-1) ?? source.name;
};

const getSublabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.length > 0
    ? `joined to ${[...path.slice(0, -1), source.name].join(' > ')}`
    : undefined;
};

interface FieldGroupListProps {
  rootQuery?: ASTQuery;
  source: SourceInfo;
  fieldItems: FieldItem[];
  fieldGroupType: 'view' | 'measure' | 'dimension';
  onCopy: (field: Malloy.FieldInfo, path: string[]) => void;
}

export default function FieldGroupList({
  rootQuery,
  source,
  fieldItems,
  fieldGroupType,
  onCopy,
}: FieldGroupListProps): React.ReactNode {
  const fieldGroupsByKindByPath = React.useMemo(() => {
    return groupFieldItemsByKind(fieldItems).map(group => ({
      ...group,
      items: groupFieldItemsByPath(source, group.items),
    }));
  }, [source, fieldItems]);

  const items = React.useMemo(() => {
    return (
      fieldGroupsByKindByPath.find(({group}) => group === fieldGroupType)
        ?.items ?? []
    );
  }, [fieldGroupsByKindByPath, fieldGroupType]);

  const viewDef = rootQuery?.definition;
  const astMode = rootQuery && viewDef instanceof ASTArrowQueryDefinition;

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
            {item.items.map(({field, path}) =>
              astMode ? (
                <FieldTokenWithActions
                  rootQuery={rootQuery}
                  key={[...path, field.name].join('.')}
                  field={field}
                  path={path}
                  viewDef={viewDef}
                />
              ) : (
                <FieldTokenWithCopy
                  key={[...path, field.name].join('.')}
                  field={field}
                  path={path}
                  onCopy={onCopy}
                />
              )
            )}
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
