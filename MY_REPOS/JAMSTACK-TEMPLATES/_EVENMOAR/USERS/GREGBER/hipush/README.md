# hipush
[![Build Status](https://travis-ci.org/hipush/hipush.svg?branch=master)](https://travis-ci.org/hipush/hipush)
[![Dependency Status](https://david-dm.org/hipush/hipush.svg?theme=shields.io)](https://david-dm.org/hipush/hipush)
[![devDependency Status](https://david-dm.org/hipush/hipush/dev-status.svg?theme=shields.io)](https://david-dm.org/hipush/hipush#info=devDependencies)

Hipush server.

## Run in development

Run environment using `fig up`.

### Database

#### Sync

```
gulp db:sync
```

#### Populate

```
gulp db:populate
```

#### Drop

```
gulp db:drop
```

#### Connect to local database

```
docker run --link hipush_database_1:postgres -ti postgres:9.4.0 sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U hipush'
```

## License

GPL
