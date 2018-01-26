# Lexers

## HTML Lexer

Parse `data-i18n` and `data-i18n-options` in html. Useful mostly for users of [jquery-i18next](https://github.com/i18next/jquery-i18next).

### Features

- Extract all the keys
- Extract `context` and `defaultValue` when available

### Options

- `attr`: The attribute to track the key(s). Defaults to `data-i18n`
- `optionAttr`: The attribute to track the options. Defaults to `data-i18n-options`
