import { assert } from 'chai'
import HTMLLexer from '../../src/lexers/html-lexer'

describe('HTMLLexer', function () {
  it('extracts keys from html attributes', function (done) {
    const Lexer = new HTMLLexer()
    const html = '<p data-i18n="first;second"></p>'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first' },
        { key: 'second' }
      ]
    )
    done()
  })

  it('ignores leading [] of the key', function (done) {
    const Lexer = new HTMLLexer()
    const html = '<p data-i18n="[title]first;[prepend]second"></p>'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first' },
        { key: 'second' }
      ]
    )
    done()
  })

  it('supports the defaultValue option', function (done) {
    const Lexer = new HTMLLexer()
    const html = '<p data-i18n="first" data-i18n-options=\'{"defaultValue": "bla"}\'>first</p>'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first', defaultValue: 'bla' }
      ]
    )
    done()
  })

  it('grabs the default from innerHTML if missing', function (done) {
    const Lexer = new HTMLLexer()
    const html = '<p data-i18n>first</p>'
    assert.deepEqual(
      Lexer.extract(html),
      [
        { key: 'first' }
      ]
    )
    done()
  })

  it('skip if no key is found', function (done) {
    const Lexer = new HTMLLexer()
    const html = '<p data-i18n></p>'
    assert.deepEqual(
      Lexer.extract(html),
      []
    )
    done()
  })

  describe('parseAttributes()', function () {
    it('extracts attribute value from string', function (done) {
      const Lexer = new HTMLLexer()
      assert.deepEqual(
        Lexer.parseAttributes('title="" bla data-i18n="key1"', 'data-i18n'),
        {
          keys: 'key1',
          options: {}
        }
      )
      done()
    })

    it('extracts json strings too', function (done) {
      const Lexer = new HTMLLexer()
      assert.deepEqual(
        Lexer.parseAttributes('data-i18n="key1;key2" data-i18n-options=\'{"defaultValue": "bla"}\'', 'data-i18n-options'),
        {
          keys: 'key1;key2',
          options: {
            defaultValue: 'bla'
          }
        }
      )
      done()
    })
  })
})
