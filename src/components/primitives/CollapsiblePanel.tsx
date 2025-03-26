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
import {IconType} from './utils/icon';
import Icon from './Icon';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;

  // The icon to be shown to the left of the title.
  icon?: IconType;
}

/*
 * Provides a panel component which can be collapsed and expanded.
 */
export default function CollapsiblePanel({
  title,
  children,
  icon,
}: CollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.topBar)}>
        {icon && <Icon name={icon} style={styles.icon} />}
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
    gap: '8px',
    alignItems: 'center',
  },
  title: {
    whiteSpace: 'nowrap',
    padding: '0 4px',
    margin: 0,
    flexGrow: 1,
  },
  icon: {},
  content: {
    padding: '0 8px 8px 8px',
  },
});
