module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'standard',
    overrides: [
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
        'quote-props': ['error', 'consistent-as-needed']
    }
}
