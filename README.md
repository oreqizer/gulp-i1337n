# gulp-i1337n

[![Build Status](https://travis-ci.org/oreqizer/gulp-i1337n.svg?branch=master)](https://travis-ci.org/oreqizer/gulp-i1337n)
[![codecov](https://codecov.io/gh/oreqizer/gulp-i1337n/branch/master/graph/badge.svg)](https://codecov.io/gh/oreqizer/gulp-i1337n)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm (scoped)](https://img.shields.io/npm/v/gulp-i1337n.svg)](https://www.npmjs.com/package/gulp-i1337n)

A [gulp](https://gulpjs.com/) plugin for static translations. Uses [babylon](https://github.com/babel/babylon) under the hood. 

### Install

```
yarn add gulp-i1337n --dev
```

### Usage

```js
const gulp = require('gulp');
const i1337n = require('gulp-i1337n');

gulp.task('default', () =>
  gulp
    .src('src/app.js')
    .pipe(i1337n({ hello: 'World!' }))
    .pipe(gulp.dest('dist'))
);
```

Turns this:
```js
function greet() {
  console.log(__('hello'));
}
```

into this:
```js
function greet() {
  console.log('World!');
}
```

### API

> TODO

## License

MIT
