exports.up = (knex, Promise) =>
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

exports.down = (knex, Promise) =>
  knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
