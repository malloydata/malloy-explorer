/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import {ResultPanel} from '../src';

const App = () => {
  return (
    <TooltipProvider>
      <div style={{display: 'flex'}}>
        <ResultPanel />
      </div>
    </TooltipProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
