/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import Icon from '../../primitives/Icon';
import {AddItem} from './AddItem';
import {segmentNestNo} from '../../utils/segment';
import {ViewParent} from '../../utils/fields';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface AddEmptyNestProps {
  view: ViewParent;
}

export function AddEmptyNest({view}: AddEmptyNestProps) {
  const updateQuery = useUpdateQuery();

  return (
    <AddItem
      icon={<Icon name="nest" />}
      label="Add blank nested query"
      onClick={() => {
        const segment = view.getOrAddDefaultSegment();
        const nestNo = segmentNestNo(segment, `Nest`);
        segment.addEmptyNest(nestNo > 1 ? `Nest ${nestNo}` : `Nest`);
        updateQuery();
      }}
    />
  );
}
