const chai = require('chai');
const fs = require('fs').promises;
const path = require('path');
const { Client, Pool } = require('./db-utils');
const { expect } = chai;

describe('When 01-create-users.sql is run', () => {
  let pool;

  after(async () => {
    pool.end();
  });

  before(async () => {
    pool = new Pool({
      database: 'postgres',
    });
    const sqlPath = path.resolve(__dirname, '..', '01-create-users.sql');
    const sql = await fs.readFile(sqlPath, 'utf8');
    await pool.query(`
      DROP DATABASE IF EXISTS aa_times;
    `);
    await pool.query(`
      DROP DATABASE IF EXISTS project_manager;
    `);
    await pool.query(`
      DROP USER IF EXISTS aa_times;
      DROP USER IF EXISTS project_management_app;
      DROP USER IF EXISTS data_admin;
    `);
    try {
      await pool.query(sql);
    } catch (e) {
      console.error(e);
      if (!e.message.includes('must have either text')) {
        console.error(e);
        expect.fail('Your SQL did not run properly.')
      }
    }
  });

  const checkSuper = 'SELECT rolsuper AS is_super FROM pg_roles WHERE rolname = $1';

  async function testNormalUserExistence(user, password, isSuper) {
    const client = await new Client({
      database: 'postgres',
      user,
      password,
    });
    await client.connect();
    const {rows: [{ is_super }]} = await pool.query(checkSuper, [user]);
    expect(is_super).to.equal(isSuper, `User should ${!isSuper ? 'not ' : ''}be superuser`);
  }

  context('it creates the user', () => {
    it('aa_times with password 6g73WE2V', async () => {
      await testNormalUserExistence('aa_times', '6g73WE2V', false);
    });

    it('project_management_app with password Q3HphPJ8', async () => {
      await testNormalUserExistence('project_management_app', 'Q3HphPJ8', false);
    });

    it('data_admin with password ik2fiDri', async () => {
      await testNormalUserExistence('data_admin', 'ik2fiDri', true);
    });
  });
});
