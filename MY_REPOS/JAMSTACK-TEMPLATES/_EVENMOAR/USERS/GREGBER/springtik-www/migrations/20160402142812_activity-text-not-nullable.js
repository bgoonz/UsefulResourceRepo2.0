exports.up = knex =>
  knex.schema
    .raw('ALTER TABLE activities ALTER COLUMN text SET DEFAULT \'\'')
    .raw('UPDATE activities SET text=\'\' WHERE text IS NULL')
    .raw('ALTER TABLE activities ALTER COLUMN text SET NOT NULL');

exports.down = knex =>
  knex.schema
    .raw('ALTER TABLE activities ALTER COLUMN text DROP DEFAULT')
    .raw('ALTER TABLE activities ALTER COLUMN text DROP NOT NULL');
