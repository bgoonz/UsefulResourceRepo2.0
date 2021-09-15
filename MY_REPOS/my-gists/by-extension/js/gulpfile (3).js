'use strict';

var gulp = require('gulp'),
    gp_changed = require('gulp-changed'),
    gp_clean = require('gulp-clean'),
    gp_concat = require('gulp-concat'),
    gp_filesize = require('gulp-filesize'),
    gp_less = require('gulp-less'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_util = require('gulp-util');

var staticPrefix = 'src/sentry/static/sentry',
    distPath = staticPrefix + '/dist';

function file(name) {
  return staticPrefix + name;
}

function vendorFile(name) {
  return staticPrefix + '/vendor' + name;
}

gulp.task('clean', function () {
  return gulp.src(distPath, {read: false})
    .pipe(gp_clean());
});

gulp.task('dist:css', function () {
  return gulp.src(file('less/sentry.less'))
    .pipe(gp_changed(distPath))
    .pipe(gp_less({
      // paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(distPath))
    .on('error', gp_util.log);
});

gulp.task('dist:js:vendor-misc', function(){
  var files = [
    vendorFile('moment/min/moment.min.js'),
    vendorFile('simple-slider/js/simple-slider.min.js'),
    file('scripts/lib/select2/select2.js')
  ];

  return gulp.src(files)
    .pipe(gp_concat('vendor-misc.js'))
    .pipe(gulp.dest(distPath))
    .pipe(gp_filesize())
    .pipe(gp_uglify('vendor-misc.min.js', {
      outSourceMap: true
    }))
    .pipe(gp_rename('vendor-misc.min.js'))
    .pipe(gulp.dest(distPath))
    .pipe(gp_filesize())
    .on('error', gp_util.log);
});
