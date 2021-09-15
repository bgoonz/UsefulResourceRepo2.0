const { knex } = require("../index");

const cleanDb = async () => {
  await knex("User").del();
  await knex("Tenant").del();
  await knex("TenantUserRelation").del();
};

const setup = async t => {
  await knex.migrate.rollback({}, true);
  await knex.migrate.latest();
  t.end();
};

const teardown = t => knex.destroy().then(t.end);

const samples = {
  alice: {
    email: "alice@example.com",
    sub: "alice|sub",
    name: "Alice"
  },
  bob: {
    email: "bob@example.com",
    sub: "bob|sub",
    name: "Bob"
  }
};

module.exports = { knex, cleanDb, setup, teardown, samples };
