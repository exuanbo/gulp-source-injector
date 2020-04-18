'use strict'

const fs = require('fs')
const should = require('should')
const Vinyl = require('vinyl')
const injectInline = require('../index.js')

describe('gulp-inject-inline', () => {
  it('Should inject resources into test.html, making it equal to expected.html', done => {
    const testHtml = new Vinyl({
      path: 'test/resources/test.html',
      base: 'test/resources/',
      contents: fs.readFileSync('test/resources/test.html')
    })

    const expectedHtml = new Vinyl({
      path: 'test/expected.html',
      base: 'test/',
      contents: fs.readFileSync('test/expected.html')
    })

    const stream = injectInline()

    stream.on('error', error => {
      should.exist(error)
      done(error)
    })

    stream.on('data', file => {
      should.exist(file)
      should.exist(file.contents)

      const contents = String(file.contents)
      contents.should.equal(String(expectedHtml.contents))
      done()
    })

    stream.write(testHtml)
    stream.end()
  })
})
