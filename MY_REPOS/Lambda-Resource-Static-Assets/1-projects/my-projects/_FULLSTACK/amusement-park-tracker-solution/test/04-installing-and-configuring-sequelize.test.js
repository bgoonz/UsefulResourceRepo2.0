const { describe, it } = require("mocha");
const { expect } = require("chai");
const path = require("path");

const {
  addTestDatabaseConfig,
  loadModule,
  pathExists,
  testEnvFile,
} = require("./utils");

const runSpecs = () => {
  let bail = false;

  // Test that the `.sequelizerc` module exists
  // and exports the expected Sequelize CLI configuration properties.

  describe("`.sequelizerc` module", () => {
    const sequelizerc = loadModule("../.sequelizerc");

    if (sequelizerc === null) {
      bail = true;
      return;
    }

    it("should export a `config` property", () => {
      expect(sequelizerc.config).to.not.be.undefined;
    });

    it("should export a `models-path` property", () => {
      expect(sequelizerc["models-path"]).to.not.be.undefined;
    });

    it("should export a `seeders-path` property", () => {
      expect(sequelizerc["seeders-path"]).to.not.be.undefined;
    });

    it("should export a `migrations-path` property", () => {
      expect(sequelizerc["migrations-path"]).to.not.be.undefined;
    });
  });

  if (bail) return;

  // Test that the expected Sequelize folders exist.
  // `db`, `db/migrations`, `db/models`, and `db/seeders`

  describe("sequelize", () => {
    describe("db folder", () => pathExists(path.join(__dirname, "..", "db")));
    describe("db/migrations folder", () =>
      pathExists(path.join(__dirname, "..", "db", "migrations")));
    describe("db/models folder", () =>
      pathExists(path.join(__dirname, "..", "db", "models")));
    describe("db/seeders folder", () =>
      pathExists(path.join(__dirname, "..", "db", "seeders")));
  });

  // Test that the `.env` and `.env.example` files
  // contain the expected vars.
  // `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `DB_HOST`

  const envVars = [
    { name: "PORT", pattern: /^PORT=\d+$/m },
    { name: "DB_USERNAME", pattern: /^DB_USERNAME=\w+$/m },
    { name: "DB_PASSWORD", pattern: /^DB_PASSWORD=\w+$/m },
    { name: "DB_DATABASE", pattern: /^DB_DATABASE=\w+$/m },
    { name: "DB_HOST", pattern: /^DB_HOST=\w+$/m },
  ];

  if (!testEnvFile(".env", envVars)) return;
  if (!testEnvFile(".env.example", envVars)) return;

  // Test that the `config` module exists
  // and exports the expected env vars.
  // `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `DB_HOST`

  describe("`config` module", () => {
    const config = loadModule("../config");

    if (config === null) {
      bail = true;
      return;
    }

    it("should export a `port` property", () => {
      expect(config.port).to.not.be.undefined;
    });

    it("should export a `db` property", () => {
      expect(config.db).to.not.be.undefined;
    });

    describe("`db` property object", () => {
      const { db } = config;

      it("should define a `username` property", () => {
        expect(db.username).to.not.be.undefined;
      });

      it("should define a `password` property", () => {
        expect(db.password).to.not.be.undefined;
      });

      it("should define a `database` property", () => {
        expect(db.database).to.not.be.undefined;
      });

      it("should define a `host` property", () => {
        expect(db.host).to.not.be.undefined;
      });
    });
  });

  if (bail) return;

  // Test that the `config/database` module exists
  // and exports the expected Sequelize configuration properties.

  describe("`config/database` module", () => {
    const database = loadModule("../config/database");

    if (database === null) {
      bail = true;
      return;
    }

    it("should export a `development` property", () => {
      expect(database.development).to.not.be.undefined;
    });

    describe("`development` property object", () => {
      const { development } = database;

      it("should define a `username` property", () => {
        expect(development.username).to.not.be.undefined;
      });

      it("should define a `password` property", () => {
        expect(development.password).to.not.be.undefined;
      });

      it("should define a `database` property", () => {
        expect(development.database).to.not.be.undefined;
      });

      it("should define a `host` property", () => {
        expect(development.host).to.not.be.undefined;
      });

      it("should define a `dialect` property", () => {
        expect(development.dialect).to.not.be.undefined;
      });
    });

    addTestDatabaseConfig(database);
  });

  if (bail) return;

  // Test that the `db/models` module exists
  // and exports the expected properties
  // (i.e. `Sequelize` and `sequelize`).

  describe("`db/models` module", () => {
    const models = loadModule("../db/models");

    if (models === null) {
      bail = true;
      return;
    }

    it("should export a `Sequelize` property", () => {
      expect(models.Sequelize).to.not.be.undefined;
    });

    it("should export a `sequelize` property", () => {
      expect(models.sequelize).to.not.be.undefined;
    });
  });
};

runSpecs();
