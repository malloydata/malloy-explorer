/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createRoot} from 'react-dom/client';
import * as Malloy from '@malloydata/malloy-interfaces';
import {MalloyExplorerProvider} from '../src';
import Buttons from './components/Buttons';
import TokenGroups from './components/TokensGroups';
import EditableTokens from './components/EditableTokens';
import TextInputs from './components/TextInputs';
import DatePickers from './components/DatePickers';
import SelectorTokens from './components/SelectorTokens';
import PillInputs from './components/PillInput';
import CodeBlocks from './components/CodeBlocks';
import Banners from './components/Banners';
import {modelInfo} from './sample_models/example_model';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <React.StrictMode>
      <MalloyExplorerProvider source={source}>
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
          <CodeBlocks />
          <Banners />
        </div>
      </MalloyExplorerProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
