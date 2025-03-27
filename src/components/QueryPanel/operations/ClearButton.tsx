/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {Button} from '../../primitives';

export interface ClearButtonProps {
  onClick: () => void;
}

export function ClearButton({onClick}: ClearButtonProps) {
  return (
    <Button
      icon="clear"
      variant="flat"
      size="compact"
      tooltip="Remove"
      onClick={onClick}
    />
  );
}
