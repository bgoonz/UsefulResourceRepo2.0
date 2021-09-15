-- create table merchants (
--     id serial primary key,
--     merchant_name varchar(255) not null,
--     country_id INTEGER foreign key not null,
--     created_at TIMESTAMP not null,
--     admin_id INTEGER foreign key,
--     merchant_type_id INTEGER foreign key,
--     foreign key (merchant_type_id) references merchant_types(id),
--     foreign key (country_id) references countries(id),
--     foreign key (admin_id) references users(id)
-- )

CREATE TABLE merchants (
  id SERIAL PRIMARY KEY Not NULL,
  merchant_name VARCHAR(255) NOT NULL,
  country_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  admin_id INTEGER NOT NULL,
  merchant_type_id INTEGER NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (admin_id) REFERENCES users(id),
  FOREIGN KEY (merchant_type_id) REFERENCES merchant_types(id)
)
