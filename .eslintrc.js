module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
    plugins: ['@typescript-eslint'],
    overrides: [
      {
        files: "packages/twentypress-theme/**/*.js",
        rules: {
          'react/prop-types': 0,
          'jsx-a11y/anchor-is-valid': 0,
          'import/no-unresolved': [2, { ignore: ['react']}],
        }
      }
    ]
};