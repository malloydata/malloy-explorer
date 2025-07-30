/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';

import {
  Badge,
  Icon,
  Divider,
  Button,
  TextInput,
  AccordionList,
  AccordionListItem,
} from '../primitives';
import {textColors} from '../primitives/colors.stylex';
import {fontStyles} from '../primitives/styles';
import {sourceToFieldItems} from './utils';
import SearchResultList from './SearchResultList';
import FieldGroupList from './FieldGroupList';
import {useContext} from 'react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {hasExplorerFilterFieldAnnotation} from '../utils/annotations';
import {ResizableCollapsiblePanelContext} from '../../contexts/ResizableCollapsiblePanelContext';

export interface SourcePanelProps {
  onRefresh: () => void;
}

export function SourcePanel({onRefresh}: SourcePanelProps) {
  const {source, rootQuery} = React.useContext(QueryEditorContext);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const {onCollapse} = useContext(ResizableCollapsiblePanelContext);

  const fieldItems = React.useMemo(() => {
    if (source) {
      return sourceToFieldItems(source).filter(
        fi => !hasExplorerFilterFieldAnnotation(fi.field.annotations ?? [])
      );
    }
    return [];
  }, [source]);

  const views = fieldItems.filter(item => item.field.kind === 'view');
  const measures = fieldItems.filter(item => item.field.kind === 'measure');
  const dimensions = fieldItems.filter(item => item.field.kind === 'dimension');

  const searchResultItems = React.useMemo(() => {
    if (searchQuery) {
      const lcSearch = searchQuery.toLocaleLowerCase();
      return fieldItems.filter(item =>
        item.field.name.toLocaleLowerCase().includes(lcSearch)
      );
    }
    return [];
  }, [fieldItems, searchQuery]);

  const isSearchActive = !!searchQuery;

  if (!source || !rootQuery) {
    return null;
  }

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.header)}>
        <div {...stylex.props(styles.headerTopRow)}>
          <div {...stylex.props(styles.heading)}>
            <Icon name="database" color="gray" />
            <div {...stylex.props(fontStyles.largeBody, styles.title)}>
              {source.name}
            </div>
          </div>
          <div {...stylex.props(styles.headerEndContent)}>
            <Button
              icon="refresh"
              tooltip="Refresh the source"
              onClick={onRefresh}
              size="compact"
              variant="flat"
            />
            {onCollapse && (
              <Button
                icon="sidebarCollapse"
                tooltip="Close the source panel"
                onClick={onCollapse}
                size="compact"
                variant="flat"
              />
            )}
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
      <div {...stylex.props(styles.content)}>
        {isSearchActive ? (
          <SearchResultList
            rootQuery={rootQuery}
            source={source}
            items={searchResultItems}
          />
        ) : (
          <AccordionList defaultExpandedItemId="views">
            <AccordionListItem
              id="dimensions"
              key="dimensions"
              label="Dimensions"
              startIcon={<Icon name="dimension" color="cyan" />}
              badge={
                <Badge label={dimensions.length.toString()} color="cyan" />
              }
            >
              <FieldGroupList
                rootQuery={rootQuery}
                source={source}
                fieldItems={fieldItems}
                fieldGroupType="dimension"
              />
            </AccordionListItem>
            <AccordionListItem
              id="measures"
              key="measures"
              label="Measures"
              startIcon={<Icon name="measure" color="green" />}
              badge={<Badge label={measures.length.toString()} color="green" />}
            >
              <FieldGroupList
                rootQuery={rootQuery}
                source={source}
                fieldItems={fieldItems}
                fieldGroupType="measure"
              />
            </AccordionListItem>
            <AccordionListItem
              id="views"
              key="views"
              label="Views"
              startIcon={<Icon name="view" color="purple" />}
              badge={<Badge label={views.length.toString()} color="purple" />}
            >
              <FieldGroupList
                rootQuery={rootQuery}
                source={source}
                fieldItems={fieldItems}
                fieldGroupType="view"
              />
            </AccordionListItem>
          </AccordionList>
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRight: '1px solid #C8CCD2',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
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
    overflow: 'hidden',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,
    color: textColors.primary,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexGrow: 1,
  },
  headerEndContent: {
    display: 'flex',
  },
});
