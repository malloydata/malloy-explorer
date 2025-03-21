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
  CollapsibleListItem,
} from '../primitives';
import {textColors} from '../primitives/colors.stylex';
import FieldToken from './FieldToken';
import {fontStyles} from '../primitives/styles';
import {
  FIELD_KIND_TO_TITLE,
  groupFieldItemsByKind,
  groupFieldItemsByPath,
  sourceToFieldItems,
} from './utils';
import SearchResultList from './SearchResultList';

export interface SourcePanelProps {
  source: SourceInfo;
}

type PanelType = 'view' | 'dimension' | 'measure' | null;

export function SourcePanel({source}: SourcePanelProps) {
  const [panelType, setPanelType] = React.useState<PanelType>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const fieldItems = React.useMemo(() => {
    return sourceToFieldItems(source);
  }, [source]);

  const fieldGroupsByKindByPath = React.useMemo(() => {
    return groupFieldItemsByKind(fieldItems).map(group => ({
      ...group,
      items: groupFieldItemsByPath(group.items),
    }));
  }, [fieldItems]);

  const views =
    fieldGroupsByKindByPath.find(({group}) => group === 'view')?.items ?? [];
  const measures =
    fieldGroupsByKindByPath.find(({group}) => group === 'measure')?.items ?? [];
  const dimensions =
    fieldGroupsByKindByPath.find(({group}) => group === 'dimension')?.items ??
    [];

  const filteredFieldItems = React.useMemo(() => {
    if (searchQuery) {
      return fieldItems.filter(item => item.field.name.includes(searchQuery));
    }
    return [];
  }, [fieldItems, searchQuery]);

  const isSearchActive = !!searchQuery;

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.header)}>
        <div>
          {panelType == null ? (
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
              onClick={() => setPanelType(null)}
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
            <SearchResultList items={filteredFieldItems} />
          ) : panelType == null ? (
            <List>
              <ListItem
                key="views"
                label="Views"
                startIcon={<Icon name="view" color="purple" />}
                badge={<Badge label={views.length.toString()} color="purple" />}
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('view')}
              />
              <ListItem
                key="measures"
                label="Measures"
                startIcon={<Icon name="measure" color="green" />}
                badge={
                  <Badge label={measures.length.toString()} color="green" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('measure')}
              />
              <ListItem
                key="dimensions"
                label="Dimensions"
                startIcon={<Icon name="dimension" color="cyan" />}
                badge={
                  <Badge label={dimensions.length.toString()} color="cyan" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('dimension')}
              />
            </List>
          ) : (
            <div {...stylex.props(styles.fieldListContainer)}>
              <div {...stylex.props(fontStyles.body, styles.contentHeading)}>
                {FIELD_KIND_TO_TITLE[panelType]}
              </div>
              <List>
                {(
                  fieldGroupsByKindByPath.find(({group}) => group === panelType)
                    ?.items ?? []
                ).map(item => {
                  const {path} = item;
                  const title = path.at(-1) ?? '';
                  const subtitle =
                    path.length > 1
                      ? `joined to ${path.slice(0, -1).join(' > ')}`
                      : undefined;
                  return (
                    <CollapsibleListItem
                      label={title}
                      sublabel={subtitle}
                      key={`${item.pathKey}`}
                    >
                      {item.items.map(({field}) => (
                        <FieldToken
                          key={`${field.kind}::${field.name}`}
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
                  );
                })}
              </List>
            </div>
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
  fieldListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  contentHeading: {
    padding: '8px',
    fontWeight: 700,
  },
});
