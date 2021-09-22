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
        message: 'What is the name of the component?',
        validate: input => {
          return input.length > 0
            ? true
            : 'Component name contains no characters.';
        },
      },
      {
        type: 'input',
        name: 'parent',
        message: 'What is the name of the module your component belongs?',
        validate: input => {
          return input.length > 0
            ? true
            : 'Module name contains no characters.';
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  _copy(props, fileExtension) {
    this.fs.copyTpl(
      this.templatePath('Component.' + fileExtension + '.ejs'),
      this.destinationPath(
        'app/' +
          props.parent +
          '/components/' +
          _.camelCase(props.name) +
          '/' +
          props.name +
          '.' +
          fileExtension
      ),
      props
    );
  }

  writing() {
    this._copy(this.props, 'tsx');
    this._copy(this.props, 'css');
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
