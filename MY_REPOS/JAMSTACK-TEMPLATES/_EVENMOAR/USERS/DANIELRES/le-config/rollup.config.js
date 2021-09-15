import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const input = "src/index.ts";
const { main, module } = pkg;

const base = {
  input,
  output: [
    { file: main, format: "cjs" },
    { file: module, format: "es" },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [typescript({ module: "es6" })],
};

const minified = {
  ...base,
  output: base.output.map((entry) => ({
    ...entry,
    file: entry.file.replace(".js", ".min.js"),
  })),
  plugins: [...base.plugins, terser()],
};

export default [base, minified];
