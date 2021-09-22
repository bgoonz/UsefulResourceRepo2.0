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
        message: 'What is the name of the problem?',
        validate: input => {
          return input.length > 0
            ? true
            : 'Problem name contains no characters.';
        },
      },
      {
        type: 'input',
        name: 'jest',
        message: 'Do you want a jest testcase?',
        default: 'n',
      },
      {
        type: 'input',
        name: 'tree',
        message: 'Is it a tree problem?',
        default: 'n',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.hasJestTestCase = props.jest !== 'n';
      props.isTree = props.tree !== 'n';
      props.camelCaseProblemName = _.camelCase(props.name);
      const nameHasHyphen = props.name.indexOf('-');
      if (nameHasHyphen !== -1) {
        const splitArr = props.name.split(/-(.+)/);
        if (splitArr[0] && splitArr[0].match(/^[0-9]+$/) !== null) {
          const title =
            splitArr[1] &&
            splitArr[1]
              .split('-')
              .join(' ')
              .replace(/\.[^/.]+$/, '');
          props.camelCaseProblemName = _.camelCase(title);
        } else {
          props.camelCaseProblemName = _.camelCase(props.name);
        }
      } else {
        props.camelCaseProblemName = _.camelCase(props.name);
      }
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
