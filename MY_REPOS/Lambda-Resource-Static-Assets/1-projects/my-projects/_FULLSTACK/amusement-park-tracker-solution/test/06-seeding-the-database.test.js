const { before, describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

const { SequelizeQueryInterfaceFake } = require("./fakes");
const { loadModule } = require("./utils");

const runSpecs = () => {
  let bail = false;
  let seederFilename = null;

  // Test that the seeder file exists.
  describe("`[timestamp]-test-data.js` seeder file", () => {
    const seedersFolderPath = path.join(__dirname, "..", "db", "seeders");
    const exists = fs.existsSync(seedersFolderPath);

    if (!exists) {
      bail = true;
      return;
    }

    // Get the seeder filename so that we can load the module.
    const files = fs.readdirSync(seedersFolderPath);
    seederFilename = files.find((f) => f.endsWith("-test-data.js"));

    it("should exist", () => {
      expect(seederFilename).to.not.be.undefined.and.to.not.be.null;
    });

    if (!seederFilename) {
      bail = true;
    }
  });

  if (bail) return;

  // Get the seeder module name.
  const seederModuleName = seederFilename.slice(
    0,
    seederFilename.lastIndexOf(".")
  );

  // Test that the `db/seeders/*-test-data` module exists.

  let seeder = null;

  describe(`\`${seederModuleName}\` module`, () => {
    seeder = loadModule(`../db/seeders/${seederModuleName}`);

    if (seeder === null) {
      bail = true;
      return;
    }

    // Test that the `db/seeders/*-test-data` module
    // exports an object that defines `up` and `down` properties.

    it("should export an `up` property", () => {
      expect(seeder.up).to.not.be.undefined;
    });

    it("should export a `down` property", () => {
      expect(seeder.down).to.not.be.undefined;
    });

    // Test that the `up` method calls the passed
    // in `queryInterface.bulkInsert()` method
    // with the following arguments:

    // 1) `Parks` - the name of the table to insert into.

    // 2) Array containing one or more object literals
    // that contain all of the `Park` model’s defined properties
    // as well as the Sequelize `createdAt` and `updatedAt` properties
    // (but not `id` property).

    describe("`up` property function should call the passed `queryInterface.bulkInsert()` method with", () => {
      const queryInterface = new SequelizeQueryInterfaceFake();

      before(async () => {
        await seeder.up(queryInterface);
      });

      describe("`tableName` argument", () => {
        it("should be set to the string literal 'Parks'", () => {
          expect(queryInterface.insertTableName).to.equal("Parks");
        });
      });

      describe("`records` argument", () => {
        it("should be set to an array", () => {
          expect(queryInterface.insertRecords).to.be.an("array");
        });

        it("should have at least one element", () => {
          expect(queryInterface.insertRecords.length).to.be.greaterThan(0);
        });

        describe("each array element", () => {
          const hasProperty = (propertyName) =>
            queryInterface.insertRecords.filter((r) =>
              Object.prototype.hasOwnProperty.call(r, propertyName)
            );

          const hasPropertyWithType = (propertyName, type) => {
            return queryInterface.insertRecords.filter((r) => {
              if (Object.prototype.hasOwnProperty.call(r, propertyName)) {
                if (typeof type === "string") {
                  return typeof r[propertyName] === type;
                }
                return r[propertyName] instanceof type;
              }
              return false;
            });
          };

          const getTypeName = (type) => {
            if (typeof type === "string") {
              return type;
            }
            return type.name;
          };

          const expectedProperties = [
            { name: "parkName", type: "string" },
            { name: "city", type: "string" },
            { name: "provinceState", type: "string" },
            { name: "country", type: "string" },
            { name: "opened", type: Date },
            { name: "size", type: "string" },
            { name: "description", type: "string" },
            { name: "createdAt", type: Date },
            { name: "updatedAt", type: Date },
          ];

          expectedProperties.forEach((property) => {
            it(`should have a property named \`${property.name}\``, () => {
              expect(hasProperty(property.name).length).to.equal(
                queryInterface.insertRecords.length
              );
            });

            it(`with the type \`${getTypeName(property.type)}\``, () => {
              expect(
                hasPropertyWithType(property.name, property.type).length
              ).to.equal(queryInterface.insertRecords.length);
            });
          });
        });
      });
    });

    // Test that the `down` method calls the passed
    // in `queryInterface.bulkDelete()` method
    // with the following arguments:

    // 1) `Parks` - the name of the table to delete from.

    describe("`down` property function should call the passed `queryInterface.bulkDelete()` method with", () => {
      const queryInterface = new SequelizeQueryInterfaceFake();

      before(async () => {
        await seeder.down(queryInterface);
      });

      describe("`tableName` argument", () => {
        it("should be set to the string literal 'Parks'", () => {
          expect(queryInterface.deleteTableName).to.equal("Parks");
        });
      });
    });
  });
};

runSpecs();
