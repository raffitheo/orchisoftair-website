module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    overrides: [
        {
            files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
            rules: {
                'import/order': [
                    'error',
                    {
                        groups: [
                            'builtin',
                            'external',
                            'internal',
                            'parent',
                            'sibling',
                            'index',
                        ],
                        'newlines-between': 'always',
                        alphabetize: {
                            order: 'asc',
                            caseInsensitive: true,
                        },
                    },
                ],
                'max-len': [
                    'error',
                    {
                        code: 120,
                        ignorePattern: '^import |^export \\{(.*?)\\}',
                        ignoreStrings: true,
                        ignoreRegExpLiterals: true,
                    },
                ],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': 'error',
    },
};
