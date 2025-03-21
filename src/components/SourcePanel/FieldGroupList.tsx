/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {Button, CollapsibleListItem, List} from '../primitives';
import FieldToken from './FieldToken';
import {fontStyles} from '../primitives/styles';
import {type FieldGroupByPath} from './utils';

const getLabelFromPath = (path: string[]) => {
  return path.at(-1) ?? '';
};

const getSublabelFromPath = (path: string[]) => {
  return path.length > 1
    ? `joined to ${path.slice(0, -1).join(' > ')}`
    : undefined;
};

interface FieldGroupListProps {
  title: string;
  items: FieldGroupByPath[];
}

export default function FieldGroupList({
  title,
  items,
}: FieldGroupListProps): React.ReactNode {
  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.title)}>{title}</div>
      <List>
        {items.map(item => (
          <CollapsibleListItem
            key={item.path.join('.')}
            label={getLabelFromPath(item.path)}
            sublabel={getSublabelFromPath(item.path)}
          >
            {item.items.map(({field, path}) => (
              <FieldToken
                key={path.join('.')}
                field={field}
                hoverActions={
                  <>
                    <Button
                      variant="flat"
                      size="compact"
                      icon="insert"
                      onClick={() => {}}
                    />
                    <Button
                      variant="flat"
                      size="compact"
                      icon="nest"
                      onClick={() => {}}
                    />
                  </>
                }
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
