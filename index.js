'use strict'

const fs = require('fs')
const path = require('path')
const through = require('through2')
const PluginError = require('plugin-error')

const PLUGIN_NAME = '@exuanbo/gulp-inject-inline'

const injectInline = () => {
  return through.obj((file, encoding, callback) => {
    const regex = /(?:<!--|\/\*)\s*?inject-inline:\s*?([^\s].+?)\s*?(?:-->|\*\/)/gi
    const rootDir = process.cwd()

    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    const sourceContents = String(file.contents).replace(
      regex,
      (_match, src) => {
        const sourcePath = src.startsWith('/')
          ? path.join(rootDir, src)
          : path.join(file.dirname, src)
        return String(fs.readFileSync(sourcePath))
      }
    )

    file.contents = Buffer.from(sourceContents)
    callback(null, file)
  })
}

module.exports = injectInline
