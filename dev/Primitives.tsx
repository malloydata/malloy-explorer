/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {MalloyExplorerProvider} from '../src';
import Buttons from './components/Buttons';
import TokenGroups from './components/TokensGroups';
import EditableTokens from './components/EditableTokens';
import TextInputs from './components/TextInputs';
import DatePickers from './components/DatePickers';
import SelectorTokens from './components/SelectorTokens';
import PillInputs from './components/PillInput';

const App = () => {
  return (
    <MalloyExplorerProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Buttons />
        <EditableTokens />
        <SelectorTokens />
        <TokenGroups />
        <TextInputs />
        <DatePickers />
        <PillInputs />
      </div>
    </MalloyExplorerProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
