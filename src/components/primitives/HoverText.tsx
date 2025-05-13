/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {fontStyles, tooltipStyles} from './styles';
import * as Tooltip from '@radix-ui/react-tooltip';
import {useRef} from 'react';
import {RichText} from './RichText';

interface HoverTextProps {
  text: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Displays tooltip if text is truncated.
 * Works in hovered parent.
 * Works with formatted text.
 */
export function HoverText({
  text,
  containerRef,
  align = 'center',
  side = 'top',
}: HoverTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  const [isTriggeredHovered, setIsTriggerHovered] = React.useState(false);
  const [isContentHovered, setIsContentHovered] = React.useState(false);

  const isTruncated = () =>
    (textRef.current &&
      textRef.current.scrollHeight > textRef.current.clientHeight) ??
    false;

  return (
    <Tooltip.Root
      open={(isTriggeredHovered || isContentHovered) && isTruncated()}
    >
      <Tooltip.Trigger asChild>
        <RichText
          ref={textRef}
          onMouseEnter={() => setIsTriggerHovered(true)}
          onMouseLeave={() => setIsTriggerHovered(false)}
          onPointerMove={e => e.preventDefault()}
          customStyle={[fontStyles.supporting, styles.text]}
        >
          {text}
        </RichText>
      </Tooltip.Trigger>
      <Tooltip.Portal container={containerRef?.current}>
        <Tooltip.Content side={side} align={align}>
          <RichText
            onMouseEnter={() => setIsContentHovered(true)}
            onMouseLeave={() => setIsContentHovered(false)}
            isTooltipContent={true}
            customStyle={[fontStyles.body, tooltipStyles.default]}
          >
            {text}
          </RichText>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const styles = stylex.create({
  text: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  },
});
