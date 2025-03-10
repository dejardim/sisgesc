import globals from 'globals';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.browser }},
  { rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off'
  }},
  ...tseslint.configs.recommended,
];
