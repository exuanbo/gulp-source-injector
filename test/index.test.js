/* eslint-env mocha */
'use strict'

const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const Vinyl = require('vinyl')
const inject = require('..')

describe('gulp-source-injector', () => {
  it('works for me', done => {
    const getFile = (filePath, contents) => {
      filePath = filePath.replace(/\\/g, '/')
      if (!path.extname(filePath)) filePath += '.html'
      return new Vinyl({
        base: path.dirname(filePath),
        path: filePath,
        contents: contents || fs.readFileSync(filePath)
      })
    }

    const getFixture = filePath => {
      return getFile(path.join(__dirname, 'fixtures', filePath))
    }

    const getExpected = filePath => {
      return getFile(path.join(__dirname, 'expected', filePath))
    }

    const stream = inject()
    stream.on('error', err => done(err))
    stream.on('data', file => {
      expect(String(file.contents)).to.equal(
        String(getExpected('expected').contents)
      )
      done()
    })
    stream.write(getFixture('test'))
    stream.end()
  })
})
