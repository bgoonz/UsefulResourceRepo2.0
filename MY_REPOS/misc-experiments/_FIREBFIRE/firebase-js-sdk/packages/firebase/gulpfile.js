/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
urcemaps');
const replace = require('gulp-replace');

const pkgJson = require('./package.json');
const files = pkgJson.components.map(component => {
  const componentName = component.replace('/', '-');
  return `firebase-${componentName}.js`;
});
const FIREBASE_APP_URL = `https://www.gstatic.com/firebasejs/${pkgJson.version}/firebase-app.js`;

gulp.task('cdn-type-module-path', function () {
  return gulp
    .src(files)
    .pipe(sourcemaps.init({ loadMaps: true }))
    // gulp-replace doesn't work with gulp-sourcemaps, so no change is made to the existing sourcemap. 
    // Therefore the sourcemap become slightly inaccurate
    .pipe(replace('@firebase/app', FIREBASE_APP_URL))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});
