import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from "@typescript-eslint/parser";

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        camelcase: "off",
        "no-mixed-operators": "off",
        "no-void": "off",
        eqeqeq: "off",
        "no-use-before-define": "off",
        "one-var": "off",
        "comma-dangle": "off",
        "no-undef": "off",
        indent: "off",
        "space-before-function-paren": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-useless-constructor": 0,
    },
}]
