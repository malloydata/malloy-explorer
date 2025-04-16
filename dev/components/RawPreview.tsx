/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {CodeBlock} from '../../src/components/primitives';
import {QueryEditorContext} from '../../src/contexts/QueryEditorContext';

export function RawPreview() {
  const {rootQuery} = useContext(QueryEditorContext);

  if (!rootQuery) {
    return <div>No query</div>;
  }

  return (
    <CodeBlock
      code={JSON.stringify(rootQuery.build(), null, 2)}
      language="json"
    />
  );
}
