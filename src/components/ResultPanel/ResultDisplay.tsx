/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Banner, Button, ScrollableArea, Spinner} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {
  EXECUTION_STATES,
  Message,
  QueryExecutionState,
  QueryResponse,
  SubmittedQuery,
} from './SubmittedQuery';
import * as render from '@malloydata/render';
import DOMElement from '../primitives/DOMElement';
// CSS file needed because stylex doesn't support ::part selector
import './result_display.css';

import '@malloydata/render/webcomponent';
import {Variant} from '../primitives/Banner';
import RunInfoHover from './RunInfoHover';

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
      displayComponent = <ResponseDisplay response={query.response} />;
      break;
  }

  return displayComponent;
}

interface ResponseProps {
  response: QueryResponse | undefined;
}

function ResponseDisplay({response}: ResponseProps) {
  let messageComponent = null;

  if (!response) {
    messageComponent = <Banner title="Empty Response" variant="critical" />;
  } else if (response.error || response.messages) {
    messageComponent = (
      <Banners
        messages={[
          ...(response.error ? [response.error] : []),
          ...(response.messages ? response.messages : []),
        ]}
      />
    );
  } else if (!response.result) {
    messageComponent = <Banner title="Empty Result" variant="critical" />;
  }

  return (
    <div {...stylex.props(styles.resultContainer)}>
      {response?.runInfo && <RunInfoHover runInfo={response.runInfo} />}
      {messageComponent}
      {response?.result && <RenderedResult result={response.result} />}
    </div>
  );
}

interface BannersProps {
  messages: Array<Message>;
}

function Banners({messages}: BannersProps) {
  return (
    <div>
      {messages.map(m => {
        let banner = null;

        if (m.customRenderer) {
          banner = m.customRenderer;
        } else {
          let variant: Variant;
          switch (m.severity) {
            case 'DEBUG':
            case 'INFO':
              variant = 'info';
              break;
            case 'WARN':
              variant = 'warn';
              break;
            case 'ERROR':
            case 'FATAL':
              variant = 'critical';
              break;
            default:
              variant = 'critical';
          }

          banner = (
            <Banner
              title={m.title}
              description={m.description}
              variant={variant}
            >
              {m.content}
            </Banner>
          );
        }

        return <div key={m.title}>{banner}</div>;
      })}
    </div>
  );
}

interface RenderedResultProps {
  result: Malloy.Result;
}

function RenderedResult({result}: RenderedResultProps) {
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

  if (!rendering)
    return (
      html && (
        <DOMElement className="malloy-render_result-wrapper" element={html} />
      )
    );

  return (
    <ScrollableArea>
      <div {...stylex.props(styles.renderingSpinnerContainer)}>
        <div {...stylex.props(styles.renderingSpinner)}>
          <Spinner size="large" />
          <div {...stylex.props(fontStyles.emphasized)}>Rendering...</div>
        </div>
      </div>
    </ScrollableArea>
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
        <Spinner size="large" customStyle={styles.spinner} />
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
  renderingSpinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderingSpinner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: '100%',
  },
});
