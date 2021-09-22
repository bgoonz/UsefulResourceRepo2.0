'use strict';
const chalk = require('chalk');
const _ = require('lodash');
const figlet = require('figlet');
const Generator = require('yeoman-generator');
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
      this.props = props;
    });
  }

  _copy(props) {
    this.fs.copyTpl(
      this.templatePath('.editorconfig.ejs'),
      this.destinationPath(props.name + '/' + '.editorconfig'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore.ejs'),
      this.destinationPath(props.name + '/' + '.gitignore'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('index.ts.ejs'),
      this.destinationPath(props.name + '/src/' + 'index.ts'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath(props.name + '/' + 'package.json'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('tsconfig.json.ejs'),
      this.destinationPath(props.name + '/' + 'tsconfig.json'),
      props
    );
  }

  writing() {
    this._copy(this.props);
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
