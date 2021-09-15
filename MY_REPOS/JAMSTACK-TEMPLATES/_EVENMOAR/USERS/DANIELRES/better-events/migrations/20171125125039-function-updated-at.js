exports.up = (db) =>
  db.runSql(`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
    $$ language 'plpgsql';
`);

exports.down = (db) => null;

exports._meta = {
  version: 1,
};
