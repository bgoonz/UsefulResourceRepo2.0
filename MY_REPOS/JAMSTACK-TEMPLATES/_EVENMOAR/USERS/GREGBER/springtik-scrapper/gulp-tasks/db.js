export default gulp => {
  const db = require('../src/db').default;
  const argv = require('minimist')(process.argv.slice(2));

  gulp.task('db:sync', () =>
    db.sync(argv)
      .then(() => db.close() || null)
  );

  gulp.task('db:drop', () =>
    db.drop(argv)
      .then(() => db.close() || null)
  );
};
