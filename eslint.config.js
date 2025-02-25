import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['dist/**'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                browser: true,
                document: true,
                setInterval: true,
                window: true,
                ImportMetaEnv: 'readonly',
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['dist/**'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                browser: true,
                document: true,
                setInterval: true,
                window: true,
                ImportMetaEnv: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettier,
            import: importPlugin,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'error',
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
];
