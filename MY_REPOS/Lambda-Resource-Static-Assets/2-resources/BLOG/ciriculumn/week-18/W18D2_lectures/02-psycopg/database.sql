drop table if exists pet_owners;
drop table if exists owners;
drop table if exists pets;
drop table if exists pet_types;

create table pet_types (
  id serial primary key,
  type varchar(50) not null unique
);

create table pets (
  id serial primary key,
  name varchar(50) not null,
  pet_type_id integer not null,
  age smallint,
  has_microchip boolean default false,
  foreign key (pet_type_id) references pet_types (id)
);

create table owners (
  id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(255) not null unique
);

create table pet_owners (
  id serial primary key,
  pet_id integer not null,
  owner_id integer not null,
  foreign key (pet_id) references pets (id),
  foreign key (owner_id) references owners (id)
);

insert into pet_types (type)
values
('Bird'),
('Cat'),
('Dog'),
('Elephant'),
('Frog'),
('Jackalope');

insert into pets (name, age, pet_type_id)
values
('Cheeper', 2, 1),
('Chester', 1, 2),
('Kitty', 4, 2),
('Max', 12, 3),
('Tooter', 29, 4),
('Sir Lancelot', 1, 5),
('Mystery', 104, 6);

insert into owners (first_name, last_name, email)
values
('Mark', 'Mark', 'mark@hotmail.com'),
('Elizabeth', 'Missioni', 'liz@outlook.com'),
('Terry', 'O''Cheri', 'tc@yahoo.com');

insert into pet_owners (pet_id, owner_id)
values
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 3),
(5, 3);
