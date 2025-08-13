/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import * as Monaco from './monaco/monaco_shim';
import * as React from 'react';
import type {ModelDef} from '@malloydata/malloy';

export interface CodeEditorContextProps {
  monaco?: typeof Monaco;
  modelDef?: ModelDef;
  modelUri?: URL;
  malloyToQuery?: (malloy: string) => {
    query?: Malloy.Query | undefined;
    logs: Malloy.LogMessage[];
  };
}

export const CodeEditorContext = React.createContext<CodeEditorContextProps>(
  {}
);
