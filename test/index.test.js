/* eslint-env mocha */
'use strict'

const fs = require('fs')
const should = require('should')
const Vinyl = require('vinyl')
const injectInline = require('..')

describe('gulp-inject-inline', () => {
  it('Should inject resources into test.html, making it equal to expected.html', done => {
    const testHtml = new Vinyl({
      base: 'test/resources/',
      path: 'test/resources/test.html',
      contents: fs.readFileSync('test/resources/test.html')
    })

    const expectedHtml = new Vinyl({
      base: 'test/',
      path: 'test/expected.html',
      contents: fs.readFileSync('test/expected.html')
    })

    const stream = injectInline()

    stream.on('error', err => {
      should.exist(err)
      done(err)
    })

    stream.on('data', file => {
      should.exist(file)
      should.exist(file.contents)

      should.equal(String(file.contents), String(expectedHtml.contents))
      done()
    })

    stream.write(testHtml)
    stream.end()
  })
})
