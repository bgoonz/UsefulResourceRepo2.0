import * as chalk from "chalk";
import InitCommand from "./init";
import { oneLine } from "common-tags";

const Command = require("../ember-cli/lib/models/command");
const Project = require("../ember-cli/lib/models/project");
const SilentError = require("silent-error");
const validProjectName = require("../ember-cli/lib/utilities/valid-project-name");

const NewCommand = Command.extend({
  name: "new",
  description: `Creates a new directory and runs ${chalk.green(
    "ng init"
  )} in it.`,
  works: "outsideProject",

  availableOptions: [
    { name: "dry-run", type: Boolean, default: false, aliases: ["d"] },
    { name: "verbose", type: Boolean, default: false, aliases: ["v"] },
    { name: "link-cli", type: Boolean, default: false, aliases: ["lc"] },
    { name: "skip-npm", type: Boolean, default: false, aliases: ["sn"] },
    { name: "skip-git", type: Boolean, default: false, aliases: ["sg"] },
    { name: "skip-commit", type: Boolean, default: false, aliases: ["sc"] },
    { name: "directory", type: String, aliases: ["dir"] },
    { name: "source-dir", type: String, default: "src", aliases: ["sd"] },
    { name: "style", type: String, default: "css" },
    { name: "prefix", type: String, default: "app", aliases: ["p"] },
    { name: "mobile", type: Boolean, default: false },
    { name: "routing", type: Boolean, default: false },
    { name: "inline-style", type: Boolean, default: false, aliases: ["is"] },
    { name: "inline-template", type: Boolean, default: false, aliases: ["it"] },
  ],

  run: function (commandOptions: any, rawArgs: string[]) {
    const packageName = rawArgs.shift();

    if (!packageName) {
      return Promise.reject(
        new SilentError(
          `The "ng ${this.name}" command requires a name argument to be specified. ` +
            `For more details, use "ng help".`
        )
      );
    }
    if (
      !packageName.match(/^[a-zA-Z][.0-9a-zA-Z]*(-[a-zA-Z][.0-9a-zA-Z]*)*$/)
    ) {
      return Promise.reject(
        new SilentError(oneLine`
        Project name "${packageName}" is not valid. New project names must
        start with a letter, and must contain only alphanumeric characters or dashes.
      `)
      );
    }

    commandOptions.name = packageName;
    if (commandOptions.dryRun) {
      commandOptions.skipGit = true;
    }

    if (packageName === ".") {
      return Promise.reject(
        new SilentError(
          `Trying to generate an application structure in this directory? Use "ng init" ` +
            `instead.`
        )
      );
    }

    if (!validProjectName(packageName)) {
      return Promise.reject(
        new SilentError(
          `We currently do not support a name of "${packageName}".`
        )
      );
    }

    if (commandOptions.mobile) {
      return Promise.reject(
        new SilentError(
          "The --mobile flag has been disabled temporarily while we await an update of " +
            "angular-universal for supporting NgModule. Sorry for the inconvenience."
        )
      );
    }

    if (!commandOptions.directory) {
      commandOptions.directory = packageName;
    }

    const createAndStepIntoDirectory =
      new this.tasks.CreateAndStepIntoDirectory({ ui: this.ui });

    const initCommand = new InitCommand({
      ui: this.ui,
      tasks: this.tasks,
      project: Project.nullProject(this.ui, this.cli),
    });

    return createAndStepIntoDirectory
      .run({
        directoryName: commandOptions.directory,
        dryRun: commandOptions.dryRun,
      })
      .then(initCommand.run.bind(initCommand, commandOptions, rawArgs));
  },
});

NewCommand.overrideCore = true;
export default NewCommand;
