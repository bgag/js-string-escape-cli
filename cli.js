#!/usr/bin/env node

var fs = require('fs')
var jsStringEscape = require('js-string-escape')
var program = require('commander')

program
  .version('1.0.0')
  .usage('[options] <input> <output>')
  .option('-c, --commonjs', 'add CommonJS module.export')
  .option('-q, --quote', 'add quotes')
  .option('-d, --double', 'add double quotes')
  .parse(process.argv)

if (program.args.length !== 2) {
  program.help()
}

var input
var output
var prefix = ''
var postfix = ''

if (program.args[0] === '-') {
  input = process.stdin
} else {
  input = fs.createReadStream(program.args[0])
}

if (program.args[1] === '-') {
  output = process.stdout
} else {
  output = fs.createWriteStream(program.args[1])
}

if (program.commonjs) {
  prefix = 'module.exports = \''
  postfix = '\''
} else if (program.quote) {
  prefix = '\''
  postfix = '\''
} else if (program.double) {
  prefix = '"'
  postfix = '"'
}

output.write(prefix)

input.on('data', function (data) {
  output.write(jsStringEscape(data))
})

input.on('end', function () {
  if (output === process.stdout) {
    output.write(postfix)
  } else {
    output.end(postfix)
  }
})

input.on('error', function (err) {
  console.error(err.stack || err.message)

  output.end()
})

output.on('error', function (err) {
  console.error(err.stack || err.message)

  input.trigger('end')
})

input.resume()
