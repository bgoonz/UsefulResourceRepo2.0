exports.up = knex =>
  knex.schema
    .table('categories', table => {
      table.string('description', 180);
    });

exports.down = knex =>
  knex.schema
    .table('categories', table => {
      table.dropColumn('description');
    });
