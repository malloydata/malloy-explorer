/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {SourceInfo} from '@malloydata/malloy-interfaces';

import {
  Badge,
  Icon,
  List,
  ListItem,
  Divider,
  ScrollableArea,
  Button,
  TextInput,
} from '../primitives';
import {textColors} from '../primitives/colors.stylex';
import {fontStyles} from '../primitives/styles';
import {
  FIELD_KIND_TO_TITLE,
  groupFieldItemsByKind,
  groupFieldItemsByPath,
  sourceToFieldItems,
} from './utils';
import SearchResultList from './SearchResultList';
import FieldGroupList from './FieldGroupList';

export interface SourcePanelProps {
  source: SourceInfo;
}

type SubpanelType = 'view' | 'dimension' | 'measure' | null;

export function SourcePanel({source}: SourcePanelProps) {
  const [subpanelType, setSubpanelType] = React.useState<SubpanelType>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const fieldItems = React.useMemo(() => {
    return sourceToFieldItems(source);
  }, [source]);

  const views = fieldItems.filter(item => item.field.kind === 'view');
  const measures = fieldItems.filter(item => item.field.kind === 'measure');
  const dimensions = fieldItems.filter(item => item.field.kind === 'dimension');

  const searchResultItems = React.useMemo(() => {
    if (searchQuery) {
      return fieldItems.filter(item => item.field.name.includes(searchQuery));
    }
    return [];
  }, [fieldItems, searchQuery]);

  const fieldGroupsByKindByPath = React.useMemo(() => {
    return groupFieldItemsByKind(fieldItems).map(group => ({
      ...group,
      items: groupFieldItemsByPath(group.items),
    }));
  }, [fieldItems]);

  const fieldGroupList = React.useMemo(() => {
    return (
      fieldGroupsByKindByPath.find(({group}) => group === subpanelType)
        ?.items ?? []
    );
  }, [fieldGroupsByKindByPath, subpanelType]);

  const isSearchActive = !!searchQuery;

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.header)}>
        <div>
          {subpanelType == null ? (
            <div {...stylex.props(styles.heading)}>
              <Icon name="database" color="gray" />
              {source.name}
            </div>
          ) : (
            <Button
              icon="chevronLeft"
              label="Back"
              variant="flat"
              size="compact"
              onClick={() => setSubpanelType(null)}
            />
          )}
        </div>
        <TextInput
          value={searchQuery}
          onChange={v => setSearchQuery(v)}
          placeholder={'Search'}
          size="compact"
          icon="search"
          hasClear={true}
        />
      </div>
      <Divider />
      <ScrollableArea>
        <div {...stylex.props(styles.content)}>
          {isSearchActive ? (
            <SearchResultList items={searchResultItems} />
          ) : subpanelType == null ? (
            <List>
              <ListItem
                key="views"
                label="Views"
                startIcon={<Icon name="view" color="purple" />}
                badge={<Badge label={views.length.toString()} color="purple" />}
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setSubpanelType('view')}
              />
              <ListItem
                key="measures"
                label="Measures"
                startIcon={<Icon name="measure" color="green" />}
                badge={
                  <Badge label={measures.length.toString()} color="green" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setSubpanelType('measure')}
              />
              <ListItem
                key="dimensions"
                label="Dimensions"
                startIcon={<Icon name="dimension" color="cyan" />}
                badge={
                  <Badge label={dimensions.length.toString()} color="cyan" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setSubpanelType('dimension')}
              />
            </List>
          ) : (
            <FieldGroupList
              title={FIELD_KIND_TO_TITLE[subpanelType]}
              items={fieldGroupList}
            />
          )}
        </div>
      </ScrollableArea>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#F1F4F7',
    boxShadow: '-1px 0px 0px 0px #C8CCD2 inset',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    color: textColors.primary,
    fontWeight: 700,
    gap: '8px',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
  },
});
