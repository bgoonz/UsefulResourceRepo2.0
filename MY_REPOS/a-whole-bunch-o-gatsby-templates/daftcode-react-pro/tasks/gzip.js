/**
 * gzip build filed
 */
const path = require('path');
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gzip = require('gulp-gzip');

const config = require('./config');

gulp.task('gzip', function() {
  gulp
    .src(path.join(__dirname, config.root.dist, '**/*.+(js|html|css)'))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gzip())
    .pipe(gulp.dest(path.join(__dirname, config.root.dist)));
});
