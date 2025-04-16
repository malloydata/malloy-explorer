/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {fontStyles} from './styles';
import * as Tooltip from '@radix-ui/react-tooltip';
import {useEffect, useRef, useState} from 'react';
import {backgroundColors} from './colors.stylex';

interface HoverTextProps {
  text: string;
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
  align = 'center',
  side = 'top',
}: HoverTextProps) {
  // hack so that if rendered in a parent with :hover pseudoclass,
  // :hover is not removed from the parent
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (rootRef.current && rootRef.current.contains(event.target as Node)) {
        setIsMouseInside(true);
      } else {
        setIsMouseInside(false);
      }
    };

    const checkTruncation = () => {
      if (textRef.current) {
        if (textRef.current.scrollWidth > textRef.current.clientWidth) {
          setIsTruncated(true);
        } else {
          setIsTruncated(false);
        }
      }
    };
    checkTruncation();

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkTruncation);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkTruncation);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div style={{pointerEvents: 'none'}}>
        <Tooltip.Root open={isMouseInside && isTruncated}>
          <Tooltip.Trigger asChild>
            <div
              ref={textRef}
              {...stylex.props(styles.text, fontStyles.supporting)}
            >
              {text}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side={side} align={align}>
              <pre {...stylex.props(styles.hoverText, fontStyles.tooltipText)}>
                {text}
              </pre>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </div>
  );
}

const styles = stylex.create({
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  hoverText: {
    maxWidth: '230px',
    overflow: 'hidden',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    backgroundColor: backgroundColors.tooltip,
    borderRadius: '4px',
    margin: '12px',
    padding: '4px 8px 4px',
  },
});
