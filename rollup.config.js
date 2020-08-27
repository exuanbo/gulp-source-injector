const commonjs = require('@rollup/plugin-commonjs')
const pkg = require('./package.json')

export default {
  input: 'index.js',
  plugins: [commonjs()],
  external: ['fs', 'path', ...Object.keys(pkg.dependencies)],
  output: {
    file: 'index.es.js',
    format: 'es'
  }
}
