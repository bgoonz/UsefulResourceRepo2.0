exports.up = (db) => db.runSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

exports.down = (db) => db.runSql('DROP EXTENSION IF EXISTS "uuid-ossp";');

exports._meta = {
  version: 1,
};
