import gulp from "gulp";
import webpack from "webpack";
import chalk from "chalk";
import { create as createConfigMain } from "./webpack.config.js";
import ignore from "gulp-ignore";
import rimraf from "gulp-rimraf";
import gulpUtil from "gulp-util";

gulp.task("clean", () => {
  return gulp.src("./client/public/*", { read: false }).pipe(rimraf());
});

gulp.task("dev:client", gulp.series("clean", devClientBuild));
gulp.task("prod:client", gulp.series("clean", prodClientBuild));
gulp.task("dev:watch", gulp.series("clean", devClientWatch));

// ------------------------
// Private client Tasks
const devClientWebpack = webpack(createConfigMain(true));

function devClientBuild(callback) {
  devClientWebpack.run((error, stats) => {
    outputWebpack("dev:client", error, stats);
    callback();
  });
}

function prodClientBuild() {
  const prodClientWebpack = webpack(createConfigMain(false));
  prodClientWebpack.run((error, stats) => {
    outputWebpack("dev:prod", error, stats);
    callback();
  });
}

function devClientWatch() {
  devClientWebpack.watch({}, (error, stats) => {
    outputWebpack("Dev:client", error, stats);
  });
}

/// Helpers
function outputWebpack(label, error, stats) {
  if (error) {
    throw new Error(error);
  }
  if (stats.hasErrors()) {
    gulpUtil.log(stats.toString({ colors: true }));
  } else {
    const time = stats.endTime - stats.startTime;
    gulpUtil.log(chalk.green(`Built ${label} in ${time} ms`));
  }

  gulpUtil.log(stats.toString());
}
