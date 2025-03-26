/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {useState} from 'react';
import Button from './Button';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
}

/*
 * Provides a panel component which can be collapsed and expanded.
 */
export default function CollapsiblePanel({
  title,
  children,
}: CollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.topBar)}>
        <div {...stylex.props(styles.title)}>{title}</div>
        <div>
          <Button
            variant="flat"
            size="compact"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={isExpanded ? 'chevronDown' : 'chevronRight'}
          />
        </div>
      </div>
      {isExpanded && <div {...stylex.props(styles.content)}>{children}</div>}
    </div>
  );
}

const styles = stylex.create({
  container: {
    border: '1px solid #CCD3DB',
    borderRadius: 5,
    padding: 0,
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px',
    alignItems: 'center',
  },
  title: {
    whiteSpace: 'nowrap',
    padding: '0 4px',
    margin: 0,
  },
  content: {
    padding: '0 8px 8px 8px',
  },
});
