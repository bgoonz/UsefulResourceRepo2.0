exports.up = (knex, Promise) =>
  knex.schema
    .table("events", (table) => table.renameColumn("uuid", "id"))
    .table("members", (table) => table.renameColumn("uuid", "id"));

exports.down = (knex, Promise) =>
  knex.schema
    .table("events", (table) => table.renameColumn("id", "uuid"))
    .table("members", (table) => table.renameColumn("id", "uuid"));
