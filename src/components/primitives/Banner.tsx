/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from './colors.stylex';
import {fontStyles} from './styles';
import Icon, {IconProps} from './Icon';
import ScrollableArea from './ScrollableArea';

export type Variant = keyof typeof variantColors;

export interface BannerProps {
  /**
   * Title.
   */
  title: string;
  /**
   * Optional description.
   */
  description?: string;
  /**
   * Semantic coloring variant; defaults to 'info.'
   */
  variant?: Variant;
  /**
   * Optional content; displayed on a neutral background below the header.
   */
  children?: React.ReactNode;
}

export default function Banner({
  title,
  description,
  variant = 'info',
  children,
}: BannerProps) {
  return (
    <div {...stylex.props(styles.rootContainer)}>
      <div
        {...stylex.props(
          styles.header,
          variantColors[variant],
          children ? styles.headerWithContent : null
        )}
      >
        <div {...stylex.props(styles.headerIcon)}>
          <Icon {...VARIANT_ICON_PROPS[variant]} />
        </div>
        <div {...stylex.props(styles.headerText)}>
          <div {...stylex.props(styles.title, fontStyles.emphasized)}>
            {title}
          </div>
          <div {...stylex.props(styles.description, fontStyles.supporting)}>
            {description}
          </div>
        </div>
      </div>
      {children && (
        <div {...stylex.props(styles.content, fontStyles.body)}>
          <ScrollableArea>{children}</ScrollableArea>
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  rootContainer: {
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0px 0px 5px 0px rgba(0, 0, 0, 0.1), 0px 0px 1px 0px rgba(0, 0, 0, 0.1)',
    margin: '5px',
  },
  header: {
    borderRadius: '10px',
    width: '100%',
    padding: '12px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'start',
    gap: '8px',
  },
  headerWithContent: {
    borderRadius: '10px 10px 0px 0px',
  },
  headerIcon: {
    height: '20px', // matches fontStyles.emphasized line height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  description: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  content: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '0px 0px 10px 10px',
    overflow: 'hidden',
  },
});

const VARIANT_ICON_PROPS: Record<Variant, IconProps> = {
  info: {
    name: 'info',
    color: 'info',
  },
  success: {
    name: 'check_circle',
    color: 'positive',
  },
  warn: {
    name: 'warning',
    color: 'warning',
  },
  critical: {
    name: 'error',
    color: 'negative',
  },
};

const variantColors = stylex.create({
  info: {
    backgroundColor: backgroundColors.accentDeemphasized,
  },
  success: {
    backgroundColor: backgroundColors.positiveDeemphasized,
  },
  warn: {
    backgroundColor: backgroundColors.warningDeemphasized,
  },
  critical: {
    backgroundColor: backgroundColors.negativeDeemphasized,
  },
});
