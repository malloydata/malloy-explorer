/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import EmptyQueryDisplay from './EmptyQueryDisplay';
import {Content, List, Root, Trigger} from '@radix-ui/react-tabs';
import stylex from '@stylexjs/stylex';
import {backgroundColors, textColors} from '../primitives/colors.stylex';
import {fontStyles} from '../primitives/styles';
import {Button} from '../primitives';

export interface ResultPanelProps {
  source: Malloy.SourceInfo;
  query?: Malloy.Query;
  setQuery?: (query: Malloy.Query) => void;
}

export default function ResultPanel({
  source,
  query: _q,
  setQuery: _sq,
}: ResultPanelProps) {
  const views = source.schema.fields.filter(f => f.kind === 'view');
  const nonEmptyQuery = true;
  const queryDidRun = true;

  return (
    <div>
      {nonEmptyQuery ? (
        <Root
          {...stylex.props(styles.tabRoot, fontStyles.body)}
          defaultValue={Tab.MALLOY}
        >
          <div {...stylex.props(styles.tabsContainer)}>
            <List {...stylex.props(styles.tabs)}>
              <Trigger
                value={Tab.RESULTS}
                disabled={!queryDidRun}
                {...stylex.props(fontStyles.body, styles.tab)}
              >
                {Tab.RESULTS}
              </Trigger>
              <Trigger
                value={Tab.MALLOY}
                {...stylex.props(fontStyles.body, styles.tab)}
              >
                {Tab.MALLOY}
              </Trigger>
              <Trigger
                value={Tab.SQL}
                disabled={!queryDidRun}
                {...stylex.props(fontStyles.body, styles.tab)}
              >
                {Tab.SQL}
              </Trigger>
            </List>
            <Button
              variant="flat"
              label="Copy Code"
              icon="copy"
              onClick={() => {
                navigator.clipboard
                  .writeText('you copied some text')
                  .then(() => {
                    // todo: visually indicate copy to user
                    console.info('Text copied to clipboard!');
                  })
                  .catch(err => {
                    console.error('Error copying text: ', err);
                  });
              }}
            />
          </div>
          <Content value={Tab.RESULTS}>result content</Content>
          <Content value={Tab.MALLOY}>malloy content</Content>
          <Content value={Tab.SQL}>sql content</Content>
        </Root>
      ) : (
        <EmptyQueryDisplay views={views} />
      )}
    </div>
  );
}

enum Tab {
  RESULTS = 'Results',
  MALLOY = 'Malloy',
  SQL = 'SQL',
}

const styles = stylex.create({
  tabRoot: {
    margin: '10px',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tab: {
    border: 'none',
    padding: '4px 8px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    ":is([data-state='active'])": {
      color: textColors.link,
      fontWeight: '700',
      backgroundColor: backgroundColors.accentDeemphasized,
    },
  },
  content: {},
});
