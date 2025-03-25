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
import ResultDisplay from './ResultDisplay';
import {SubmittedQuery} from './SubmittedQuery';

export interface ResultPanelProps {
  source: Malloy.SourceInfo;
  draftQuery?: Malloy.Query;
  setDraftQuery?: (query: Malloy.Query) => void;
  submittedQuery?: SubmittedQuery;
}

export default function ResultPanel({
  source,
  draftQuery,
  setDraftQuery: _sdq,
  submittedQuery,
}: ResultPanelProps) {
  const [tab, setTab] = React.useState<Tab>(Tab.MALLOY);
  const views = source.schema.fields.filter(f => f.kind === 'view');
  const submittedQueryExists = submittedQuery !== undefined;

  if (!submittedQueryExists && tab !== Tab.MALLOY) {
    setTab(Tab.MALLOY);
  }

  return draftQuery || submittedQuery ? (
    <Root
      {...stylex.props(styles.tabRoot, fontStyles.body)}
      value={tab}
      onValueChange={val => setTab(val as Tab)}
    >
      <div {...stylex.props(styles.tabsContainer)}>
        <List {...stylex.props(styles.tabs)}>
          <Trigger
            value={Tab.RESULTS}
            disabled={!submittedQueryExists}
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
            disabled={!submittedQueryExists}
            {...stylex.props(fontStyles.body, styles.tab)}
          >
            {Tab.SQL}
          </Trigger>
        </List>
        {tab !== Tab.RESULTS && (
          <Button
            variant="flat"
            size="compact"
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
        )}
      </div>
      <Content value={Tab.RESULTS} {...stylex.props(styles.content)}>
        {submittedQuery && <ResultDisplay query={submittedQuery} />}
      </Content>
      <Content value={Tab.MALLOY}>malloy content</Content>
      <Content value={Tab.SQL}>sql content</Content>
    </Root>
  ) : (
    <EmptyQueryDisplay views={views} />
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
    height: '100%',
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
  content: {
    width: '100%',
    height: '100%',
  },
});
