exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.renameColumn('description', 'text');
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.renameColumn('text', 'description');
    });
