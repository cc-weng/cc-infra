// @see: https://zh-hans.eslint.org
module.exports = {
  // 设置为true表示该配置文件是根配置文件，ESLint将停止在父目录中查找其他配置文件。
  root: true,
  extends: ['@cc-infra/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue'],
  overrides: [
    {
      files: ['vite.config.ts', 'plugins/*.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      parser: 'vue-eslint-parser',
      rules: {
        'vue/multi-word-component-names': 'off',
        'import/no-unresolved': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'no-continue': 'off',
    'no-multi-assign': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    'no-await-in-loop': 'off',
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'auto-imports.d.ts',
    'components.d.ts',
  ],
};
