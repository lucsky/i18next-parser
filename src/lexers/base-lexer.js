export default class BaseLexer {

  constructor(options = {}) {
    this.keys = []
    this.functions = options.functions || ['t']

    // TODO handle errors and warnings
    // ['functions', 'locales'].forEach((attr) => {
    //   if ( (typeof this[attr] !== 'object') || !this[attr].length ) {
    //     throw new PluginError(PLUGIN_NAME, '`'+attr+'` must be an array')
    //   }
    // })
  }

  populateKeysFromArguments(args) {
    const firstArgument = args.arguments[0]
    const secondArgument = args.arguments[1]
    const isKeyString = this.validateString(firstArgument)
    const isDefaultValueString = this.validateString(secondArgument)

    if (!isKeyString) {
      // TODO error, only string literals!
    }
    else {
      const result = {
        ...args.options,
        key: firstArgument.slice(1, -1)
      }
      if (isDefaultValueString) {
        result.defaultValue = secondArgument.slice(1, -1)
      }
      this.keys.push(result)
    }
  }

  validateString(string) {
    const regex = new RegExp('^' + BaseLexer.stringPattern + '$', 'i')
    return regex.test(string)
  }

  functionPattern() {
    return '(?:' + this.functions.join( '|' ).replace( '.', '\\.' ) + ')'
  }

  static get singleQuotePattern() {
    return "'(?:[^\'].*?[^\\\\])?'"
  }

  static get doubleQuotePattern() {
    return '"(?:[^\"].*?[^\\\\])?"'
  }

  static get backQuotePattern() {
    return '`(?:[^\`].*?[^\\\\])?`'
  }

  static get variablePattern() {
    return '(?:[A-Z0-9_.-]+)'
  }

  static get stringPattern() {
    return (
      '(?:' +
      [
        BaseLexer.singleQuotePattern,
        BaseLexer.doubleQuotePattern
      ].join('|') +
      ')'
    )
  }

  static get stringOrVariablePattern() {
    return (
      '(?:' +
      [
        BaseLexer.singleQuotePattern,
        BaseLexer.doubleQuotePattern,
        BaseLexer.variablePattern
      ].join('|') +
      ')'
    )
  }
}
