/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';
import {Icon} from '../primitives';
import {RendererName, tagToRenderer} from '../utils/renderer';

export interface VisualizationIconProps {
  view: ASTQuery | ASTView;
}

export function VisualizationIcon({view}: VisualizationIconProps) {
  const currentTag = view.getTag();

  const currentRenderer: RendererName = tagToRenderer(currentTag) ?? 'table';

  return <Icon name={`viz_${currentRenderer}`} />;
}
