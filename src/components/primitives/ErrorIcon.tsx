/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import stylex from '@stylexjs/stylex';
import {fontStyles, tooltipStyles} from './styles';
import Icon from './Icon';

interface ErrorIconProps {
  /**
   * The error message to show in tooltip.
   */
  errorMessage: string;
}

export default function ErrorIcon({errorMessage}: ErrorIconProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div {...stylex.props(styles.iconWrapper)}>
          <Icon name="warning" customStyle={styles.errorIcon} />
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>
          <div {...stylex.props(fontStyles.body, tooltipStyles.default)}>
            {errorMessage}
          </div>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}

const styles = stylex.create({
  errorIcon: {
    color: 'red',
  },
  // Expands the hover range somewhat beyond the icon itself.
  iconWrapper: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
