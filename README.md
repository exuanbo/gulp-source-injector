# gulp-inject-inline

> A javascript, stylesheet and webcomponent inline injection plugin for Gulp.js

[![npm (scoped)](https://img.shields.io/npm/v/@exuanbo/gulp-inject-inline.svg?style=flat-square)](https://www.npmjs.com/package/@exuanbo/gulp-inject-inline)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://standardjs.com)
[![Travis (.com)](https://img.shields.io/travis/com/exuanbo/gulp-inject-inline.svg?style=flat-square)](http://travis-ci.com/exuanbo/gulp-inject-inline)
[![David](https://img.shields.io/david/exuanbo/gulp-inject-inline.svg?style=flat-square)](https://david-dm.org/exuanbo/gulp-inject-inline)
[![License](https://img.shields.io/github/license/exuanbo/gulp-inject-inline.svg?style=flat-square)](https://github.com/exuanbo/gulp-inject-inline/blob/master/LICENSE)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
  - [Indentation](#indentation)
- [License](#license)

## Description

`@exuanbo/gulp-inject-inline` transforms content of each source file to a string and injects each transformed string into placeholders in the target stream files.

This plugin does not do any minification to source files, so whitespaces will be preserved. It's better to use it after transformations like `gulp-uglify-es` or `gulp-clean-css`.

## Installation

Install `@exuanbo/gulp-inject-inline` as a development dependency

```shell
npm install --save-dev @exuanbo/gulp-inject-inline
```

## Usage

Injection placeholders are comments as html syntax `<!-- inject-inline: filePath -->` and css/js syntax `/* inject-inline: filePath */`

By default the injected file path is relative to each target file's `cwd`. If the provided path starts with `/`, it will be relative to the directory of `gulpfile.js`

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
    <!-- inject-inline: /src/template/head.html -->
    <style>
      /* inject-inline: ./css/style.css */
    </style>
    <script>
      /*inject-inline:js/script.js*/
    </script>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

`gulpfile.js`

```javascript
const injectInline = require('@exuanbo/gulp-inject-inline')

gulp.task('inject', () => {
  gulp.src('src/index.html')
    .pipe(injectInline())
    .pipe(gulp.dest("dist"))
})
```

`dist/index.html` after running `gulp inject`

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta title="test">
    <style>
      body {
        width: 100vw;
        height: 100vh;

        margin: 0;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;

        background-color: #4a596b;
      }
      h1 {
        width: 50%;
        color: #eeeeee;

        text-align: center;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    </style>
    <script>
      console.log('Done!')
    </script>
  </head>
  <body>
    <h1>Hello World!</h1>
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
      /* inject-inline: ./css/style.css */
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

[MIT](https://github.com/exuanbo/gulp-inject-inline/blob/master/LICENSE)

## Donate

<a href="https://www.buymeacoffee.com/exuanbo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
