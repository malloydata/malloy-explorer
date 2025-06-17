/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import * as Tooltip from '@radix-ui/react-tooltip';
import {styles} from './styles';
import {Icon} from '../../primitives';
import {HoverCard} from '../../primitives/HoverCard';
import {fontStyles} from '../../primitives/styles';

export interface InfoHoverProps {
  info: string;
}

export default function InfoHover({info}: InfoHoverProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {
          <div {...stylex.props(styles.infoTrigger, fontStyles.body)}>
            <Icon name="info" color="disabled" />
          </div>
        }
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="right" align="start">
          <HoverCard customStyle={styles.card}>{info}</HoverCard>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
