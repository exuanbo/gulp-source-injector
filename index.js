/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^Buffer\.." }] */
'use strict'

const fs = require('fs')
const path = require('path')
const through = require('through2')
const PluginError = require('plugin-error')

const PLUGIN_NAME = 'gulp-inject-inline'

module.exports = () => {
  return through.obj((file, encoding, callback) => {
    const regex = /(?:<!--|\/\*)\sinject-inline:\s(.+?)\s(?:-->|\*\/)/gi
    const baseDir = __dirname

    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    if (file.isBuffer()) {
      let contents = String(file.contents)

      contents = contents.replace(regex, (_match, src) => {
        const filePath =
          src[0] === '/'
            ? path.join(baseDir, src)
            : path.join(file.dirname, src)
        return String(fs.readFileSync(filePath))
      })

      file.contents = new Buffer.from(contents)
      return callback(null, file)
    }
  })
}
