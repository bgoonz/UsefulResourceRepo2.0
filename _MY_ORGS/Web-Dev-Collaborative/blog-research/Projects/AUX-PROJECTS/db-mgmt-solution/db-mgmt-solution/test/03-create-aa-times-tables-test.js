const chai = require('chai');
const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('./db-utils');
const { expect } = chai;

describe('When 03-create-aa-times-tables.sql is run', () => {
  let pool;

  after(async () => {
    pool.end();
  });

  before(async () => {
    pool = new Pool({
      database: 'aa_times',
    });
    const sqlPath = path.resolve(__dirname, '..', '03-create-aa-times-tables.sql');
    const sql = await fs.readFile(sqlPath, 'utf8');
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

  const checkTable = `
    SELECT column_name, data_type, character_maximum_length
    FROM INFORMATION_SCHEMA.columns
    WHERE table_name = $1
    ORDER BY column_name;
  `;

  const checkPk = `
    SELECT indexdef
    FROM pg_indexes
    WHERE tablename = $1;
  `;

  async function testTableAndColumns(table, columns) {
    const { rows } = await pool.query(checkTable, [table]);
    const { rows: [{ indexdef }] } = await pool.query(checkPk, [table]);
    expect(rows).to.have.length(columns.length);
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const col = columns[i];
      expect(row).to.eql(col, `expected ${table}.${col.column_name} to have type "${col.data_type}" and length ${col.character_maximum_length}`);
    }
    expect(indexdef).to.contain('(id)');
    expect(indexdef).to.contain('CREATE UNIQUE INDEX');
  }

  const getFks = `
    SELECT pg_catalog.pg_get_constraintdef(r.oid, true) as keydef
    FROM pg_catalog.pg_constraint r
    WHERE r.conrelid = cast($1 as regclass) AND r.contype = 'f' ORDER BY 1;
  `;

  async function testTableAndForeignKeys(table, keys) {
    const { rows } = await pool.query(getFks, [table]);
    expect(rows).to.have.length(keys.length, `${table} does not have ${keys.length} foreign key(s).`);
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const col = keys[i];
      for (let value of Object.values(col)) {
        expect(row.keydef).to.contain(value);
      }
    }
  }

  context('it creates the table', () => {
    it('people with four columns', async () => {
      await testTableAndColumns('people', [
        { column_name: 'email', data_type: 'character varying', character_maximum_length: 100 },
        { column_name: 'first_name', data_type: 'character varying', character_maximum_length: 50 },
        { column_name: 'id', data_type: 'integer', character_maximum_length: null },
        { column_name: 'last_name', data_type: 'character varying', character_maximum_length: 50 },
      ]);
    });

    it('sections with two columns', async () => {
      await testTableAndColumns('sections', [
        { column_name: 'id', data_type: 'integer', character_maximum_length: null },
        { column_name: 'name', data_type: 'character varying', character_maximum_length: 150 },
      ]);
    });

    it('stories with four columns', async () => {
      await testTableAndColumns('stories', [
        { column_name: 'author_id', data_type: 'integer', character_maximum_length: null },
        { column_name: 'content', data_type: 'text', character_maximum_length: null },
        { column_name: 'id', data_type: 'integer', character_maximum_length: null },
        { column_name: 'section_id', data_type: 'integer', character_maximum_length: null },
      ]);

      await testTableAndForeignKeys('stories', [
        { source: 'author_id', table: 'people', column: 'id' },
        { source: 'section_id', table: 'sections', column: 'id' },
      ]);
    });
  });
});
