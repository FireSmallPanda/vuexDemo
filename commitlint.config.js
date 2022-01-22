module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            "feat", "upd", "del", "fix", "refactor", "test", "perf", "docs", "style", "revert"
        ]],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']

    }
};