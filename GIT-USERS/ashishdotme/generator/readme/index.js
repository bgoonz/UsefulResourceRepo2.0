'use strict';
const chalk = require('chalk');
const figlet = require('figlet');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const printMessage = require('print-message');

module.exports = class extends Generator {
  prompting() {
    this.log(`👋 Welcome to the ${chalk.magenta("Ashish Patel's")} generator!`);

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        validate: input => {
          return input.length > 0
            ? true
            : 'Project name contains no characters.';
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  createFolderIfDoesNotExist() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`Creating a folder named ${this.props.name}`);
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    const config = {
      name: this.props.name,
    };
    this.fs.copyTpl(this.templatePath('**'), this.destinationRoot(), config);
  }

  end() {
    this.log(`${chalk.magenta(figlet.textSync('Ashish'))}`);
    this.log(`${chalk.magenta(figlet.textSync('Patel'))}`);
    printMessage(['Project files created'], {
      border: true,
      color: 'magenta',
      borderColor: 'magenta',
      marginTop: 1,
      marginBottom: 1,
      paddingTop: 1,
      paddingBottom: 1,
    });
  }
};
