/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import EditorPanel from '../src/components/EditorPanel/EditorPanel';

const PLACEHOLDER = `\
source: flights is duckdb.table('flights.malloy') {
}
`;

const App = () => {
  const [text, setText] = useState(PLACEHOLDER);
  return (
    <React.StrictMode>
      <EditorPanel language="malloy" value={text} onChange={setText} />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
