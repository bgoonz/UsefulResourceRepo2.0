# Common commands

```shell
# login
psql -d database -U  user -W
psql -h host -d database -U user -W
psql -U user -h host "dbname=db sslmode=require"

# list of dbs
\l

# switch db
\c dbname username

# list of tables
\dt

```
