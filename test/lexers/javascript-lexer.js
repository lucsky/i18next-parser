import { assert } from 'chai'
import JavascriptLexer from '../../src/lexers/javascript-lexer'

describe('JavascriptLexer', function () {
  it('extracts keys from translation components', function (done) {
    const Lexer = new JavascriptLexer()
    const html = 'i18n.t("first")'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first' }
      ]
    )
    done()
  })

  it('extracts the second argument as defaultValue', function (done) {
    const Lexer = new JavascriptLexer()
    const html = 'i18n.t("first" "bla")'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first', defaultValue: 'bla' }
      ]
    )
    done()
  })

  it('extracts the defaultValue/context options', function (done) {
    const Lexer = new JavascriptLexer()
    const html = 'i18n.t("first", {defaultValue: "foo", context: \'bar\'})'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first', defaultValue: 'foo', context: 'bar' }
      ]
    )
    done()
  })

  it('extracts the defaultValue/context options with quotation marks', function (done) {
    const Lexer = new JavascriptLexer()
    const html = 'i18n.t("first", {context: "foo", "defaultValue": \'bla\'})'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first', defaultValue: 'bla', context: 'foo' }
      ]
    )
    done()
  })

  it('supports multiline and concatenation', function (done) {
    const Lexer = new JavascriptLexer()
    const html = 'i18n.t("foo" + \n "bar")'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'foobar' }
      ]
    )
    done()
  })

  describe('concatenateString()', function () {
    it('concatenates strings', function (done) {
      const Lexer = new JavascriptLexer()
      assert.equal(
        Lexer.concatenateString('"foo" + \'bar\''),
        '"foobar"'
      )
      done()
    })

    it('returns the original string if it contains variables', function (done) {
      const Lexer = new JavascriptLexer()
      assert.equal(
        Lexer.concatenateString('"foo" + bar'),
        '"foo" + bar'
      )
      done()
    })

    it('returns the original string if it contains backquote string', function (done) {
      const Lexer = new JavascriptLexer()
      assert.equal(
        Lexer.concatenateString('"foo" + `bar`'),
        '"foo" + `bar`'
      )
      done()
    })
  })

  describe('parseArguments()', function () {
    it('matches string arguments', function (done) {
      const Lexer = new JavascriptLexer()
      const args = '"first", "bla"'
      assert.deepEqual(
        Lexer.parseArguments(args),
        {
          arguments: [
            '"first"',
            '"bla"'
          ],
          options: {}
        }
      )
      done()
    })

    it('matches variable arguments', function (done) {
      const Lexer = new JavascriptLexer()
      const args = 'first bla'
      assert.deepEqual(
        Lexer.parseArguments(args),
        {
          arguments: [
            'first',
            'bla'
          ],
          options: {}
        }
      )
      done()
    })

    it('matches concatenated arguments and concatenate when possible', function (done) {
      const Lexer = new JavascriptLexer()
      const args = "'first' + asd, 'bla' + 'asd', foo+bar+baz"
      assert.deepEqual(
        Lexer.parseArguments(args),
        {
          arguments: [
            "'first' + asd",
            "'blaasd'", // string got concatenated!
            "foo+bar+baz"
          ],
          options: {}
        }
      )
      done()
    })
  })
})
