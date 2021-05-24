module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/no-unresolved': [2, { ignore: ['react'] }],
		'import/no-extraneous-dependencies': 0,
		'jsdoc/require-returns-type': 0,
	},
	overrides: [
		{
			files: 'packages/twentypress/**/*.js',
			rules: {
				// todo: address these issues
				'react/prop-types': 0,
				'jsx-a11y/anchor-is-valid': 0,
				'no-lonely-if': 0,
				'react-hooks/exhaustive-deps': 0,
				'no-restricted-globals': 0,
				'no-use-before-define': 0,
				'react/no-array-index-key': 0,
			},
		},
	],
};
