# Gulp

Save the package to your devDependencies:

```
yarn add -D i18next-parser
npm install --save-dev i18next-parser
```

[Gulp](http://gulpjs.com/) defines itself as the streaming build system. Put simply, it is like Grunt, but performant and elegant.

```javascript
var i18next = require('i18next-parser');

gulp.task('i18next', function() {
    gulp.src('app/**')
        .pipe(i18next({
            locales: ['en', 'de'],
            functions: ['__', '_e'],
            output: '../locales'
        }))
        .pipe(gulp.dest('locales'));
});
```

- **output**: Where to write the locale files relative to the base (here `app/`). Defaults to `locales`
- **functions**: An array of functions names to parse. Defaults to `['t']`
- **attributes**: An array of html attributes to parse. Defaults to `['data-i18n']`
- **namespace**: Default namespace used in your i18next config. Defaults to `translation`
- **namespaceSeparator**: Namespace separator used in your translation keys. Defaults to `:`
- **keySeparator**: Key separator used in your translation keys. Defaults to `.`
- **locales**: An array of the locales in your applications. Defaults to `['en','fr']`
- **parser**: A custom regex for the parser to use.
- **writeOld**: Save the \_old files. Defaults to `true`
- **prefix**: Add a custom prefix in front of the file name.
- **suffix**: Add a custom suffix at the end of the file name.
- **extension**: Edit the extension of the files. Defaults to `.json`
- **keepRemoved**: Prevent keys no longer found from being removed
- **ignoreVariables**: Don't fail when a variable is found

You can inject the locale tag in either the prefix, suffix or extension using the `$LOCALE` variable.

### Note on paths (why your translations are not saved)

The way gulp works, it take a `src()`, applies some transformations to the files matched and then render the transformation using the `dest()` command to a path of your choice. With `i18next-parser`, the `src()` takes the path to the files to parse and the `dest()` takes the path where you want the catalogs of translation keys.

The problem is that the `i18next()` transform doesn't know about the path you specify in `dest()`. So it doesn't know where the catalogs are. So it can't merge the result of the parsing with the existing catalogs you may have there.

```
gulp.src('app/**')
    .pipe(i18next())
    .pipe(gulp.dest('custom/path'));
```

If you consider the code above, any file that match the `app/**` pattern will have of base set to `app/`. *As per the vinyl-fs [documentation](https://github.com/wearefractal/vinyl-fs#srcglobs-opt) (which powers gulp), the base is the folder relative to the cwd and defaults is where the glob begins.*

Bare with me, the `output` option isn't defined, it defaults to `locales`. So the `i18next()` transform will look for files in the `app/locales` directory (the base plus the output directory). But in reality they are located in `custom/path`. So for the `i18next-parser` to find your catalogs, you need the `output` option:

```
gulp.src('app/**')
    .pipe(i18next({output: '../custom/path'}))
    .pipe(gulp.dest('custom/path'));
```

The `output` option is relative to the base. In our case, we have `app/` as a base and we want `custom/path`. So the `output` option must be `../custom/path`.


### Events

The transform emit a `reading` event for each file it parses:

`.pipe( i18next().on('reading', function(path) {  }) )`

The transform emit a `writing` event for each file it passes to the stream:

`.pipe( i18next().on('reading', function(path) {  }) )`

The transform emit a `json_error` event if the JSON.parse on json files fail. It is passed the error name (like `SyntaxError`) and the error message (like `Unexpected token }`):

`.pipe( i18next().on('reading', function(name, message) {  }) )`

### Errors

- `i18next-parser does not support variables in translation functions, use a string literal`: i18next-parser can't parse keys if you use variables like `t(variable)`, you need to use strings like `t('string')`.
