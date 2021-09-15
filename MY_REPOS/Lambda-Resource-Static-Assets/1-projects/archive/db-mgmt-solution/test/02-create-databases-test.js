const chai = require("chai");
const fs = require("fs").promises;
const path = require("path");
const { Pool } = require("./db-utils");
const { expect } = chai;

describe("When 02-create-databases.sql is run", () => {
  let pool;

  after(async () => {
    pool.end();
  });

  before(async () => {
    pool = new Pool({
      database: "postgres",
    });
    const sqlPath = path.resolve(__dirname, "..", "02-create-databases.sql");
    const sql = await fs.readFile(sqlPath, "utf8");
    const sqls = sql.split(";");
    try {
      for (let s of sqls) {
        await pool.query(s);
      }
    } catch (e) {
      console.error(e);
      if (!e.message.includes("must have either text")) {
        console.error(e);
        expect.fail("Your SQL did not run properly.");
      }
    }
  });

  const checkDatabase = `
    SELECT pg_catalog.pg_get_userbyid(datdba) as table_owner
    FROM pg_database
    WHERE datname = $1
  `;

  async function testDatabaseExistsWithOwner(table, owner) {
    const { rows } = await pool.query(checkDatabase, [table]);
    const [{ table_owner }] = rows;
    expect(rows).to.have.length(1);
    expect(table_owner).to.equal(owner);
  }

  context("it creates the database", () => {
    it("aa_times with owner aa_times", async () => {
      await testDatabaseExistsWithOwner("aa_times", "aa_times");
    });
    it("project_manager with owner project_management_app", async () => {
      await testDatabaseExistsWithOwner(
        "project_manager",
        "project_management_app"
      );
    });
  });
});
