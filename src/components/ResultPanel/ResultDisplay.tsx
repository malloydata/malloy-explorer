/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext, useEffect, useMemo, useRef} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {Banner, Button, Spinner} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {
  EXECUTION_STATES,
  Message,
  QueryExecutionState,
  QueryResponse,
  SubmittedQuery,
} from './SubmittedQuery';
import {MalloyRenderer} from '@malloydata/render';
import {Variant} from '../primitives/Banner';
import RunInfoHover from './RunInfoHover';
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {ASTQuery} from '@malloydata/malloy-query-builder';

// TODO - export from malloy-render
export interface DrillData {
  stableQuery: Malloy.Query | undefined;
  stableDrillClauses: Malloy.DrillOperation[] | undefined;
}

export interface ResultDisplayProps {
  source: Malloy.SourceInfo;
  query: SubmittedQuery;
}

export default function ResultDisplay({source, query}: ResultDisplayProps) {
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
        <ResponseDisplay source={source} response={query.response} />
      );
      break;
  }

  return displayComponent;
}

interface ResponseProps {
  source: Malloy.SourceInfo;
  response: QueryResponse | undefined;
}

function ResponseDisplay({source, response}: ResponseProps) {
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
      {response?.result && (
        <RenderedResult result={response.result} source={source} />
      )}
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
  source: Malloy.SourceInfo;
  result: Malloy.Result;
}

function RenderedResult({result, source}: RenderedResultProps) {
  const {onDrill, setQuery} = useContext(QueryEditorContext);

  const vizContainer = useRef<HTMLDivElement>(null);
  const viz = useMemo(() => {
    const renderer = new MalloyRenderer();
    const viz = renderer.createViz({
      onDrill: ({stableQuery, stableDrillClauses}: DrillData) => {
        if (onDrill) {
          onDrill({stableQuery, stableDrillClauses});
          return;
        }
        const rootQuery = new ASTQuery({query: stableQuery, source});
        setQuery?.(rootQuery.build());
      },
      tableConfig: {enableDrill: true},
    });
    return viz;
  }, [onDrill, source, setQuery]);

  useEffect(() => {
    if (vizContainer.current && viz) {
      viz.setResult(result);
      viz.render(vizContainer.current);
    }
  }, [viz, result]);

  if (viz) {
    return (
      <div ref={vizContainer} {...stylex.props(styles.vizContainer)}></div>
    );
  } else {
    return (
      <div {...stylex.props(styles.renderingSpinnerContainer)}>
        <div {...stylex.props(styles.renderingSpinner)}>
          <Spinner size="large" />
          <div {...stylex.props(fontStyles.emphasized)}>Rendering...</div>
        </div>
      </div>
    );
  }
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
  vizContainer: {
    height: '100%',
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',
    width: '100%',
  },
});
