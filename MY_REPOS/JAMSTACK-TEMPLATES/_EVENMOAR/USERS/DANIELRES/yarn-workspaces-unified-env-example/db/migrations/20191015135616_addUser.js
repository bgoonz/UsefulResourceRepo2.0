const { onUpdateTrigger } = require("./helpers");

exports.up = async knex => {
  return knex.schema
    .createTable("User", t => {
      t.uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      t.string("sub", 255)
        .unique()
        .notNullable();
      t.string("name", 255).notNullable();
      t.string("picture", 255);
      t.string("email", 255)
        .unique()
        .notNullable();
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.timestamp("updatedAt");
      t.index(["sub"]);
    })
    .then(() => knex.schema.raw(onUpdateTrigger("User")));
};

exports.down = knex => knex.schema.dropTable("User");
