
const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const addTestDatabaseConfig = (database) => {
  // HACK: Add the `test` environment database configuration
  // so that later tests can successfully load the `./db/models`
  // module without Sequelize throwing an error about the
  // missing environment settings.
  database.test = {
    dialect: 'sqlite',
    use_env_variable: 'DB_CONN',
    logging: false,
  };
};

const addTestDatabaseConfigIfConfigDatabaseModuleExists = () => {
  try {
    const database = require('../../config/database');
    addTestDatabaseConfig(database);
  } catch (err) {
    // Nothing to do here but swallow the error.
  }
};

const loadModule = (pathToModule) => {
  let moduleToReturn;
  try {
    moduleToReturn = require(`../${pathToModule}`);
  } catch (err) {
    // console.log(err);
    moduleToReturn = null;
  }

  it('should be defined and export at least one item', () => {
    expect(moduleToReturn).to.not.be.null.and.to.not.deep.equal({});
  });

  return moduleToReturn;
};

const pathExists = (pathToCheck) => {
  const exists = fs.existsSync(pathToCheck);

  it('should exist', () => {
    expect(exists).to.be.true;
  });

  return exists;
};

const readFile = (filePath) => {
  let fileContents;
  try {
    fileContents = fs.readFileSync(filePath, { encoding: 'UTF8' });
  } catch (err) {
    fileContents = null;
  }

  it('should exist', () => {
    expect(fileContents).to.not.be.null;
  });

  return fileContents;
};

const suppressRequestLogging = (app) => {
  // Find the "logger" middleware (i.e. `morgan`)
  // the replace it with a "no op" middleware function
  // to suppress request logging when running specs.
  const logger = app._router.stack.find((m) => m.name === 'logger');
  if (logger !== null) {
    logger.handle = (req, res, next) => {
      next();
    };
  }
};

const testEnvFile = (fileName, expectedEnvVars) => {
  let pass = true;

  describe(`\`${fileName}\` file`, () => {
    const fileContents = readFile(path.join(__dirname, '..', '..', fileName));

    if (fileContents === null) {
      pass = false;
      return;
    }

    expectedEnvVars.forEach((envVar) => {
      it(`should define and set a \`${envVar.name}\` variable value`, () => {
        expect(fileContents).to.match(envVar.pattern);
      });
    });
  });

  return pass;
};

module.exports = {
  addTestDatabaseConfig,
  addTestDatabaseConfigIfConfigDatabaseModuleExists,
  loadModule,
  pathExists,
  readFile,
  suppressRequestLogging,
  testEnvFile,
};
