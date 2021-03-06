import {
  writeMultipleFiles,
  deleteFile,
  expectFileToMatch,
  replaceInFile,
} from "../../../utils/fs";
import { ng } from "../../../utils/process";
import { stripIndents } from "common-tags";
import { updateJsonFile } from "../../../utils/project";

export default function () {
  return writeMultipleFiles({
    "src/styles.less": stripIndents`
      @import './imported-styles.less';
      body { background-color: blue; }
    `,
    "src/imported-styles.less": stripIndents`
      p { background-color: red; }
    `,
    "src/app/app.component.less": stripIndents`
        .outer {
          .inner {
            background: #fff;
          }
        }
      `,
  })
    .then(() => deleteFile("src/app/app.component.css"))
    .then(() =>
      updateJsonFile("angular-cli.json", (configJson) => {
        const app = configJson["apps"][0];
        app["styles"] = ["styles.less"];
      })
    )
    .then(() =>
      replaceInFile(
        "src/app/app.component.ts",
        "./app.component.css",
        "./app.component.less"
      )
    )
    .then(() => ng("build"))
    .then(() =>
      expectFileToMatch(
        "dist/styles.bundle.css",
        /body\s*{\s*background-color: blue;\s*}/
      )
    )
    .then(() =>
      expectFileToMatch(
        "dist/styles.bundle.css",
        /p\s*{\s*background-color: red;\s*}/
      )
    )
    .then(() =>
      expectFileToMatch(
        "dist/main.bundle.js",
        /.outer.*.inner.*background:\s*#[fF]+/
      )
    );
}
