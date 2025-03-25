/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Button, Spinner} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {
  EXECUTION_STATES,
  QueryExecutionState,
  SubmittedQuery,
} from './SubmittedQuery';
import * as render from '@malloydata/render';
import DOMElement from '../primitives/DOMElement';

import '@malloydata/render/webcomponent';

export interface ResultDisplayProps {
  query: SubmittedQuery;
}

export default function ResultDisplay({query}: ResultDisplayProps) {
  let displayComponent;

  switch (query.executionState) {
    case 'compiling':
    case 'running':
      displayComponent = (
        <LoadingDisplay
          onCancel={query.onCancel}
          executionState={query.executionState}
          queryResolutionStartMillis={query.queryResolutionStartMillis}
        />
      );
      break;
    case 'canceled':
      displayComponent = (
        <div {...stylex.props(styles.statusContainer)}>
          <div {...stylex.props(styles.statusHeader)}>
            <div {...stylex.props(fontStyles.emphasized)}>Query Canceled</div>
            <div {...stylex.props(fontStyles.body)}>
              Your query was canceled; nothing to display.
            </div>
          </div>
        </div>
      );
      break;
    case 'finished':
      displayComponent = (
        <FinishedResultDisplay
          result={query.response?.result as Malloy.Result}
        />
      );
      break;
  }

  return displayComponent;
}

interface FinishedResultDisplay {
  result: Malloy.Result;
}

function FinishedResultDisplay({result}: FinishedResultDisplay) {
  const [html, setHTML] = React.useState<HTMLElement>();
  const [rendering, setRendering] = React.useState<boolean>(true);

  React.useEffect(() => {
    let canceled = false;
    setRendering(true);

    const updateResults = async () => {
      const renderer = new render.HTMLView(document);

      const html = await renderer.render(result, {
        dataStyles: {},
        isDrillingEnabled: true,
      });
      if (canceled) {
        return;
      }

      setRendering(false);
      setHTML(html);
    };

    updateResults();

    return () => {
      canceled = true;
    };
  }, [result]);

  return (
    <div>
      {rendering ? (
        <Spinner size="large" />
      ) : (
        <div>{html && <DOMElement element={html} />}</div>
      )}
    </div>
  );
}

interface LoadingDisplayProps {
  onCancel: () => void;
  executionState: Exclude<QueryExecutionState, 'finished'>;
  queryResolutionStartMillis: number;
}

function LoadingDisplay({
  onCancel,
  executionState,
  queryResolutionStartMillis,
}: LoadingDisplayProps) {
  const elapsedMillis = useTimeElapsedMillis(queryResolutionStartMillis);

  return (
    <div {...stylex.props(styles.statusContainer)}>
      <div {...stylex.props(styles.statusHeader)}>
        <Spinner size="large" style={styles.spinner} />
        <div
          {...stylex.props(fontStyles.emphasized)}
        >{`${EXECUTION_STATES[executionState]} query...`}</div>
        <div
          {...stylex.props(fontStyles.body)}
        >{`Total time elapsed: ${(elapsedMillis / 1000).toFixed(0)}s`}</div>
      </div>
      <Button onClick={onCancel} label="Cancel Query" />
    </div>
  );
}

function useTimeElapsedMillis(queryResolutionStartMillis: number) {
  const [time, setTime] = React.useState(
    Date.now() - queryResolutionStartMillis
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now() - queryResolutionStartMillis);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [queryResolutionStartMillis]);

  return time;
}

const styles = stylex.create({
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
  },
  statusHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    marginBottom: '8px',
  },
});
