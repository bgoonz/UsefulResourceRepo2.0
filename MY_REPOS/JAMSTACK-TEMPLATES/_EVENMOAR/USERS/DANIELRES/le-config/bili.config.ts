import { Config } from "bili";

const config: Config = {
  input: "src/index.ts",

  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ["src/index.ts"],
      },
    },
  },

  output: {
    format: ["cjs", "esm", "cjs-min", "esm-min", "umd", "umd-min"],
    moduleName: "danielres_le_config",
  },
};

export default config;
