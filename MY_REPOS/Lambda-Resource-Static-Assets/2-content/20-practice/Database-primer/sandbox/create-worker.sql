
create table worker (
     id integer not null,
     created_by varchar(255),
     in_utc timestamp not null,
     last_modified_by varchar(255),
     out_utc timestamp,
     audit_id varchar(255),
     compensation DOUBLE PRECISION not null,
     worker_code varchar(255),
     worker_name varchar(255),
     primary key (id)
);
