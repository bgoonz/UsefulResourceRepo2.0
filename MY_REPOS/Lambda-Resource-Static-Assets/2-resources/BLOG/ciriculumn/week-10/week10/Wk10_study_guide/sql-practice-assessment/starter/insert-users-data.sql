-- | full_name              | created_at        |
-- |------------------------|-------------------|
-- | 'Zaphod Beeblebrox'    | CURRENT_TIMESTAMP |
-- | 'Blart Versenwald III' | CURRENT_TIMESTAMP | 

insert into users(full_name,create_at)
values
("Zaphod Beeblebrox", CURRENT_TIMESTAMP)
("Blart Versenwald III", CURRENT_TIMESTAMP)
;