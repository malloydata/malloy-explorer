/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {createRoot} from 'react-dom/client';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import {ResultPanel} from '../src';
import {modelInfo, queries} from './sample_models/example_model';
import CodeBlocks from './components/CodeBlocks';
import {SubmittedQuery} from '../src/components/ResultPanel/SubmittedQuery';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;
const q = queries.at(0) as Malloy.Query;

const App = () => {
  const submitted: SubmittedQuery = {
    query: q,
    executionState: 'canceled',
    queryResolutionStartMillis: Date.now(),
    onCancel: () => {
      console.log('canceling query...');
    },
  };

  return (
    <TooltipProvider>
      <h3>Result Panel:</h3>
      <div
        style={{
          height: '80vh',
        }}
      >
        <ResultPanel
          source={source}
          draftQuery={q}
          submittedQuery={submitted}
        />
      </div>
      <h3>Components:</h3>
      <CodeBlocks />
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
