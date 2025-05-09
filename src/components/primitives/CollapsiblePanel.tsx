/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {ReactNode, useState} from 'react';
import Button from './Button';
import {IconType} from './utils/icon';
import Icon from './Icon';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;

  // The icon to be shown to the left of the title.
  icon?: IconType;

  // Controls whether the panel starts open, default true
  defaultOpen?: boolean;

  // Additional controls to display by the collapse button when open
  controls?: ReactNode;

  // Additional controls to display by the collapse button when closed
  collapsedControls?: ReactNode;

  isFocused?: boolean;
}

/*
 * Provides a panel component which can be collapsed and expanded.
 */
export default function CollapsiblePanel({
  title,
  children,
  icon,
  defaultOpen = true,
  controls,
  collapsedControls,
  isFocused: isFocused = false,
}: CollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <div {...stylex.props(styles.container, isFocused && styles.focused)}>
      <div {...stylex.props(styles.topBar)}>
        <div {...stylex.props(styles.topBarStartSection)}>
          {icon && <Icon name={icon} customStyle={styles.icon} />}
          <div {...stylex.props(styles.title)}>{title}</div>
        </div>
        <div {...stylex.props(styles.topBarRightSection)}>
          {isExpanded ? (
            <div {...stylex.props(styles.controls)}>{controls}</div>
          ) : (
            <div {...stylex.props(styles.controls)}>{collapsedControls}</div>
          )}
          <Button
            variant="flat"
            size="compact"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={isExpanded ? 'chevronDown' : 'chevronRight'}
            tooltip={isExpanded ? 'Collapse' : 'Expand'}
          />
        </div>
      </div>
      {isExpanded && <div {...stylex.props(styles.content)}>{children}</div>}
    </div>
  );
}

const styles = stylex.create({
  container: {
    boxShadow: '0 0 0 1px #CCD3DB',
    borderRadius: 5,
    padding: 0,
  },
  focused: {
    boxShadow: '0 0 0 2px rgba(0, 100, 224, 1)',
  },
  topBar: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'start',
    padding: '4px',
    gap: '8px',
    alignItems: 'center',
  },
  topBarStartSection: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '8px',
  },
  topBarRightSection: {
    display: 'flex',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 4px',
    margin: 0,
    fontWeight: 'bold',
  },
  icon: {},
  content: {
    padding: '0 8px 8px 8px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
});
