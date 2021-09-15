
const {
  before,
  beforeEach,
  describe,
  it,
} = require('mocha');
const { expect } = require('chai');

const { addTestDatabaseConfig, loadModule } = require('./utils');

const runSpecs = () => {
  let bail = false;
  let models = null;

  // Test that the `config/database` module exists.

  describe('`config/database` module', () => {
    const database = loadModule('../config/database');

    if (database === null) {
      bail = true;
      return;
    }

    addTestDatabaseConfig(database);
  });

  if (bail) return;

  // Test that the `db/models` module exists.

  describe('`db/models` module', () => {
    models = loadModule('../db/models');

    if (models === null) {
      bail = true;
    }
  });

  if (bail) return;

  // Test that the Park model exists
  // and generates the expected database table.

  describe('`Park` model', () => {
    const { sequelize } = models;

    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });

    const { Park } = models;

    it('should exist', () => {
      expect(Park).to.not.be.undefined;
    });

    if (Park === undefined) {
      bail = true;
      return;
    }

    describe('should create in the database', () => {
      it('a table named `Parks`', async () => {
        const result = await sequelize.query('SELECT * FROM sqlite_master WHERE type = \'table\';');

        expect(result.length).to.be.greaterThan(0);

        const parksTable = result[0].find((table) => table.name === 'Parks');

        expect(parksTable).to.not.be.undefined;
      });

      describe('with the columns', () => {
        const expectedColumns = [
          { name: 'parkName', dataType: 'VARCHAR(255)', nullable: false },
          { name: 'city', dataType: 'VARCHAR(100)', nullable: false },
          { name: 'provinceState', dataType: 'VARCHAR(100)', nullable: false },
          { name: 'country', dataType: 'VARCHAR(100)', nullable: false },
          { name: 'opened', dataType: 'DATE', nullable: false },
          { name: 'size', dataType: 'VARCHAR(100)', nullable: false },
          { name: 'description', dataType: 'TEXT', nullable: false },
        ];

        expectedColumns.forEach((expectedColumn) => {
          describe(expectedColumn.name, () => {
            let column = null;

            before(async () => {
              const result = await sequelize.query('PRAGMA table_info(Parks);');
              column = result[0].find((c) => c.name === expectedColumn.name);
            });

            it('should be defined', () => {
              expect(column).to.not.be.undefined;
            });

            it('should have the correct type', () => {
              expect(column.type).to.be.equal(expectedColumn.dataType);
            });

            it('should have the correct nullability', () => {
              expect(column.notnull).to.equal(expectedColumn.nullable ? 0 : 1);
            });
          });
        });
      });
    });

    it('should persist a record to the database', async () => {
      const park = models.Park.build({
        parkName: 'Disneyland Park',
        city: 'Anaheim',
        provinceState: 'California',
        country: 'USA',
        opened: new Date('1955-07-17'),
        size: '486 acres',
        description: 'Disneyland Park, originally Disneyland, is the first of two theme parks built at the Disneyland Resort in Anaheim, California, opened on July 17, 1955.',
      });

      await park.save();

      expect(park.id).to.equal(1);
    });
  });
};

runSpecs();
