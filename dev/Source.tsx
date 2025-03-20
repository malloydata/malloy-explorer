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
import {MalloyExplorerProvider, SourcePanel} from '../src';
import Buttons from './components/Buttons';
import TokenGroups from './components/TokensGroups';
import EditableTokens from './components/EditableTokens';
import TextInputs from './components/TextInputs';
const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <MalloyExplorerProvider>
      <div style={{display: 'flex'}}>
        <SourcePanel source={source} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '8px',
          }}
        >
          <Buttons />
          <EditableTokens />
          <TokenGroups />
          <TextInputs />
        </div>
      </div>
    </MalloyExplorerProvider>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
