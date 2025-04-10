/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {SelectDropdown} from '../primitives/SelectDropdown';
import {Button, CodeBlock} from '../primitives';
import {useState} from 'react';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';

export type DebugOptions = {
  debuggers: string[];
  onDebugQuery: (query: Malloy.Query, selectedDebugger: string) => void;
};

interface DebugPaneProps {
  query: Malloy.Query;
  debug?: DebugOptions;
}

export default function DebugPane({query, debug}: DebugPaneProps) {
  const [selectedDebugger, setSelectedDebugger] = useState<string>();

  return (
    <div>
      {debug && (
        <div {...stylex.props(styles.debugDisplay)}>
          <div {...stylex.props(fontStyles.largeBody)}>Debug with:</div>
          <SelectDropdown
            options={debug.debuggers.map(d => ({label: d, value: d}))}
            value={selectedDebugger}
            onChange={v => setSelectedDebugger(v)}
          />
          <Button
            variant="default"
            label="Run"
            isDisabled={!selectedDebugger}
            onClick={() =>
              selectedDebugger && debug.onDebugQuery(query, selectedDebugger)
            }
          />
        </div>
      )}
      <CodeBlock code={JSON.stringify(query, null, 2)} language="json" />
    </div>
  );
}

const styles = stylex.create({
  debugDisplay: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
});
