/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import DatabaseIcon from '../assets/types/type-icon-database.svg?react';
import {styles} from './styles';

/**
 * Source
 */
export interface SourceProps {
  source: Malloy.SourceInfo;
}

export function Source({source}: SourceProps) {
  return (
    <div {...stylex.props(styles.heading)}>
      <div {...stylex.props(styles.title)}>Source:</div>
      <div {...stylex.props(styles.labelWithIcon)}>
        <DatabaseIcon {...stylex.props(styles.menuIcon)} />
        {source.name}
      </div>
    </div>
  );
}
