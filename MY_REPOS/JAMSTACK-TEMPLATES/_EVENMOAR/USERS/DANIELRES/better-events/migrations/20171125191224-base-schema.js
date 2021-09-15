exports.up = (db) =>
  db.runSql(`
    -- User

    CREATE TABLE "user" (
      id uuid primary key default uuid_generate_v4(),
      dname varchar not null,
      created_at timestamp default now(),
      updated_at timestamp
    );

    CREATE TRIGGER update_user_updated_at
      BEFORE UPDATE ON "user"
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at();


    -- Discussion

    CREATE TABLE discusion (
      id uuid primary key default uuid_generate_v4(),
      label varchahr not null,
      created_at timestamp default now(),
      updated_at timestamp
    );

    CREATE TRIGGER update_discusion_updated_at
      BEFORE UPDATE ON message
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at();


    -- Message

    CREATE TABLE message (
      id uuid primary key default uuid_generate_v4(),
      author_id uuid not null references "user"(id),
      discussion_id uuid not null references "user"(id),
      body text not null,
      created_at timestamp default now(),
      updated_at timestamp
    );

    CREATE TRIGGER update_message_updated_at
      BEFORE UPDATE ON message
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
`);

exports.down = (db) =>
  db.runSql(`
    DROP TABLE message;
    DROP TABLE discussion;
    DROP TABLE "user";
`);

exports._meta = {
  version: 1,
};
