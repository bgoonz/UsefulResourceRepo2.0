exports.up = knex =>
  knex.schema
    .table('categories', table => {
      table.bigInteger('parentId').nullable().references('categories.id');
    });

exports.down = knex =>
  knex.schema
    .table('categories', table => {
      table.dropColumn('parentId');
    });
