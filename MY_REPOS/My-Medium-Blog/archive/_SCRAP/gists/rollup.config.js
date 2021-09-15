import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodeExternals from "rollup-plugin-node-externals";
import * as tsconfig from "./tsconfig.json";
import json from "@rollup/plugin-json";
import run from "@rollup/plugin-run";
import auto from "@rollup/plugin-auto-install";
import replace from "@rollup/plugin-replace";
import pug from "./rollup-plugins/rollup-plugin-pug";

const extensions = [".ts"];
const isWatch = process.env.ROLLUP_WATCH === "true";
const isDev = process.env.NODE_ENV === "development";
const debug = isWatch || isDev;

export default {
  input: tsconfig.files,
  plugins: [
    nodeExternals({
      builtins: true,
      deps: true,
      devDeps: false,
      peerDeps: true,
      optDeps: false,
    }),
    json(),
    pug({
      debug: debug,
    }),
    babel({
      include: "src/**",
      extensions,
      comments: false,
      babelHelpers: "bundled", // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
    }),
    nodeResolve({
      extensions,
    }),
    replace({
      "process.env.NODE_ENV": process.env.NODE_ENV,
      __DEV__: isWatch || isDev,
    }),
    isDev &&
      auto({
        manager: "yarn",
        pkgFile: `${__dirname}/package.json`,
      }),
    isWatch &&
      run({
        execArgv: ["-r", "dotenv/config", "--enable-source-maps"],
      }),
  ],
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: debug,
    inlineDynamicImports: true,
  },
};
