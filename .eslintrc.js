module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				alwaysTryTypes: true,
			},
		},
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'], 
    },
    rules: {
        'no-undef': 0,
        'no-unused-vars': 0,
        "@typescript-eslint/no-unused-vars": 2,
        'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: true, optionalDependencies: true, peerDependencies: true },
        ],
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],
    },
    overrides: [
		{
			files: ['*.ts','*.tsx'],
			rules: {
                'jsdoc/require-param-type': 0,
                'react/prop-types': 0,
                'no-shadow': 0,
			},
		},
	],
};