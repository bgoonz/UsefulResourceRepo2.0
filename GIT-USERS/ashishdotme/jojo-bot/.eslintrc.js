module.exports = {
	root: true,
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
	env: {
		node: true,
		es2020: true
	},
	ignorePatterns: ['__tests__/**', 'node_modules/**', 'dist/**', 'types/**'],
	parserOptions: {
		project: './tsconfig.json'
	},
	rules: {
		'no-console': 'off',
		'consistent-return': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'prefer-const': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off'
	}
};
