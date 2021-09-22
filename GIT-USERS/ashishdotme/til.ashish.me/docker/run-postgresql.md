# Run PostgreSQL

```shell
# Create Docker container with Postgres database:
docker create --name postgres -e POSTGRES_PASSWORD=Welcome -p 5432:5432 postgres:11.5-alpine

# Start container:
docker start postgres

# Stop container:
docker stop postgres

#Connection Info:
JDBC URL: `jdbc:postgresql://localhost:5432/conference_app`
Username: `postgres`
Password: `Welcome`

# Note: This stores the data inside the container - when you delete the container, the data is deleted as well.
# Connect to PSQL prompt from docker:
docker exec -it postgres psql -U postgres

# Setup the Tables:
docker cp create_tables.sql postgres:/create_tables.sql
docker exec -it postgres psql -d studentDB -f create_tables.sql -U postgres

# Install the Data:
docker cp insert_data.sql postgres:/insert_data.sql
docker exec -it postgres psql -d studentDB -f insert_data.sql -U postgres
```
