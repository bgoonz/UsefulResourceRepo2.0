exports.up = knex =>
  knex.schema
    .table('categories', table => {
      table.jsonb('keywords');
    });

exports.down = knex =>
  knex.schema
    .table('categories', table => {
      table.dropColumn('keywords');
    });
