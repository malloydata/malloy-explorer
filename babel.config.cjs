/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

module.exports = {
  presets: [
    ['@babel/preset-typescript'],
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  plugins: [
    ['@babel/plugin-syntax-typescript', {isTSX: true}],
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
        classNamePrefix: process.env.NODE_ENV === 'development' ? 'x' : 'mly',
      },
    ],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
      plugins: [
        [
          '@stylexjs/babel-plugin',
          {
            runtimeInjection: false,
            unstable_moduleResolution: {
              type: 'commonJS',
              rootDir: __dirname,
            },
          },
        ],
      ],
    },
  },
};
