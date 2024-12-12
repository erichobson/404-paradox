module.exports = {
    extends: [
        'eslint:recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['svelte'],
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser'
        }
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    }
};
