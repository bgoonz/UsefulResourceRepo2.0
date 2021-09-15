create table users ( 
    id serial primary key,
    full_name varchar(255) not null,
    created_at TIMESTAMP not null
)
