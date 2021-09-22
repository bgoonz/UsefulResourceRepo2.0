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
        message: 'What is the name of the file?',
        validate: input => {
          return input.length > 0 ? true : 'Filename contains no characters.';
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  _copy(props, fileExtension) {
    this.fs.copyTpl(
      this.templatePath('javascript.' + fileExtension + '.ejs'),
      this.destinationPath(
        './' + _.capitalize(props.name) + '.' + fileExtension
      ),
      props
    );
  }

  writing() {
    this._copy(this.props, 'js');
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
