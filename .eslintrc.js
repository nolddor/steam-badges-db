module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'standard',
    overrides: [
        {
            files: ['lib/__tests__/**'],
            plugins: ['jest'],
            extends: [
                'plugin:jest/recommended',
                'plugin:jest/style'
            ]
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        // override default options for rules from base configurations
        'indent': ['error', 4],
        'no-var': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'quote-props': ['error', 'consistent-as-needed'],
        'no-console': 'error',
        'prefer-arrow-callback': 'error'
    }
}
