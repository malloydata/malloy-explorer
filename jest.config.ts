/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/?(*.)spec.(ts|js)?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/dev/', '/src/test/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  testTimeout: 100000,
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'html'],
  collectCoverageFrom: ['src/**/*.(ts|tsx)'],
  preset: 'ts-jest',
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
  },
};
