const { onUpdateTrigger } = require("./helpers");

exports.up = async knex => {
  return knex.schema
    .createTable("TenantUserRelation", t => {
      t.uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      t.uuid("tenantId").notNullable();
      t.uuid("userId").notNullable();
      t.string("type")
        .notNullable()
        .defaultTo("member");
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.timestamp("updatedAt");
      t.unique(["tenantId", "userId"]);
    })
    .then(() => knex.schema.raw(onUpdateTrigger("TenantUserRelation")));
};

exports.down = knex => knex.schema.dropTable("TenantUserRelation");
