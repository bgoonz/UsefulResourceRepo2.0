exports.up = knex =>
  knex.schema
    .raw('ALTER TABLE categories ALTER COLUMN description SET DEFAULT \'\'')
    .raw('UPDATE categories SET description=\'\' WHERE description IS NULL')
    .raw('ALTER TABLE categories ALTER COLUMN description SET NOT NULL')
    .raw('ALTER TABLE categories ALTER keywords SET DEFAULT \'[]\'::jsonb ')
    .raw('UPDATE categories SET keywords = \'[]\'::jsonb  WHERE keywords IS NULL')
    .raw('ALTER TABLE categories ALTER keywords SET NOT NULL');

exports.down = knex =>
  knex.schema
    .raw('ALTER TABLE categories ALTER COLUMN description DROP DEFAULT')
    .raw('ALTER TABLE categories ALTER COLUMN description DROP NOT NULL')
    .raw('ALTER TABLE categories ALTER COLUMN keywords DROP DEFAULT')
    .raw('ALTER TABLE categories ALTER COLUMN keywords DROP NOT NULL');
