# gulp-i1337n

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
