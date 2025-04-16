/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Button} from '../primitives';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {fontStyles, tooltipStyles} from '../primitives/styles';
import {useContext} from 'react';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';

/**
 * Source
 */
export interface QueryActionBarProps {
  runQuery: (source: Malloy.SourceInfo, query: Malloy.Query) => void;
}

export function QueryActionBar({runQuery}: QueryActionBarProps) {
  const {rootQuery, setQuery, source} = useContext(QueryEditorContext);

  const isQueryEmpty = !rootQuery || rootQuery.isEmpty();
  const isRunEnabled = rootQuery?.isRunnable();
  const onRunQuery = () => {
    if (source && rootQuery) {
      runQuery(source, rootQuery.build());
    }
  };
  return (
    <div {...stylex.props(actionBarStyles.root)}>
      <div {...stylex.props(actionBarStyles.title)}>Query</div>
      <div {...stylex.props(actionBarStyles.buttons)}>
        <Button
          onClick={() => setQuery?.(undefined)}
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
      </div>
    </div>
  );
}

const actionBarStyles = stylex.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    gap: 8,
  },
});
