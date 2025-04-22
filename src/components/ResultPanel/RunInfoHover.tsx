/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {RunInfo} from './SubmittedQuery';
import {HoverCard} from '../primitives/HoverCard';
import * as Tooltip from '@radix-ui/react-tooltip';
import {Icon} from '../primitives';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';

interface RunInfoHoverProps {
  runInfo: RunInfo;
}

const HOVER_ALIGN = 'start';
const HOVER_SIDE = 'bottom';

export default function RunInfoHover({runInfo}: RunInfoHoverProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {
          <div
            {...stylex.props(styles.triggerContentContainer, fontStyles.body)}
          >
            <Icon name="info" color="disabled" />
            &nbsp;Query run details
          </div>
        }
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={HOVER_SIDE} align={HOVER_ALIGN}>
          <HoverCard customStyle={styles.card}>
            <>
              {runInfo?.performanceAspects &&
                Object.entries(runInfo.performanceAspects).map(
                  ([aspect, properties]) => {
                    return (
                      <div key={aspect}>
                        {Object.entries(properties).map(([k, v]) => (
                          <div key={k}>
                            <span {...stylex.props(fontStyles.emphasized)}>
                              {k}:
                            </span>{' '}
                            <span {...stylex.props(fontStyles.body)}>{v}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                )}
              {runInfo.queryLink && (
                <a
                  href={runInfo.queryLink.href}
                  {...stylex.props(styles.link, fontStyles.link)}
                >
                  {runInfo.queryLink.linkText}
                </a>
              )}
            </>
          </HoverCard>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const styles = stylex.create({
  card: {
    maxWidth: '350px',
  },
  triggerContentContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
  link: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
});
