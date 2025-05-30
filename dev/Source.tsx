/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {createRoot} from 'react-dom/client';
import * as Malloy from '@malloydata/malloy-interfaces';
import {modelInfo} from './sample_models/example_model';
import {MalloyExplorerProvider, SourcePanel} from '../src';

const source = modelInfo.entries.at(-1) as Malloy.SourceInfo;

const App = () => {
  return (
    <React.StrictMode>
      <MalloyExplorerProvider
        source={source}
        focusedNestViewPath={[]}
        onFocusedNestViewPathChange={() => {}}
      >
        <div style={{display: 'flex', height: '100%'}}>
          <SourcePanel
            onRefresh={() => {
              window.alert('Refresh!');
            }}
          />
        </div>
      </MalloyExplorerProvider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
