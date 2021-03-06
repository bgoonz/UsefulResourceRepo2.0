import * as path from "path";
import { AotPlugin } from "@ngtools/webpack";

const g: any = global;
const webpackLoader: string = g["angularCliIsLocal"]
  ? g.angularCliPackages["@ngtools/webpack"].main
  : "@ngtools/webpack";

export const getWebpackNonAotConfigPartial = function (
  projectRoot: string,
  appConfig: any
) {
  return {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: webpackLoader,
          exclude: [/\.(spec|e2e)\.ts$/],
        },
      ],
    },
    plugins: [
      new AotPlugin({
        tsConfigPath: path.resolve(
          projectRoot,
          appConfig.root,
          appConfig.tsconfig
        ),
        mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
        exclude: [
          path.join(projectRoot, appConfig.root, appConfig.test),
          "**/*.spec.ts",
        ],
        skipCodeGeneration: true,
      }),
    ],
  };
};

export const getWebpackAotConfigPartial = function (
  projectRoot: string,
  appConfig: any,
  i18nFile: string,
  i18nFormat: string,
  locale: string
) {
  return {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: webpackLoader,
          exclude: [/\.(spec|e2e)\.ts$/],
        },
      ],
    },
    plugins: [
      new AotPlugin({
        tsConfigPath: path.resolve(
          projectRoot,
          appConfig.root,
          appConfig.tsconfig
        ),
        mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
        i18nFile: i18nFile,
        i18nFormat: i18nFormat,
        locale: locale,
        exclude: [
          path.join(projectRoot, appConfig.root, appConfig.test),
          "**/*.spec.ts",
        ],
      }),
    ],
  };
};
