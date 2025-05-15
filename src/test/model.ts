/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

export const modelInfo: Malloy.ModelInfo = {
  entries: [
    {
      kind: 'source',
      name: 'source_a',
      schema: {
        fields: [
          {
            name: 'string_dimension',
            kind: 'dimension',
            type: {kind: 'string_type'},
          },
          {name: 'measure_a', kind: 'measure', type: {kind: 'number_type'}},
          {
            name: 'view_a',
            kind: 'view',
            schema: {
              // Dimension and measure names are intentionally the same as above
              // for testing renaming
              fields: [
                {
                  name: 'string_dimension',
                  kind: 'dimension',
                  type: {kind: 'string_type'},
                },
                {
                  name: 'measure_a',
                  kind: 'measure',
                  type: {kind: 'number_type'},
                },
              ],
            },
          },
          {
            name: 'date_dimension',
            kind: 'dimension',
            type: {kind: 'date_type'},
          },
          {
            name: 'timestamp_dimension',
            kind: 'dimension',
            type: {kind: 'timestamp_type'},
          },
          {
            name: 'join_a',
            kind: 'join',
            relationship: 'one',
            schema: {
              fields: [
                {
                  name: 'string_dimension',
                  kind: 'dimension',
                  type: {kind: 'string_type'},
                },
                {
                  name: 'measure_a',
                  kind: 'measure',
                  type: {kind: 'number_type'},
                },
              ],
            },
          },
        ],
      },
    },
  ],
  annotations: [],
  anonymous_queries: [],
};
