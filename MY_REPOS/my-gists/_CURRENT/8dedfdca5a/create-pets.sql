create table pets (
  id serial,
  name varchar(255),
  age smallint,
  person_id integer,
  primary key (id),
  foreign key (person_id) references people (id)
);