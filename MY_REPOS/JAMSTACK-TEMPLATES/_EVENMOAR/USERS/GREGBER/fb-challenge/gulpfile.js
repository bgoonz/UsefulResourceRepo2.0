var gulp = require('gulp');
var browserSync = require('browser-sync');

// Static server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});


gulp.task('default', ['browser-sync'], function () {
  gulp.watch('style.css', function () {
    browserSync.reload(['style.css']);
  });

  gulp.watch('*.js', function () {
    browserSync.reload();
  });

  gulp.watch('index.html', function () {
    browserSync.reload(['index.html']);
  });
});
