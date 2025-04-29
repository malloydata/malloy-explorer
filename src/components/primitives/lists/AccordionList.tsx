/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex, {StyleXStyles} from '@stylexjs/stylex';
import * as React from 'react';
import AccordionListItem, {AccordionListItemProps} from './AccordionListItem';
import {AccordionListContext} from './AccordionListContext';
import Divider from '../Divider';

type AccordionListChild = React.ReactElement<
  AccordionListItemProps,
  typeof AccordionListItem
>;

interface AccordionListProps {
  /**
   * The ID of the item that should be expanded by default.
   */
  defaultExpandedItemId?: string;
  /**
   * The accordion list items to render. Can be a single item or an array of items.
   */
  children: AccordionListChild | AccordionListChild[];
  /**
   * Custom styles to apply to the component.
   */
  customStyle?: StyleXStyles;
}

export default function AccordionList({
  defaultExpandedItemId,
  children,
  customStyle,
}: AccordionListProps) {
  const [expandedItemId, setExpandedItemId] = React.useState<
    string | undefined
  >(defaultExpandedItemId);

  const handleExpandedItemChange = (currentItemId: string) => {
    setExpandedItemId(prev => {
      if (prev === currentItemId) {
        return undefined;
      }

      return currentItemId;
    });
  };

  return (
    <AccordionListContext.Provider
      value={{expandedItemId, onExpandedItemChange: handleExpandedItemChange}}
    >
      <div {...stylex.props(styles.main, customStyle)}>
        {React.Children.map(children, child => (
          <>
            {child}
            <Divider />
          </>
        ))}
      </div>
    </AccordionListContext.Provider>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexGrow: 1,
  },
});
