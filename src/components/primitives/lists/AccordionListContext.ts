/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

interface AccordionListContextValue {
  expandedItemId?: string;
  onExpandedItemChange?: (currentItemId: string) => void;
}

export const AccordionListContext =
  React.createContext<AccordionListContextValue>({});
