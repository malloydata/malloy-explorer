/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../styles';
import {backgroundColors, textColors} from '../colors.stylex';
import {AccordionListContext} from './AccordionListContext';

export interface AccordionListItemProps {
  /**
   * Unique identifier for the list item.
   */
  id: string;
  /**
   * The label text to display for the list item.
   */
  label: string;
  /**
   * Optional sublabel text to display for the list item.
   */
  sublabel?: string;
  /**
   * Optional icon to display at the start of the list item.
   */
  startIcon?: React.ReactElement;
  /**
   * Optional badge to display in the list item.
   */
  badge?: React.ReactElement;
  /**
   * Optional icon to display at the end of the list item.
   */
  endIcon?: React.ReactElement;
  /**
   * The children items to render. Can be a single item or an array of items.
   */
  children: React.ReactNode | React.ReactNode[];
}

export default function AccordionListItem({
  id,
  label,
  sublabel,
  startIcon,
  badge,
  endIcon,
  children,
}: AccordionListItemProps) {
  const {expandedItemId, onExpandedItemChange} =
    React.useContext(AccordionListContext);

  return (
    <>
      <div
        {...stylex.props(styles.item)}
        onClick={() => onExpandedItemChange?.(id)}
      >
        {startIcon && <>{startIcon}</>}
        <div {...stylex.props(styles.center)}>
          <span {...stylex.props(fontStyles.body, styles.label)}>{label}</span>
          {sublabel && (
            <span {...stylex.props(fontStyles.supporting, styles.sublabel)}>
              {sublabel}
            </span>
          )}
        </div>
        {badge && badge}
        {endIcon && endIcon}
      </div>
      {id === expandedItemId && (
        <div {...stylex.props(styles.content)}>
          {React.Children.map(children, child => child)}
        </div>
      )}
    </>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '8px',
    gap: '8px',
    cursor: 'pointer',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexGrow: 1,
  },
  label: {
    flexGrow: 1,
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sublabel: {
    flexGrow: 1,
    color: textColors.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '4px 12px',
    gap: '4px',
    backgroundColor: backgroundColors.surfaceSubtle,
    overflow: 'auto',
  },
});
