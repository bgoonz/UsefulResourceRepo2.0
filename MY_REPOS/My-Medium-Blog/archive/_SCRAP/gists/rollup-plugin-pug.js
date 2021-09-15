import Pug from "pug";
import { promises as FileSystem } from "fs";
import pkgDir from "pkg-dir";
import Path from "path";

export default (options = { debug: false }) => ({
  name: "pug",
  async load(absPath) {
    if (!absPath.endsWith(".pug")) return null;

    const source = await FileSystem.readFile(absPath, "utf8");
    const filename = Path.relative(await pkgDir(), absPath);

    const fn = Pug.compile(source, {
      filename: filename,
      inlineRuntimeFunctions: false,
      compileDebug: !!options.debug,
      debug: false,
      pretty: false,
    });

    for (const dep of fn.dependencies) {
      this.addWatchFile(dep);
    }

    return {
      code: `import pug from 'pug-runtime';\n${fn};\nexport default template;`,
      moduleSideEffects: false,
    };
  },
});
