/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Token} from '../primitives';
import {parseTag} from '@malloydata/malloy-tag';
import {snakeToTitle} from '../QueryPanel/Visualization';
import {tagToRenderer} from '../utils/renderer';

export interface VisualizationProps {
  annotations: Malloy.Annotation[];
}

export function Visualization({annotations}: VisualizationProps) {
  const {tag} = parseTag(annotations.map(annotation => annotation.value));

  const renderer = tagToRenderer(tag) ?? 'table';

  return <Token label={snakeToTitle(renderer)} icon={`viz_${renderer}`} />;
}
