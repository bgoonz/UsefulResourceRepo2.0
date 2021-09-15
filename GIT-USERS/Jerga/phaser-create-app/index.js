const path = require("path");
const CURR_DIR = path.join(process.cwd(), "..");
const fs = require("fs");

const templatePath = `${__dirname}/templates/pca-template`;

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}
const args = process.argv.slice(2);
const newProjectDir = args.length === 0 ? "phaser-app" : args;

try {
  fs.mkdirSync(`${CURR_DIR}/${newProjectDir}`);
  createDirectoryContents(templatePath, newProjectDir);
} catch {
  console.log("Folder already exists!");
}
