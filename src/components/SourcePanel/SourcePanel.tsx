/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';

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
import {useContext} from 'react';
import {ExplorerPanelsContext} from '../../contexts/ExplorerPanelsContext';

export interface SourcePanelProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  setQuery: (query: Malloy.Query | undefined) => void;
}

type SubpanelType = 'view' | 'dimension' | 'measure' | null;

export function SourcePanel({source}: SourcePanelProps) {
  const [subpanelType, setSubpanelType] = React.useState<SubpanelType>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const {isSourcePanelOpen, setIsSourcePanelOpen} = useContext(
    ExplorerPanelsContext
  );

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
      items: groupFieldItemsByPath(source, group.items),
    }));
  }, [source, fieldItems]);

  const fieldGroupList = React.useMemo(() => {
    const groupItems =
      fieldGroupsByKindByPath.find(({group}) => group === subpanelType)
        ?.items ?? [];

    if (subpanelType === 'view') {
      return groupItems.filter(item => item.groupPath.length === 0);
    }

    return groupItems;
  }, [fieldGroupsByKindByPath, subpanelType]);

  const isSearchActive = !!searchQuery;

  if (!isSourcePanelOpen) {
    return null;
  }

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.header)}>
        <div {...stylex.props(styles.headerTopRow)}>
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
          <div>
            <Button
              icon="chevronLeft"
              tooltip="Close the source panel"
              onClick={() => setIsSourcePanelOpen(false)}
            />
          </div>
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
            <SearchResultList source={source} items={searchResultItems} />
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
                key="dimensions"
                label="Dimensions"
                startIcon={<Icon name="dimension" color="cyan" />}
                badge={
                  <Badge label={dimensions.length.toString()} color="cyan" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setSubpanelType('dimension')}
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
            </List>
          ) : (
            <FieldGroupList
              source={source}
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
  headerTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
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
