const { describe, it } = require("mocha");
const { expect } = require("chai");

const { loadModule, readFile, testEnvFile } = require("./utils");

const runSpecs = () => {
  let bail = false;

  const envVars = [{ name: "PORT", pattern: /^PORT=\d+$/m }];

  // Test that the `.env` file exists
  // and has the correct contents.
  if (!testEnvFile(".env", envVars)) return;

  // Test that the `.env.example` file exists
  // and has the correct contents.
  if (!testEnvFile(".env.example", envVars)) return;

  // Test that the `config` module exists
  // and exports the expected env vars.

  describe("`config` module", () => {
    const config = loadModule("../config");

    if (config === null) {
      bail = true;
      return;
    }

    it("should export a `port` property", () => {
      expect(config.port).to.not.be.undefined;
    });
  });

  if (bail) return;

  // Test that the `package.json` file
  // defines the expected `start` script.

  describe("`package.json` file", () => {
    const fileContents = readFile(`${__dirname}/../package.json`);

    if (fileContents === null) {
      bail = true;
      return;
    }

    it("should define a `start` script that passes the `-r` option into the `nodemon` command to load the `dotenv` module", () => {
      expect(fileContents).to.match(
        /"start":\s*"nodemon -r dotenv\/config \.\/bin\/www"/
      );
    });
  });
};

runSpecs();
