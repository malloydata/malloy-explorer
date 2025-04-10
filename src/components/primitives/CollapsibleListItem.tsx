/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {fontStyles} from './styles';
import Icon from './Icon';
import {textColors} from './colors.stylex';

export interface CollapsibleListItemProps {
  /**
   * The label for the list item.
   */
  label: string;
  /**
   * The sublabel for the list item.
   */
  sublabel?: string;
  /**
   * The children items to render.
   */
  children: React.ReactNode[];
  /**
   * Sets the initial expansion state of the collapsible list item.
   */
  isInitiallyExpanded?: boolean;
}

export default function CollapsibleListItem({
  label,
  sublabel,
  children,
  isInitiallyExpanded = false,
}: CollapsibleListItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(isInitiallyExpanded);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div>
      <div {...stylex.props(styles.main)} onClick={handleToggle}>
        {isExpanded ? (
          <Icon name="chevronDown" color="secondary" />
        ) : (
          <Icon name="chevronRight" color="secondary" />
        )}
        <div {...stylex.props(styles.center)}>
          <span {...stylex.props(fontStyles.body, styles.label)}>{label}</span>
          {sublabel && (
            <span {...stylex.props(fontStyles.supporting, styles.sublabel)}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
      {isExpanded && (
        <div {...stylex.props(styles.content)}>
          {React.Children.map(children, child => child)}
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    gap: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: {
      ':hover': '#DDE2E8',
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  label: {
    flexGrow: 1,
    fontWeight: 700,
  },
  sublabel: {
    flexGrow: 1,
    color: textColors.secondary,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 0px 8px 0px',
    gap: '4px',
  },
});
