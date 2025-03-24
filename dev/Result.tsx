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
import {modelInfo} from './sample_models/example_model';
import CodeBlocks from './components/CodeBlocks';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <TooltipProvider>
      <h3>Result Panel:</h3>
      <div
        style={{
          height: '80vh',
        }}
      >
        <ResultPanel source={source} />
      </div>
      <h3>Components:</h3>
      <CodeBlocks />
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
