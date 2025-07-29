/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useContext} from 'react';
import {QueryEditorContext} from '../../../contexts/QueryEditorContext';
import Icon from '../../primitives/Icon';
import {AddItem} from './AddItem';
import {getSegmentIfPresent, segmentHasLimit} from '../../utils/segment';
import {ViewParent} from '../../utils/fields';

export interface AddLimitProps {
  view: ViewParent;
}

export function AddLimit({view}: AddLimitProps) {
  const {rootQuery, setQuery} = useContext(QueryEditorContext);

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
        setQuery?.(rootQuery?.build());
      }}
    />
  );
}
