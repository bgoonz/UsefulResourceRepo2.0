return tsResult.js
  .pipe(
    sourcemaps.mapSources(function(sourcePath, file) {
      return "../../" + sourcePath; // rewrite sourcePath to point to the correct TypeScript file paths
    })
  )
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./dist/src"));