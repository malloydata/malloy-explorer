/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {TagSetValue} from '@malloydata/malloy-tag';
import {JSONSchemaProperty} from '@malloydata/render';

export type CurrentValue =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | string[];

export interface EditorProps<T extends JSONSchemaProperty, C = TagSetValue> {
  name: string;
  path: string[];
  option: T;
  current: C;
  updateCurrent: (path: string[], value: unknown) => void;
}
