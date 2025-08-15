/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {ReactNode, RefObject, useContext, useRef} from 'react';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {backgroundColors} from './colors.stylex';
import * as RadixPopover from '@radix-ui/react-popover';
import {ThemeContext} from './contexts/ThemeContext';

// Define a type for the placement options that matches what was used with Popper.js
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

interface PopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  width?: number | string;
  maxHeight?: number | undefined;
  placement?: Placement;
  referenceDiv?: RefObject<HTMLDivElement>;
  zIndex?: number;
  xOffset?: number;
  yOffset?: number;
  disabled?: boolean;
  children: ReactNode;
  customStyle?: StyleXStyles;
}

const styleX = stylex.create({
  wrapper: {
    position: 'relative',
  },
  popoverContent: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: backgroundColors.divider,
    borderRadius: '4px',
    boxShadow: '0px 1px 5px 1px #0000001a',
    backgroundColor: backgroundColors.surface,
    fontSize: 'var(--malloy-composer-menu-fontSize, 14px)',
  },
});

// Helper function to convert Popper.js placement to Radix UI side/align
const convertPlacementToRadixProps = (
  placement: Placement
): {
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
} => {
  const [side, align] = placement.split('-') as [
    'top' | 'right' | 'bottom' | 'left',
    'start' | 'end' | undefined,
  ];

  return {
    side,
    align: align || 'center',
  };
};

export const Popover: React.FC<PopoverProps> = ({
  open,
  setOpen,
  children,
  width = 350,
  maxHeight,
  placement = 'right-start',
  referenceDiv,
  zIndex = 10,
  xOffset = 0,
  yOffset = 10,
  disabled = false,
  customStyle,
}) => {
  const {theme} = useContext(ThemeContext);
  const triggerRef = useRef<HTMLDivElement>(null);
  const {side, align} = convertPlacementToRadixProps(placement);

  // Calculate the sideOffset based on the side and the provided offsets
  const getSideOffset = () => {
    if (side === 'top' || side === 'bottom') {
      return yOffset;
    }
    return xOffset;
  };

  // Calculate the alignOffset based on the align and the provided offsets
  const getAlignOffset = () => {
    if (side === 'top' || side === 'bottom') {
      return xOffset;
    }
    return yOffset;
  };

  return (
    <div {...stylex.props(styleX.wrapper, customStyle)} ref={triggerRef}>
      <RadixPopover.Root open={open && !disabled} onOpenChange={setOpen}>
        <RadixPopover.Anchor asChild>
          <div ref={referenceDiv || triggerRef} />
        </RadixPopover.Anchor>
        {open && !disabled && (
          <RadixPopover.Portal>
            <RadixPopover.Content
              {...stylex.props(styleX.popoverContent, theme)}
              side={side}
              align={align}
              sideOffset={getSideOffset()}
              alignOffset={getAlignOffset()}
              style={{
                width: typeof width === 'string' ? width : `${width}px`,
                zIndex: zIndex,
                ...(maxHeight ? {maxHeight: `${maxHeight}px`} : {}),
              }}
              avoidCollisions
            >
              {children}
            </RadixPopover.Content>
          </RadixPopover.Portal>
        )}
      </RadixPopover.Root>
    </div>
  );
};
