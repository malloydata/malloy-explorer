/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {createRoot} from 'react-dom/client';
import {MalloyExplorerProvider, ResultPanel} from '../src';
import {modelInfo} from './sample_models/example_model';
import {exampleResult as result} from './sample_models/example_result2';
import {SubmittedQuery} from '../src/components/ResultPanel/SubmittedQuery';
import {Button} from '../src/components/primitives';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  const [draftQuery, setDraftQuery] = React.useState<Malloy.Query>();
  const [isRun, setIsRun] = React.useState<boolean>(false);

  const submitted: SubmittedQuery | undefined = draftQuery
    ? {
        query: draftQuery,
        executionState: 'finished',
        queryResolutionStartMillis: Date.now(),
        onCancel: () => {},
        response: {
          result: result,
          messages: [{title: 'this is a warning message', severity: 'INFO'}],
          runInfo: {
            customContent: (
              <div>
                hello, press this <button>button</button>
              </div>
            ),
            queryLink: {
              linkText: 'here is a link to the query you just ran',
              href: '#',
            },
            performanceAspects: {
              time: {
                'compile time': '100s',
                'run time': '10s',
                'total time': '110s',
              },
              memory: {
                processed: '7m rows (150.08MB)',
              },
            },
          },
        },
      }
    : undefined;

  return (
    <React.StrictMode>
      <MalloyExplorerProvider
        source={source}
        query={draftQuery}
        onQueryChange={() => {}}
        topValues={[]}
        onFocusedNestViewPathChange={() => {}}
        focusedNestViewPath={[]}
      >
        <div style={{boxSizing: 'border-box', padding: '8px', height: '100vh'}}>
          <ResultPanel
            source={source}
            draftQuery={draftQuery}
            setDraftQuery={q => setDraftQuery(q)}
            submittedQuery={isRun ? submitted : undefined}
            options={{
              showRawQuery: true,
              debugOptions: {
                debuggers: ['one', 'two'],
                onDebugQuery: (a, b) => {
                  alert(`Callback with:\n${JSON.stringify(a)} \nusing "${b}"`);
                },
              },
            }}
          />
        </div>
        <Button label="Toggle Query Ran" onClick={() => setIsRun(p => !p)} />
      </MalloyExplorerProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
