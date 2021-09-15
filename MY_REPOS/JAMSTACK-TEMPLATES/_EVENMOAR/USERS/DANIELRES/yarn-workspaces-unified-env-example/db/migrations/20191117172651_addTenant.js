const { onUpdateTrigger } = require("./helpers");

exports.up = async knex => {
  return knex.schema
    .createTable("Tenant", t => {
      t.uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      t.string("name").notNullable();
      t.string("shortId")
        .unique()
        .notNullable();
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.timestamp("updatedAt");
      t.index(["shortId"]);
    })
    .then(() => knex.schema.raw(onUpdateTrigger("Tenant")));
};

exports.down = knex => knex.schema.dropTable("Tenant");
