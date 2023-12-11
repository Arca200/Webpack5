module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        node: true,
        browser: true
    },
    rules: {
        'semi': 'off',
        'no-var': 2,
        quotes: [2, 'single'], //单引号
        'no-unused-vars': 'off'
    },
    extends: ['eslint:recommended'],
}