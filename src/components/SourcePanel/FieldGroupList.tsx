/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {CollapsibleListItem, List} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {FieldGroupByPath} from './utils';
import {FieldTokenWithActions} from './FieldTokenWithActions';
import {SourceInfo} from '@malloydata/malloy-interfaces';

const getLabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.at(-1) ?? source.name;
};

const getSublabelFromPath = (source: SourceInfo, path: string[]) => {
  return path.length > 0
    ? `joined to ${[...path.slice(0, -1), source.name].join(' > ')}`
    : undefined;
};

interface FieldGroupListProps {
  source: SourceInfo;
  title: string;
  items: FieldGroupByPath[];
}

export default function FieldGroupList({
  source,
  title,
  items,
}: FieldGroupListProps): React.ReactNode {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.title)}>{title}</div>
      <List>
        {items.map(item => (
          <CollapsibleListItem
            key={item.groupPath.join('.')}
            label={getLabelFromPath(source, item.groupPath)}
            sublabel={getSublabelFromPath(source, item.groupPath)}
          >
            {item.items.map(({field, path}) => (
              <FieldTokenWithActions
                key={[...path, field.name].join('.')}
                field={field}
                path={path}
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
