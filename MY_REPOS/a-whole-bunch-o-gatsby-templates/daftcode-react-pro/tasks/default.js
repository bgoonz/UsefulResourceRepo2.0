/**
 * Default Tasks
 */
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('optimize', cb => {
  runSequence('optimize_images', 'webp', cb);
});

gulp.task('postbuild', cb => {
  runSequence('gzip', 'size', cb);
});
