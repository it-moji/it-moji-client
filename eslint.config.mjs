import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import globals from 'globals'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import typescriptEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwindcss from 'eslint-plugin-tailwindcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...typescriptEslint.config({
    ignores: ['.next'],
    extends: [js.configs.recommended, ...typescriptEslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      react,
      'react-compiler': reactCompiler,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'type',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
          pathGroups: [
            { pattern: '@/mocks/**/*', group: 'internal', position: 'after' },
            { pattern: '@/app/**/*', group: 'internal', position: 'after' },
            { pattern: '@/views/**/*', group: 'internal', position: 'after' },
            { pattern: '@/widgets/**/*', group: 'internal', position: 'after' },
            { pattern: '@/features/**/*', group: 'internal', position: 'after' },
            { pattern: '@/entities/**/*', group: 'internal', position: 'after' },
            { pattern: '@/shared/**/*', group: 'internal', position: 'after' },
            { pattern: '../../api', group: 'parent', position: 'after' },
            { pattern: '../../config', group: 'parent', position: 'after' },
            { pattern: '../../lib', group: 'parent', position: 'after' },
            { pattern: '../../model', group: 'parent', position: 'after' },
            { pattern: '../../ui', group: 'parent', position: 'after' },
            { pattern: '../api', group: 'parent', position: 'after' },
            { pattern: '../config', group: 'parent', position: 'after' },
            { pattern: '../lib', group: 'parent', position: 'after' },
            { pattern: '../model', group: 'parent', position: 'after' },
            { pattern: '../ui', group: 'parent', position: 'after' },
          ],
          alphabetize: { order: 'asc' },
        },
      ],
      'import/no-unresolved': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-compiler/react-compiler': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/self-closing-comp': 'warn',
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
      'prettier/prettier': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  }),
  ...tailwindcss.configs['flat/recommended'],
  eslintConfigPrettier,
]

export default eslintConfig
