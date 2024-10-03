import prettier from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import globals from 'globals'

export default [
  {
    // rules: { 'no-console': 'error' },
    plugins: {
      jsdoc,
    },
    languageOptions: {
      globals: {
        // ...globals.node,
        ...globals.browser,
      },
    },
  },
  jsdoc.configs['flat/recommended'],
  js.configs.recommended,
  prettier,
]
