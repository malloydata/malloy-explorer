/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';

import ManyToOneIcon from '../assets/types/type-icon-many-to-one.svg?react';
import OneToManyIcon from '../assets/types/type-icon-one-to-many.svg?react';
import OneToOneIcon from '../assets/types/type-icon-one-to-one.svg?react';

export interface JoinIconProps {
  relationship: Malloy.Relationship | undefined;
}

export function JoinIcon({relationship}: JoinIconProps) {
  if (!relationship) {
    return null;
  }

  switch (relationship) {
    case 'many':
      return <ManyToOneIcon {...stylex.props(styles.icon)} />;
    case 'cross':
      return <OneToManyIcon {...stylex.props(styles.icon)} />;
    case 'one':
      return <OneToOneIcon {...stylex.props(styles.icon)} />;
  }
}
