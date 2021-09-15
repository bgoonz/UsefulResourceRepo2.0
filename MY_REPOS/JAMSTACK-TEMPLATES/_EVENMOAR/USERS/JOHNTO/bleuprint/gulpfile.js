var gulp = require('gulp');

var jshint  = require('gulp-jshint');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');

gulp.task('js', function() {
  gulp.src('js/src/*.js')
    .pipe(uglify())
    .pipe(concat('j.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('jslint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['jslint', 'js']);
});

gulp.task('default', ['js', 'jslint', 'watch']);
