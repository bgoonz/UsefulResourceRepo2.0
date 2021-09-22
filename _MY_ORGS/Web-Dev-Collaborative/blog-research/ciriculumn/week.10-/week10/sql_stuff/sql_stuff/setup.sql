CREATE TABLE users (
  id serial primary key,
  username varchar(50) not null,
  email varchar(100) not null,
  state_abbr varchar(2)
);

CREATE TABLE posts (
  id serial primary key,
  body text not null,
  user_id integer references users(id)
);

CREATE TABLE likes (
  id serial primary key,
  user_id integer references users (id),
  post_id integer references posts (id)
);



