/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {createRoot} from 'react-dom/client';
import {ResultPanel} from '../src';
import {modelInfo, result} from './sample_models/example_model';
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
        },
      }
    : undefined;

  return (
    <React.StrictMode>
      <div style={{boxSizing: 'border-box', padding: '8px', height: '100vh'}}>
        <ResultPanel
          source={source}
          draftQuery={draftQuery}
          setDraftQuery={q => setDraftQuery(q)}
          submittedQuery={isRun ? submitted : undefined}
          options={{showRawQuery: true}}
        />
      </div>
      <Button label="Toggle Query Ran" onClick={() => setIsRun(p => !p)} />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
