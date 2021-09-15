const slugify = require('underscore.string/slugify');

exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.string('slug', 255).defaultTo('').notNullable();
    })
    .then(() =>
      knex.select('id', 'name').from('activities').then(activities =>
        Promise.all(
          activities.map(({id, name}) =>
            knex('activities')
              .where('id', id)
              .update({
                slug: slugify(name),
              })
          )
        )
      )
    );

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('slug');
    });
