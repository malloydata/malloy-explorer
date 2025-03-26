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
import {Button, CodeBlock, Icon} from '../primitives';
import ResultDisplay from './ResultDisplay';
import {SubmittedQuery} from './SubmittedQuery';
import {useQueryBuilder} from '../../hooks/useQueryBuilder';
import {ScrollArea} from '@radix-ui/react-scroll-area';

enum Tab {
  RESULTS = 'Results',
  MALLOY = 'Malloy',
  SQL = 'SQL',
}

export interface ResultPanelProps {
  source: Malloy.SourceInfo;
  draftQuery?: Malloy.Query;
  setDraftQuery: (query: Malloy.Query) => void;
  submittedQuery?: SubmittedQuery;
}

export default function ResultPanel({
  source,
  draftQuery,
  setDraftQuery,
  submittedQuery,
}: ResultPanelProps) {
  const [tab, setTab] = React.useState<Tab>(Tab.MALLOY);
  const malloyText = useQueryBuilder(source, draftQuery)?.toMalloy();
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
              if (tab === Tab.MALLOY && malloyText) {
                navigator.clipboard.writeText(malloyText);
              } else if (
                tab === Tab.SQL &&
                submittedQuery?.response?.result?.sql
              ) {
                navigator.clipboard.writeText(
                  submittedQuery.response.result.sql
                );
              }
            }}
          />
        )}
      </div>
      <ScrollArea>
        <Content value={Tab.RESULTS} {...stylex.props(styles.content)}>
          {submittedQuery && (
            <>
              {draftQuery &&
                submittedQuery &&
                !queriesAreEqual(draftQuery, submittedQuery.query) && (
                  <div {...stylex.props(styles.warning, fontStyles.body)}>
                    <Icon name="warning" color="warning" />
                    <span>
                      Query was updated. Run query to see new result or{' '}
                    </span>
                    <button
                      {...stylex.props(styles.warningAction, fontStyles.link)}
                      onClick={() => {
                        setDraftQuery(submittedQuery.query);
                      }}
                    >
                      revert
                    </button>
                    <span> to the last run query.</span>
                  </div>
                )}
              <ResultDisplay query={submittedQuery} />
            </>
          )}
        </Content>
        <Content
          value={Tab.MALLOY}
          {...stylex.props(styles.content, styles.codeContent)}
        >
          <CodeBlock code={malloyText ?? ''} language="malloy" />
        </Content>
        <Content
          value={Tab.SQL}
          {...stylex.props(styles.content, styles.codeContent)}
        >
          {submittedQuery?.response?.result?.sql && (
            <CodeBlock
              code={submittedQuery.response.result.sql}
              language="malloy"
            />
          )}
        </Content>
      </ScrollArea>
    </Root>
  ) : (
    <EmptyQueryDisplay
      views={views}
      onSelectView={v => setDraftQuery(viewToQuery(v.name, source.name))}
    />
  );
}

function queriesAreEqual(one: Malloy.Query, two: Malloy.Query) {
  return JSON.stringify(one) === JSON.stringify(two);
}

function viewToQuery(viewName: string, sourceName: string): Malloy.Query {
  return {
    definition: {
      kind: 'arrow',
      source: {
        kind: 'source_reference',
        name: sourceName,
      },
      view: {
        kind: 'view_reference',
        name: viewName,
      },
    },
  };
}

const styles = stylex.create({
  tabRoot: {
    height: '100%',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
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
    margin: '0px 12px 12px 12px',
    padding: '12px',
    width: '100%',
    height: '100%',
  },
  codeContent: {
    padding: '0px 12px 12px 12px',
    width: '100%',
    height: '100%',
  },
  warning: {
    display: 'flex',
    alignItems: 'center',
  },
  warningAction: {
    backgroundColor: 'transparent',
    border: 'none',
  },
});
