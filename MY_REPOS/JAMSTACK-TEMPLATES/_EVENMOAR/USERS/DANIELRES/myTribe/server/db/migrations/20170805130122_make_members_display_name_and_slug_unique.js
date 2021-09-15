exports.up = (knex, Promise) =>
  knex.schema
    .table("members", (table) => table.unique("displayName"))
    .table("members", (table) => table.unique("slug"));

exports.down = (knex, Promise) =>
  knex.schema
    .table("members", (table) => table.dropUnique("displayName"))
    .table("members", (table) => table.dropUnique("slug"));
