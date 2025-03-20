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
import {modelInfo} from './example_model';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <TooltipProvider>
      <div
        style={{
          height: '100vh',
        }}
      >
        <ResultPanel source={source} />
      </div>
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
