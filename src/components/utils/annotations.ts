/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

const DESCRIPTION_ANNOTATION_PREFIX: string = '#" ';

export const getDescriptionAnnotation = (
  annotations: Array<Malloy.Annotation>
): string | undefined => {
  const descriptions = annotations
    .filter(a => a.value.startsWith(DESCRIPTION_ANNOTATION_PREFIX))
    .map(a => a.value.slice(DESCRIPTION_ANNOTATION_PREFIX.length).trim());

  if (!descriptions.length) {
    return undefined;
  }

  return descriptions.join('\n');
};

const EXPLORER_FILTER_FIELD_PREFIX: string = '#NO_UI';

export const hasExplorerFilterFieldAnnotation = (
  annotations: Array<Malloy.Annotation>
): boolean => {
  const filter_field_annotation = annotations.find(a =>
    a.value.startsWith(EXPLORER_FILTER_FIELD_PREFIX)
  );

  return !!filter_field_annotation;
};
