/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {TooltipProvider} from '@radix-ui/react-tooltip';

export interface MalloyExplorerProviderProps {
  children: ReactNode | ReactNode[];
}

export function MalloyExplorerProvider({
  children,
}: MalloyExplorerProviderProps) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
