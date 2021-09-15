exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.string('phoneNumber', 255).defaultTo('').notNullable();
      table.string('website', 255).defaultTo('').notNullable();
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('phoneNumber');
      table.dropColumn('website');
    });
