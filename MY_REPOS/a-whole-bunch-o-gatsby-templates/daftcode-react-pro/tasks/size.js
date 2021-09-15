/**
 * Size report
 */
const gulp = require('gulp');
const sizereport = require('gulp-sizereport');
const path = require('path');
// const wait = require('gulp-wait');

const config = require('./config.json');

gulp.task('size', () =>
  gulp.src(path.join(__dirname, config.root.dist, '**/*.+(js|css|html|png|jpg|svg|woff)')).pipe(
    sizereport({
      fail: true,
      gzip: true,
      '*': {
        maxGzippedSize: 250000,
      },
      'index.html': {
        maxSize: 100000,
        maxGzippedSize: 30000,
      },
    })
  )
);
