exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.string('status', 40).defaultTo('review').notNullable();
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('status');
    });
