import BaseLexer from './base-lexer'

export default class HTMLLexer extends BaseLexer {

  constructor(options = {}) {
    super()

    this.attr = options.attr || 'data-i18n'
    this.optionAttr = options.optionAttr || 'data-i18n-option'

    this.createAttributeRegex()
    this.createOptionAttributeRegex()
  }

  // TODO rewrite to support the BaseLexer.extract()
  extract(html) {
    let matches
    const regex = new RegExp(
      '<([A-Z][A-Z0-9]*)([^>]*\\s' + this.attr + '[^>]*)>(?:(.*?)<\\/\\1>)?',
      'gi'
    )

    while (matches = regex.exec(html)) {
      const attrs = this.parseAttributes(matches[2])

      // the attribute can hold multiple keys
      const keys = attrs.keys.split(';')
      keys.forEach(key => {
        // remove any leading [] in the key
        key = key.replace(/^\[[a-zA-Z0-9_-]*\]/ , '')

        // if empty grab innerHTML from regex
        key = key || matches[3]

        if (key) {
          this.keys.push({ ...attrs.options, key })
        }
      })

    }

    return this.keys
  }

  createAttributeRegex() {
    const pattern = '(?:' + this.attr + ')(?:\s*=\s*(' + BaseLexer.stringPattern + '))?'
    this.attrRegex = new RegExp(pattern, 'gi')
    return this.attrRegex
  }

  createOptionAttributeRegex() {
    const pattern = '(?:' + this.optionAttr + ')(?:\s*=\s*(' + BaseLexer.stringPattern + '))?'
    this.optionAttrRegex = new RegExp(pattern, 'gi')
    return this.optionAttrRegex
  }

  parseAttributes(args) {
    const result = {keys: '', options: {}}
    const keysMatch = this.attrRegex.exec(args)
    if (keysMatch && keysMatch[1]) {
      result.keys = keysMatch[1].slice(1, -1)
    }

    const optionsMatch = this.optionAttrRegex.exec(args)
    if (optionsMatch && optionsMatch[1]) {
      try {
        result.options = JSON.parse(optionsMatch[1].slice(1, -1))
      }
      finally {}
    }

    return result
  }
}
