var gulp    = require('gulp');
var sass    = require('gulp-sass');
var cssmin  = require('gulp-minify-css');
var csslint = require('gulp-csslint');
var prefix  = require('gulp-autoprefixer');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var jshint  = require('gulp-jshint');
var uglify  = require('gulp-uglify');

gulp.task('scss', function() {
  return gulp.src('public/scss/all.scss')
    .pipe(sass())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(csslint())
    .pipe(cssmin())
    .pipe(rename('c.min.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(concat('../j.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
})

gulp.task('watch', function() {
  gulp.watch('public/scss/*.scss', ['scss', 'csslint']);
  gulp.watch('public/js/*.js', ['js']);
});

gulp.task('default', ['js', 'scss', 'watch']);
