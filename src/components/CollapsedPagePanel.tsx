/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from './primitives/colors.stylex';
import {Button, IconType} from './primitives';
import {fontStyles} from './primitives/styles';
import {ResizableCollapsiblePanelContext} from '../contexts/ResizableCollapsiblePanelContext';

interface CollapsedPagePanelProps {
  title?: string;
  icon?: IconType;
  tooltip?: string;
}

export function CollapsedPagePanel({
  icon,
  title,
  tooltip,
}: CollapsedPagePanelProps) {
  const {onExpand} = React.useContext(ResizableCollapsiblePanelContext);

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.content)}>
        <Button
          icon={icon}
          variant="flat"
          size="compact"
          tooltip={tooltip}
          onClick={onExpand}
        />
        {title && (
          <div {...stylex.props(fontStyles.body, styles.title)}>{title}</div>
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    height: '100%',
    backgroundColor: backgroundColors.app,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightBackground: backgroundColors.divider,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '8px',
  },
  title: {
    fontWeight: 700,
    cursor: 'default',
    'writing-mode': 'sideways-lr',
  },
});
