/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createRoot} from 'react-dom/client';
import * as Malloy from '@malloydata/malloy-interfaces';
import {modelInfo} from './example_model';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import {SourcePanel} from '../src';
import ShowcaseButtons from './components/Buttons';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <TooltipProvider>
      <div style={{display: 'flex'}}>
        <SourcePanel source={source} />
        <div style={{padding: '8px'}}>
          <ShowcaseButtons />
        </div>
      </div>
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
