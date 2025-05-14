/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*env jest */

import * as Malloy from '@malloydata/malloy-interfaces';
import {findField} from '../components/utils/fields';

export function expectDimension(
  schema: Malloy.Schema,
  name: string
): Malloy.FieldInfoWithDimension {
  const field = findField(schema, name);
  expect(field?.kind).toBe('dimension');
  return field as Malloy.FieldInfoWithDimension;
}

export function expectMeasure(
  schema: Malloy.Schema,
  name: string
): Malloy.FieldInfoWithMeasure {
  const field = findField(schema, name);
  expect(field?.kind).toBe('measure');
  return field as Malloy.FieldInfoWithMeasure;
}

export function expectView(
  schema: Malloy.Schema,
  name: string
): Malloy.FieldInfoWithView {
  const field = findField(schema, name);
  expect(field?.kind).toBe('view');
  return field as Malloy.FieldInfoWithView;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => any;

export function expectInstanceOf<T extends Constructor>(
  object: unknown,
  constructor: T
): InstanceType<T> {
  expect(object instanceof constructor).toBe(true);
  return object as InstanceType<T>;
}
