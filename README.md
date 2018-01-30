# i18next Parser [![Build Status](https://travis-ci.org/i18next/i18next-parser.svg?branch=master)](https://travis-ci.org/i18next/i18next-parser)

[![NPM](https://nodei.co/npm/i18next-parser.png?downloads=true&stars=true)](https://www.npmjs.com/package/i18next-parser)

When translating an application, maintaining the catalog by hand is painful. This package automate the process. Don't let the name fool you, it was originally built with i18next in mind but it works well with other i18n libraries.

## Features

- Parses a single file or a directory (recursively or not)
- Parses template files (support for jade, handlebars and data-i18n attribute in html)
- Creates one json file per locale and per namespace.
- Remove old keys your code doesn't use anymore and place them in a `namespace_old.json` file. It is useful to avoid losing translations you may want to reuse.
- Restore keys from the `_old` file if the one in the translation file is empty.
- Support most i18next features:
    - Handles context keys of the form `key_context`
    - Handles plural keys of the form `key_plural` and `key_plural_0`
    - Handles multiline array in catalog
- Is a stream transform (so it works with gulp)
- Supports es6 template strings (in addition to single/double quoted strings) with ${expression} placeholders

## Contribute

Any contribution is welcome. Please [read the guidelines](doc/development.md) first.

Thanks a lot to all the previous [contributors](https://github.com/i18next/i18next-parser/graphs/contributors).

## Usage

- [CLI](docs/cli.md)
- [Gulp](docs/gulp.md)
- `Grunt`: coming soon
- `Webpack`: coming soon

## Lexers

The Lexers are configured for common use cases. Sometimes you might want to configure them differently. You can find the options in the [dedicated documentation](docs/lexers.md).

## Examples

**Change the output directory (cli and gulp)**

Command line (the options are identical):

`i18next /path/to/file/or/dir -o /output/directory`

`i18next /path/to/file/or/dir:/output/directory`

Gulp:

`.pipe(i18next({output: 'translations'}))`

It will create the file in the specified folder (in case of gulp it doesn't actually create the files until you call `dest()`):

```
/output/directory/en/translation.json
...
```



**Change the locales (cli and gulp)**

Command line:

`i18next /path/to/file/or/dir -l en,de,sp`

Gulp:

`.pipe(i18next({locales: ['en', 'de', 'sp']}))`

This will create a directory per locale in the output folder:

```
locales/en/...
locales/de/...
locales/sp/...
```



**Change the default namespace (cli and gulp)**

Command line:

`i18next /path/to/file/or/dir -n my_default_namespace`

Gulp:

`.pipe(i18next({namespace: 'my_default_namespace'}))`

This will add all the translation from the default namespace in the following file:

```
locales/en/my_default_namespace.json
...
```



**Change the namespace and key separators (cli and gulp)**

Command line:

`i18next /path/to/file/or/dir -s '?' -k '_'`

Gulp:

`.pipe(i18next({namespaceSeparator: '?', keySeparator: '_'}))`

This parse the translation keys as follow:

```
namespace?key_subkey

namespace.json
{
    key: {
        subkey: ''
    }
}
...
```



**Change the translation functions (cli and gulp)**

Command line:

`i18next /path/to/file/or/dir -f __,_e`

Gulp:

`.pipe(i18next({functions: ['__', '_e']}))`

This will parse any of the following function calls in your code and extract the key:

```
__('key'
__ 'key'
__("key"
__ "key"
_e('key'
_e 'key'
_e("key"
_e "key"
```

Note1: we don't match the closing parenthesis as you may want to pass arguments to your translation function.

Note2: the parser is smart about escaped single or double quotes you may have in your key.



**Change the regex (cli and gulp)**

Command line:

`i18next /path/to/file/or/dir -p "(.*)"`

Gulp:

`.pipe(i18next({parser: '(.*)'}))`

If you use a custom regex, the `functions` option will be ignored. You need to write you regex to parse the functions you want parsed.

You must pass the regex as a string. That means that you will have to properly escape it. Also, the parser will consider the translation key to be the first truthy match of the regex; it means that you must use non capturing blocks `(?:)` for anything that is not the translation key.

The regex used by default is:

`[^a-zA-Z0-9_](?:t)(?:\\(|\\s)\\s*(?:(?:\'((?:(?:\\\\\')?[^\']+)+[^\\\\])\')|(?:"((?:(?:\\\\")?[^"]+)+[^\\\\])"))/g`



**Filter files and folders (cli)**

`i18next /path/to/file/or/dir --fileFilter '*.hbs,*.js' --directoryFilter '!.git'`

In recursive mode, it will parse `*.hbs` and `*.js` files and skip `.git` folder. This options is passed to readdirp. To learn more, read [their documentation](https://github.com/thlorenz/readdirp#filters).



**Work with Meteor TAP-i18N (gulp)**

`.pipe(i18next({
    output: "i18n",
    locales: ['en', 'de', 'fr', 'es'],
    functions: ['_'],
    namespace: 'client',
    suffix: '.$LOCALE',
    extension: ".i18n.json",
    writeOld: false
}))`

This will output your files in the format `$LOCALE/client.$LOCALE.i18n.json` in a `i18n/` directory.
