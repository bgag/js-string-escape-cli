/* global describe, echo, exec, it, mkdir, rm */

require('shelljs/global')

var assert = require('assert')
var fs = require('fs')

describe('js-string-escape', function () {
  rm('-rf', '.tmp')
  mkdir('.tmp')

  it('should support reading from stdin if "-" is given', function () {
    echo('"\n\'').exec('./cli.js - .tmp/stdin')

    assert.equal('\\"\\n\\\'', fs.readFileSync('.tmp/stdin').toString())
  })

  it('should support writing to stdout if "-" is given', function () {
    var output = exec('./cli.js test/support/input -').stdout

    assert.equal('\\"\\n\\\'', output)
  })

  it('should support writing CommonJS module.export if option -c is given', function () {
    var output = exec('./cli.js -c test/support/input -').stdout

    assert.equal('module.exports = \'\\"\\n\\\'\'', output)
  })

  it('should support writing a quoted literal if option -q is given', function () {
    var output = exec('./cli.js -q test/support/input -').stdout

    assert.equal('\'\\"\\n\\\'\'', output)
  })

  it('should support writing a double quoted literal if option -d is given', function () {
    var output = exec('./cli.js -d test/support/input -').stdout

    assert.equal('"\\"\\n\\\'"', output)
  })
})
