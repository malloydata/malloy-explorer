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
import {CodeBlock, Icon} from '../primitives';
import ResultDisplay from './ResultDisplay';
import {SubmittedQuery} from './SubmittedQuery';
import {useQueryBuilder} from '../../hooks/useQueryBuilder';
import {useState, useEffect} from 'react';
import {colors} from '../QueryPanel/AddMenu/colors.stylex';
import DebugPane, {DebugOptions} from './DebugPane';
import CopyToClipboard from './CopyToClipboard';

enum Tab {
  RESULTS = 'Results',
  MALLOY = 'Malloy',
  SQL = 'SQL',
  RAW_QUERY = 'Raw Query',
}

type ResultPanelOptions = {
  showRawQuery: boolean;
  debugOptions?: DebugOptions;
};

export interface ResultPanelProps {
  source: Malloy.SourceInfo;
  draftQuery?: Malloy.Query;
  setDraftQuery: (query: Malloy.Query) => void;
  submittedQuery?: SubmittedQuery;
  options?: ResultPanelOptions;
}

export default function ResultPanel({
  source,
  draftQuery,
  setDraftQuery,
  submittedQuery,
  options,
}: ResultPanelProps) {
  const [tab, setTab] = useState<Tab>(Tab.MALLOY);
  const malloyText = useQueryBuilder(source, draftQuery)?.toMalloy();
  const views = source.schema.fields.filter(f => f.kind === 'view');
  const submittedQueryExists = submittedQuery !== undefined;

  if (!submittedQueryExists && (tab === Tab.RESULTS || tab === Tab.SQL)) {
    setTab(Tab.MALLOY);
  }

  useEffect(() => {
    setTab(Tab.RESULTS);
  }, [submittedQuery]);

  const clipboardText = (() => {
    if (tab === Tab.MALLOY && malloyText) {
      return malloyText;
    } else if (tab === Tab.SQL && submittedQuery?.response?.result?.sql) {
      return submittedQuery.response.result.sql;
    } else if (tab === Tab.RAW_QUERY) {
      return JSON.stringify(draftQuery);
    }
    return null;
  })();

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
            {...stylex.props(
              fontStyles.body,
              styles.tab,
              !submittedQueryExists && styles.disabledTab
            )}
            title={
              !submittedQueryExists
                ? 'Run a query to see the results.'
                : undefined
            }
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
            {...stylex.props(
              fontStyles.body,
              styles.tab,
              !submittedQueryExists && styles.disabledTab
            )}
            title={
              !submittedQueryExists
                ? 'Run a query to see generated SQL.'
                : undefined
            }
          >
            {Tab.SQL}
          </Trigger>
          {options?.showRawQuery && (
            <Trigger
              value={Tab.RAW_QUERY}
              {...stylex.props(fontStyles.body, styles.tab)}
            >
              {Tab.RAW_QUERY}
            </Trigger>
          )}
        </List>
        {tab !== Tab.RESULTS && clipboardText && (
          <CopyToClipboard text={clipboardText} label="Copy Code" />
        )}
      </div>
      <div {...stylex.props(styles.contentContainer)}>
        <Content value={Tab.RESULTS} {...stylex.props(styles.content)}>
          {submittedQuery && (
            <>
              {draftQuery &&
                submittedQuery &&
                !queriesAreEqual(draftQuery, submittedQuery.query) && (
                  <div {...stylex.props(styles.warning, fontStyles.body)}>
                    <Icon
                      name="warning"
                      color="warning"
                      customStyle={styles.warningIcon}
                    />
                    <div>
                      <span>
                        Query was updated. Run query to see new result or
                      </span>
                      <button
                        {...stylex.props(styles.warningAction, fontStyles.link)}
                        onClick={() => {
                          setDraftQuery(submittedQuery.query);
                        }}
                      >
                        &nbsp;revert&nbsp;
                      </button>
                      <span>to the last run query.</span>
                    </div>
                  </div>
                )}
              <ResultDisplay source={source} query={submittedQuery} />
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
              language="sql"
            />
          )}
        </Content>
        {options?.showRawQuery && (
          <Content
            value={Tab.RAW_QUERY}
            {...stylex.props(styles.content, styles.codeContent)}
          >
            <DebugPane
              query={draftQuery as Malloy.Query}
              debug={
                options.debugOptions
                  ? {
                      debuggers: options.debugOptions.debuggers,
                      onDebugQuery: options.debugOptions.onDebugQuery,
                    }
                  : undefined
              }
            />
          </Content>
        )}
      </div>
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    cursor: 'pointer',
    ":is([data-state='active'])": {
      color: textColors.link,
      fontWeight: '700',
      backgroundColor: backgroundColors.accentDeemphasized,
    },
  },
  disabledTab: {
    color: colors.disabledText,
    cursor: 'initial',
  },
  contentContainer: {
    flexGrow: '1',
    overflow: 'hidden',
  },
  content: {
    padding: '12px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  codeContent: {
    padding: '0px 24px 24px 24px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  warning: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  warningAction: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0px',
    cursor: 'pointer',
  },
  warningIcon: {
    paddingRight: '8px',
  },
});
