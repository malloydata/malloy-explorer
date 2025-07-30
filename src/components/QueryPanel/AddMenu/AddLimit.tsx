/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import Icon from '../../primitives/Icon';
import {AddItem} from './AddItem';
import {getSegmentIfPresent, segmentHasLimit} from '../../utils/segment';
import {ViewParent} from '../../utils/fields';
import {useUpdateQuery} from '../../../hooks/useQueryUpdate';

export interface AddLimitProps {
  view: ViewParent;
}

export function AddLimit({view}: AddLimitProps) {
  const updateQuery = useUpdateQuery();

  const segment = getSegmentIfPresent(view);
  const hasLimit = segment ? segmentHasLimit(segment) : false;

  return (
    <AddItem
      icon={<Icon name="limit" />}
      label="Limit"
      disable={() => hasLimit}
      onClick={() => {
        const segment = view.getOrAddDefaultSegment();
        segment.setLimit(10);
        updateQuery();
      }}
    />
  );
}
