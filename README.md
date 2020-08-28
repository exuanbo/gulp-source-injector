# gulp-source-injector

> Injects any source into any file.

[![npm](https://img.shields.io/npm/v/gulp-source-injector.svg?style=flat-square)](https://www.npmjs.com/package/gulp-source-injector)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![Travis (.com)](https://img.shields.io/travis/com/exuanbo/gulp-source-injector/master.svg?style=flat-square)](http://travis-ci.com/exuanbo/gulp-source-injector)
[![David](https://img.shields.io/david/exuanbo/gulp-source-injector.svg?style=flat-square)](https://david-dm.org/exuanbo/gulp-source-injector)
[![License](https://img.shields.io/github/license/exuanbo/gulp-source-injector.svg?style=flat-square)](https://github.com/exuanbo/gulp-source-injector/blob/master/LICENSE)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
  - [Indentation](#indentation)
- [License](#license)

## Description

`gulp-source-injector` transforms content of each source file to a string and injects each transformed string into placeholders in the target stream files.

This plugin does not do any minification to source files, so whitespaces will be preserved. It's better to use it after transformations like `gulp-uglify-es` or `gulp-clean-css`.

## Installation

Install `gulp-source-injector` as a development dependency

```shell
npm install --save-dev gulp-source-injector
```

## Usage

Injection placeholders are comments as html syntax `<!-- inject: filePath -->` and css/js syntax `/* inject: filePath */`

By default the injected file path is relative to each target file's `cwd`. If the provided path starts with `/`, it will be considered relative to the directory of `gulpfile.js`

## Example

Project structure

```shell
├── src
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── script.js
│   ├── template
│   │   └── head.html
│   └── index.html
└── gulpfile.js
```

Target file `src/index.html`

```html
<html>
  <head>
    <!-- inject: /src/template/head.html -->
    <style>
      /* inject: ./css/style.css */
    </style>
    <script>
      /*inject:js/script.js*/
    </script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

`gulpfile.js`

```javascript
const { task, src, dest } = require('gulp')
const inject = require('gulp-source-injector')

task('inject', () => {
  return src('src/index.html')
    .pipe(inject())
    .pipe(dest('dist'))
})
```

or you can

```javascript
import inject from 'gulp-source-injector'
```

and then

`dist/index.html` after running `gulp inject`

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta title="test">
    <style>
      body {
        background-color: #333;
      }

      h1 {
        color: #EEE;
      }
    </style>
    <script>
      console.log('foobar')
    </script>
  </head>
  <body>
    <h1>Lorem Ipsum</h1>
  </body>
</html>
```

### Indentation

Note that existing indentation won't be preserved.

Target file `src/index.html`

```html
<html>
  <head>
    <style>
      /* inject: ./css/style.css */
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

Source file `src/css/style.css`

```css
body {
  background-color: #333;
}

h1 {
  color: #EEE;
}
```

`dist/index.html`

```html
<html>
  <head>
    <style>
      body {
  background-color: #333;
}

h1 {
  color: #EEE;
}
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

## License

[MIT](https://github.com/exuanbo/gulp-source-injector/blob/master/LICENSE)

## Donate

<a href="https://www.buymeacoffee.com/exuanbo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
