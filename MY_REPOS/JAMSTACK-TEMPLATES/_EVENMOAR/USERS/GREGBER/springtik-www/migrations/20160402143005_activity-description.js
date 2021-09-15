exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.string('description', 180).defaultTo('').notNullable();
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('description');
    });
