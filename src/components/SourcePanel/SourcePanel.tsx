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
  Divider,
  Button,
  TextInput,
  AccordionList,
  AccordionListItem,
} from '../primitives';
import * as Toast from '@radix-ui/react-toast';
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
  const [copyToastOpen, setCopyToastOpen] = React.useState(false);
  const [copyPath, setCopyPath] = React.useState('');

  const fieldItems = React.useMemo(() => {
    return sourceToFieldItems(source).filter(
      fi => !hasExplorerFilterFieldAnnotation(fi.field.annotations ?? [])
    );
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

  const onCopy = React.useCallback(
    (field: Malloy.FieldInfo, path: string[]) => {
      const copyPath = [...path, field.name].join('.');
      window.navigator.clipboard.writeText(copyPath);
      setCopyToastOpen(true);
      setCopyPath(copyPath);
    },
    []
  );

  return (
    <Toast.ToastProvider duration={3000}>
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
              onCopy={onCopy}
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
                  onCopy={onCopy}
                />
              </AccordionListItem>
              <AccordionListItem
                id="measures"
                key="measures"
                label="Measures"
                startIcon={<Icon name="measure" color="green" />}
                badge={
                  <Badge label={measures.length.toString()} color="green" />
                }
              >
                <FieldGroupList
                  rootQuery={rootQuery}
                  source={source}
                  fieldItems={fieldItems}
                  fieldGroupType="measure"
                  onCopy={onCopy}
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
                  onCopy={onCopy}
                />
              </AccordionListItem>
            </AccordionList>
          )}
        </div>
        <Toast.Root
          open={copyToastOpen}
          onOpenChange={setCopyToastOpen}
          {...stylex.props(styles.toastRoot)}
        >
          <Toast.Title
            {...stylex.props(styles.toastTitle, fontStyles.emphasized)}
          >
            Copied to clipboard
          </Toast.Title>
          <Toast.Description
            {...stylex.props(styles.toastDescription, fontStyles.body)}
          >
            Copied <code>{copyPath}</code> to clipboard
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport {...stylex.props(styles.toastViewport)} />
      </div>
    </Toast.ToastProvider>
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
  toastRoot: {
    padding: 10,
  },
  toastTitle: {},
  toastDescription: {},
  toastViewport: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
});
