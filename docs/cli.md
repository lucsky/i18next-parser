# CLI

You can use the CLI with the package installed locally but if you want to use it from anywhere, you better install it globally:

```
yarn global add i18next-parser
npm install -g i18next-parser
i18next /path/to/file/or/dir [-orapfnl]
```

- **-o, --output <directory>**: Where to write the locale files.
- **-r, --recursive**: Is --output is a directory, parses files in sub directories.
- **-f, --functions <list>**: Function names to parse. Defaults to `t`
- **-a, --attributes <list>**: HTML attributes to parse. Defaults to `data-i18n`
- **-p, --parser <string>**: A custom regex for the parser to use.
- **-n, --namespace <string>**: Default namespace used in your i18next config. Defaults to `translation`
- **-s, --namespace-separator <string>**: Namespace separator used in your translation keys. Defaults to `:`
- **-k, --key-separator <string>**: Key separator used in your translation keys. Defaults to `.`
- **-c, --context-separator <string>**: Context separator used in your translation keys. Defaults to `_`
- **-l, --locales <list>**: The locales in your applications. Defaults to `en,fr`
- **--directoryFilter**: Globs of folders to filter
- **--fileFilter**: Globs of files to filter
- **--keep-removed**: Prevent keys no longer found from being removed
- **--write-old false**: Avoid saving the \_old files
- **--ignore-variables**: Don't fail when a variable is found
- **--prefix <string>**: Prefix filename for each locale, eg.: 'pre-$LOCALE-' will yield 'pre-en-default.json'
- **--suffix <string>**: Suffix filename for each locale, eg.: '-$suf-LOCALE' will yield 'default-suf-en.json'
- **--extension <string>**: Specify extension for filename for each locale, eg.: '.$LOCALE.i18n' will yield 'default.en.i18n'
