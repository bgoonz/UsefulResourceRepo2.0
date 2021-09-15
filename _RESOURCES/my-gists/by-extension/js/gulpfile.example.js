const gulp    = require('gulp'),
   uglify     = require('gulp-uglify'),
   pump       = require('pump'),
   sass       = require('gulp-sass'),
   nodemon    = require('gulp-nodemon'),
   livereload = require('gulp-livereload');

gulp.task('serve', function(){
  nodemon({
    script: 'server.js',
    ext: 'js',
  })
  .on('restart', function(){
    console.log('Server Restarted!');
  })
})

gulp.task('js', function(cb){
  pump([
      gulp.src('./src/assets/js/*.js'),
      uglify(),
      gulp.dest('public/js')
    ],
    cb
  );
});

gulp.task('styles', function(){
  gulp.src('./src/assets/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })
  .on('error', sass.logError))
  .pipe(gulp.dest('public/css'))
  .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./src/assets/js/*.js', ['js']);
  gulp.watch('./src/assets/scss/*.scss', ['styles']);
})

gulp.task('default', ['js', 'styles', 'serve', 'watch']);
