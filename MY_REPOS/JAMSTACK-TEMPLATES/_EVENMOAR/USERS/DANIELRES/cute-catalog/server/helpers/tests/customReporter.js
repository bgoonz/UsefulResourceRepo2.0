const chalk = require("chalk");
const { getConsoleOutput } = require("jest-util");
const getResultHeader =
  require("jest-cli/build/reporters/get_result_header").default;
const VerboseReporter =
  require("jest-cli/build/reporters/verbose_reporter").default;

const TITLE_BULLET = chalk.bold("\u25cf ");

class BetterReporter extends VerboseReporter {
  printTestFileHeader(testPath, config, result) {
    this.log(getResultHeader(result, this._globalConfig, config));

    const consoleBuffer = result.console;
    const testFailed = result.numFailingTests > 0;

    if (testFailed && consoleBuffer && consoleBuffer.length) {
      // prettier-ignore
      this.log(
        `  ${TITLE_BULLET}Console\n\n${getConsoleOutput(
          config.cwd,
          !!this._globalConfig.verbose,
          consoleBuffer
        )}`
      );
    }
  }
}

module.exports = BetterReporter;
