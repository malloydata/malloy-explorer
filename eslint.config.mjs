import {fixupConfigRules, fixupPluginRules} from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/*.d.ts',
      '**/flow',
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/malloy-samples/',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:jest/recommended',
      'plugin:prettier/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      jest: fixupPluginRules(jest),
      prettier: fixupPluginRules(prettier),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'array-callback-return': 'error',
      'consistent-return': 'error',

      'no-console': [
        'error',
        {
          allow: ['debug', 'info', 'warn', 'error'],
        },
      ],

      'prettier/prettier': 'error',
      'sort-keys': 'off',
      'no-duplicate-imports': 'error',

      'no-restricted-imports': [
        'error',
        {
          patterns: ['@malloydata/malloy/src/*'],

          paths: [
            {
              name: 'lodash',
              message: 'Import [module] from lodash/[module] instead',
            },
          ],
        },
      ],

      'no-throw-literal': 'error',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'no-type-imports',
        },
      ],

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/parameter-properties': [
        'error',
        {
          prefer: 'parameter-property',
        },
      ],
    },
  },
  {
    files: ['**/*.tsx?'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['scripts/**'],

    rules: {
      'node/no-unpublished-import': 'off',
      'no-console': 'off',
      'no-process-exit': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
