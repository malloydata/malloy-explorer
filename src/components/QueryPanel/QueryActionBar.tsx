/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Button, Icon} from '../primitives';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {fontStyles, tooltipStyles} from '../primitives/styles';
import {useContext} from 'react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {ResizableCollapsiblePanelContext} from '../../contexts/ResizableCollapsiblePanelContext';
import {useQueryFocus} from '../MalloyQueryFocusProvider';

/**
 * Source
 */
export interface QueryActionBarProps {
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
}

export function QueryActionBar({runQuery}: QueryActionBarProps) {
  const {rootQuery, setQuery, source} = useContext(QueryEditorContext);
  const {onCollapse} = useContext(ResizableCollapsiblePanelContext);

  const {focusMainView} = useQueryFocus();

  const isQueryEmpty = !rootQuery || rootQuery.isEmpty();
  const isRunEnabled = rootQuery?.isRunnable();
  const onRunQuery = () => {
    if (source && rootQuery) {
      runQuery(source, rootQuery.build());
    }
  };

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.startContent)}>
        <Icon name="filterSliders" />
        <div {...stylex.props(fontStyles.largeBody, styles.title)}>Query</div>
      </div>
      <div {...stylex.props(styles.buttons)}>
        <Button
          onClick={() => {
            focusMainView();
            setQuery?.(undefined);
          }}
          isDisabled={!rootQuery || rootQuery?.isEmpty()}
          label="Clear"
          variant="flat"
          size="compact"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              icon="play"
              onClick={onRunQuery}
              isDisabled={!isRunEnabled}
              label="Run"
              variant="primary"
              size="compact"
            />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>
              <div {...stylex.props(fontStyles.body, tooltipStyles.default)}>
                {isRunEnabled
                  ? 'Execute the query.'
                  : isQueryEmpty
                    ? 'The current query is empty.'
                    : 'The current query cannot be executed.'}
              </div>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
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
  );
}

const styles = stylex.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
  },
  startContent: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    padding: '4px 8px',
  },
  title: {
    fontWeight: '700',
  },
  buttons: {
    display: 'flex',
    gap: 8,
  },
});
