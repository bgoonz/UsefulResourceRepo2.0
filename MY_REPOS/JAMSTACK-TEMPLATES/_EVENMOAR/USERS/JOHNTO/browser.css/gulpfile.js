var gulp    = require('gulp');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var cssmin  = require('gulp-minify-css');
var csslint = require('gulp-csslint');
var prefix  = require('gulp-autoprefixer');

gulp.task('scss', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(csslint())
    .pipe(rename('browser.css'))
    .pipe(gulp.dest('css'))
    .pipe(cssmin())
    .pipe(rename('browser.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['scss']);
