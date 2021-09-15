## Installation

Knex can be used as an SQL query builder in both Node.JS and the browser, limited to WebSQL's constraints (like the inability to drop tables or read schemas). Composing SQL queries in the browser for execution on the server is highly discouraged, as this can be the cause of serious security vulnerabilities. The browser builds outside of WebSQL are primarily for learning purposes - for example, you can pop open the console and build queries on this page using the knex object.

### Node.js

The primary target environment for Knex is Node.js, you will need to install the `knex` library, and then install the appropriate database library: [`pg`](https://github.com/brianc/node-postgres) for PostgreSQL and Amazon Redshift, [`mysql`](https://github.com/felixge/node-mysql) for MySQL or MariaDB, [`sqlite3`](https://github.com/mapbox/node-sqlite3) for SQLite3, or [`tedious`](https://github.com/tediousjs/tedious) for MSSQL.

```sh
$ npm install knex --save

# Then add one of the following (adding a --save) flag:
$ npm install pg
$ npm install sqlite3
$ npm install mysql
$ npm install mysql2
$ npm install oracledb
$ npm install tedious
```

_If you want to use a MariaDB instance, you can use the `mysql` driver._

### Browser

Knex can be built using a JavaScript build tool such as [browserify](http://browserify.org/) or [webpack](https://github.com/webpack/webpack). In fact, this documentation uses a webpack build which [includes knex](https://github.com/knex/documentation/blob/a4de1b2eb50d6699f126be8d134f3d1acc4fc69d/components/Container.jsx#L3). View source on this page to see the browser build in-action (the global `knex` variable).

### Initializing the Library

The `knex` module is itself a function which takes a configuration object for Knex, accepting a few parameters. The `client` parameter is required and determines which client adapter will be used with the library.

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
```

The connection options are passed directly to the appropriate database client to create the connection, and may be either an object, a connection string, or a function returning an object:

Note: Knex's PostgreSQL client allows you to set the initial search path for each connection automatically using an additional option "searchPath" as shown below.

```js
const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
```

Note: When you use the SQLite3 adapter, there is a filename required, not a network connection. For example:

```js
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  }
});
```

Note: When you use the SQLite3 adapter, you can set flags used to open the connection. For example:

```js
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "file:memDb1?mode=memory&cache=shared"
    flags: ['OPEN_URI', 'OPEN_SHAREDCACHE']
  }
});
```

Note: The database version can be added in knex configuration, when you use the PostgreSQL adapter to connect a non-standard database.

```js
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
```

```js
const knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
```

A function can be used to determine the connection configuration dynamically. This function receives no parameters, and returns either a configuration object or a promise for a configuration object.

```js
const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME
  })
});
```

By default, the configuration object received via a function is cached and reused for all connections. To change this behavior, an `expirationChecker` function can be returned as part of the configuration object. The `expirationChecker` is consulted before trying to create new connections, and in case it returns `true`, a new configuration object is retrieved. For example, to work with an authentication token that has a limited lifespan:

```js
const knex = require('knex')({
  client: 'postgres',
  connection: async () => {
    const { token, tokenExpiration } = await someCallToGetTheToken();
    return {
      host : 'your_host',
      user : 'your_database_user',
      password : token,
      database : 'myapp_test',
      expirationChecker: () => {
        return tokenExpiration <= Date.now();
      }
    };
  }
});
```

You can also connect via an unix domain socket, which will ignore host and port.

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    socketPath : '/path/to/socket.sock',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
```

`userParams` is an optional parameter that allows you to pass arbitrary parameters which will be accessible via `knex.userParams` property:

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  userParams: {
    userParam1: '451'
  }
});
```

Initializing the library should normally only ever happen once in your application, as it creates a connection pool for the current database, you should use the instance returned from the initialize call throughout your library.

Specify the client for the particular flavour of SQL you are interested in.

```js
const pg = require('knex')({client: 'pg'});
knex('table').insert({a: 'b'}).returning('*').toString();


pg('table').insert({a: 'b'}).returning('*').toString();
```

### Getting parametrized instance

You can call method `withUserParams` on a Knex instance if you want to get a copy (with same connections) with custom parameters (e. g. to execute same migrations with different parameters)

```js
const knex = require('knex')({
  
});

const knexWithParams = knex.withUserParams({customUserParam: 'table1'});
const customUserParam = knexWithParams.userParams.customUserParam;
```

### Debugging

Passing a `debug: true` flag on your initialization object will turn on [debugging](https://knexjs.org/#Builder-debug) for all queries.

### asyncStackTraces

Passing an `asyncStackTraces: true` flag on your initialization object will turn on stack trace capture for all query builders, raw queries and schema builders. When a DB driver returns an error, this previously captured stack trace is thrown instead of a new one. This helps to mitigate default behaviour of `await` in node.js/V8 which blows the stack away. This has small performance overhead, so it is advised to use only for development. Turned off by default.

### Pooling

The client created by the configuration initializes a connection pool, using the [tarn.js](https://github.com/vincit/tarn.js) library. This connection pool has a default setting of a `min: 2, max: 10` for the MySQL and PG libraries, and a single connection for sqlite3 (due to issues with utilizing multiple connections on a single file). To change the config settings for the pool, pass a `pool` option as one of the keys in the initialize block.

Checkout the [tarn.js](https://github.com/vincit/tarn.js) library for more information.

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  pool: { min: 0, max: 7 }
});
```

If you ever need to explicitly teardown the connection pool, you may use `knex.destroy([callback])`. You may use `knex.destroy` by passing a callback, or by chaining as a promise, just not both. To manually initialize a destroyed connection pool, you may use knex.initialize(\[config\]), if no config is passed, it will use the first knex configuration used.

### afterCreate

`afterCreate` callback (rawDriverConnection, done) is called when the pool aquires a new connection from the database server. done(err, connection) callback must be called for `knex` to be able to decide if the connection is ok or if it should be discarded right away from the pool.

```js
const knex = require('knex')({
  client: 'pg',
  connection: {...},
  pool: {
    afterCreate: function (conn, done) {
      
      conn.query('SET timezone="UTC";', function (err) {
        if (err) {
          
          done(err, conn);
        } else {
          
          conn.query('SELECT set_limit(0.01);', function (err) {
            
            
            done(err, conn);
          });
        }
      });
    }
  }
});
```

### acquireConnectionTimeout

`acquireConnectionTimeout` defaults to 60000ms and is used to determine how long knex should wait before throwing a timeout error when acquiring a connection is not possible. The most common cause for this is using up all the pool for transaction connections and then attempting to run queries outside of transactions while the pool is still full. The error thrown will provide information on the query the connection was for to simplify the job of locating the culprit.

```js
const knex = require('knex')({
  client: 'pg',
  connection: {...},
  pool: {...},
  acquireConnectionTimeout: 10000
});
```

### fetchAsString

Utilized by Oracledb. An array of types. The valid types are 'DATE', 'NUMBER' and 'CLOB'. When any column having one of the specified types is queried, the column data is returned as a string instead of the default representation.

```js
const knex = require('knex')({
  client: 'oracledb',
  connection: {...},
  fetchAsString: [ 'number', 'clob' ]
});
```

### Migrations

For convenience, the any migration configuration may be specified when initializing the library. Read the [Migrations](https://knexjs.org/#Migrations) section for more information and a full list of configuration options.

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  migrations: {
    tableName: 'migrations'
  }
});
```

### postProcessResponse

Hook for modifying returned rows, before passing them forward to user. One can do for example snake\_case -> camelCase conversion for returned columns with this hook. The `queryContext` is only available if configured for a query builder instance via [queryContext](https://knexjs.org/#Builder-queryContext).

```js
const knex = require('knex')({
  client: 'mysql',
  
  postProcessResponse: (result, queryContext) => {
    
    if (Array.isArray(result)) {
      return result.map(row => convertToCamel(row));
    } else {
      return convertToCamel(result);
    }
  }
});
```

### wrapIdentifier

Knex supports transforming identifier names automatically to quoted versions for each dialect. For example `'Table.columnName as foo'` for PostgreSQL is converted to "Table"."columnName" as "foo".

With `wrapIdentifier` one may override the way how identifiers are transformed. It can be used to override default functionality and for example to help doing `camelCase` -> `snake_case` conversion.

Conversion function `wrapIdentifier(value, dialectImpl, context): string` gets each part of the identifier as a single `value`, the original conversion function from the dialect implementation and the `queryContext`, which is only available if configured for a query builder instance via [builder.queryContext](https://knexjs.org/#Builder-queryContext), and for schema builder instances via [schema.queryContext](https://knexjs.org/#Schema-queryContext) or [table.queryContext](https://knexjs.org/#Schema-table-queryContext). For example, with the query builder, `knex('table').withSchema('foo').select('table.field as otherName').where('id', 1)` will call `wrapIdentifier` converter for following values `'table'`, `'foo'`, `'table'`, `'field'`, `'otherName'` and `'id'`.

```js
const knex = require('knex')({
  client: 'mysql',
  
  wrapIdentifier: (value, origImpl, queryContext) => origImpl(convertToSnakeCase(value))
});
```

### log

Knex contains some internal log functions for printing warnings, errors, deprecations, and debug information when applicable. These log functions typically log to the console, but can be overwritten using the log option and providing alternative functions. Different log functions can be used for separate knex instances.

```js
const knex = require('knex')({
   log: {
    warn(message) {
    },
    error(message) {
    },
    deprecate(message) {
    },
    debug(message) {
    },
  }
});
```

## Knex Query Builder

The heart of the library, the knex query builder is the interface used for building and executing standard SQL queries, such as `select`, `insert`, `update`, `delete`.

### Identifier Syntax

In many places in APIs identifiers like table name or column name can be passed to methods.

Most commonly one needs just plain `tableName.columnName`, `tableName` or `columnName`, but in many cases one also needs to pass an alias how that identifier is referred later on in the query.

There are two ways to declare an alias for identifier. One can directly give `as aliasName` suffix for the identifier (e.g. `identifierName as aliasName`) or one can pass an object `{ aliasName: 'identifierName' }`.

If the object has multiple aliases `{ alias1: 'identifier1', alias2: 'identifier2' }`, then all the aliased identifiers are expanded to comma separated list.

NOTE: identifier syntax has no place for selecting schema, so if you are doing `schemaName.tableName`, query might be rendered wrong. Use `.withSchema('schemaName')` instead.

```js
knex({ a: 'table', b: 'table' })
  .select({
    aTitle: 'a.title',
    bTitle: 'b.title'
  })
  .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])
```

**knex**

—

`knex(tableName, options={only: boolean}) / knex.[methodName]`

The query builder starts off either by specifying a tableName you wish to query against, or by calling any method directly on the knex object. This kicks off a jQuery-like chain, with which you can call additional query builder methods as needed to construct the query, eventually calling any of the interface methods, to either convert toString, or execute the query with a promise, callback, or stream. Optional second argument for passing options:\* **only**: if `true`, the ONLY keyword is used before the `tableName` to discard inheriting tables' data. **NOTE:** only supported in PostgreSQL for now.

### Usage with TypeScript

If using TypeScript, you can pass the type of database row as a type parameter to get better autocompletion support down the chain.

```js
interface User {
  id: number;
  name: string;
  age: number;
}

knex('users')
  .where('id')
  .first(); 

knex<User>('users') 
  .where('id', 1) 
  .first(); 
```

It is also possible to take advantage of auto-completion support (in TypeScript-aware IDEs) with generic type params when writing code in plain JavaScript through JSDoc comments.

```js

const Users = () => knex('Users')

Users().where('id', 1) 
```

### Caveat with type inference and mutable fluent APIs

Most of the knex APIs mutate current object and return it. This pattern does not work well with type-inference.

```js
knex<User>('users')
  .select('id')
  .then((users) => { 
    
  });

knex<User>('users')
  .select('id')
  .select('age')
  .then((users) => { 
    
  });


const usersQueryBuilder = knex<User>('users').select('id');

if (someCondition) {
  
  
  usersQueryBuilder.select('age');
}
usersQueryBuilder.then((users) => {
  
  
});


const queryBuilder = knex<User, Pick<User, "id" | "age">>('users');





queryBuilder.select('name').then((users) => {
  
})
```

If you don't want to manually specify the result type, it is recommended to always use the type of last value of the chain and assign result of any future chain continuation to a separate variable (which will have a different type).

**timeout**

—

`.timeout(ms, options={cancel: boolean})`

Sets a timeout for the query and will throw a TimeoutError if the timeout is exceeded. The error contains information about the query, bindings, and the timeout that was set. Useful for complex queries that you want to make sure are not taking too long to execute. Optional second argument for passing options:\* **cancel**: if `true`, cancel query if timeout is reached. **NOTE:** only supported in MySQL and PostgreSQL for now.

```js
knex.select().from('books').timeout(1000)
```

```js
knex.select().from('books').timeout(1000, {cancel: true}) 
```

**select**

—

`.select([*columns])`

Creates a select query, taking an optional array of columns for the query, eventually defaulting to \* if none are specified when the query is built. The response of a select call will resolve with an array of objects selected from the database.

```js
knex.select('title', 'author', 'year').from('books')
```

```js
knex.select().table('books')
```

### Usage with TypeScript

We are generally able to infer the result type based on the columns being selected as long as the select arguments match exactly the key names in record type. However, aliasing and scoping can get in the way of inference.

```js
knex.select('id').from<User>('users'); 

knex.select('users.id').from<User>('users'); 




knex.select(knex.ref('id').withSchema('users')).from<User>('users'); 

knex.select('id as identifier').from<User>('users'); 


knex.select(knex.ref('id').as('identifier')).from<User>('users'); 
```

**as**

—

`.as(name)`

Allows for aliasing a subquery, taking the string you wish to name the current query. If the query is not a sub-query, it will be ignored.

```js
knex.avg('sum_column1').from(function() {
  this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
}).as('ignored_alias')
```

**column**

—

`.column(columns)`

Specifically set the columns to be selected on a select query, taking an array, an object or a list of column names. Passing an object will automatically alias the columns with the given keys.

```js
knex.column('title', 'author', 'year').select().from('books')
```

```js
knex.column(['title', 'author', 'year']).select().from('books')
```

```js
knex.column('title', {by: 'author'}, 'year').select().from('books')
```

**from**

—

`.from([tableName], options={only: boolean})`

Specifies the table used in the current query, replacing the current table name if one has already been specified. This is typically used in the sub-queries performed in the advanced where or union methods. Optional second argument for passing options:\* **only**: if `true`, the ONLY keyword is used before the `tableName` to discard inheriting tables' data. **NOTE:** only supported in PostgreSQL for now.

```js
knex.select('*').from('users')
```

### Usage with TypeScript

We can specify the type of database row through the TRecord type parameter

```js
knex.select('id').from('users'); 

knex.select('id').from<User>('users'); 
```

**with**

—

`.with(alias, function|raw)`

Add a "with" clause to the query. "With" clauses are supported by PostgreSQL, Oracle, SQLite3 and MSSQL.

```js
knex.with('with_alias', knex.raw('select * from "books" where "author" = ?', 'Test')).select('*').from('with_alias')
```

```js
knex.with('with_alias', (qb) => {
  qb.select('*').from('books').where('author', 'Test')
}).select('*').from('with_alias')
```

**withRecursive**

—

`.withRecursive(alias, function|raw)`

Indentical to the `with` method except "recursive" is appended to "with" to make self-referential CTEs possible.

```js
knex.withRecursive('ancestors', (qb) => {
  qb.select('*').from('people').where('people.id', 1).union((qb) => {
    qb.select('*').from('people').join('ancestors', 'ancestors.parentId', 'people.id')
  })
}).select('*').from('ancestors')
```

**withSchema**

—

`.withSchema([schemaName])`

Specifies the schema to be used as prefix of table name.

```js
knex.withSchema('public').select('*').from('users')
```

### Where Clauses

Several methods exist to assist in dynamic where clauses. In many places functions may be used in place of values, constructing subqueries. In most places existing knex queries may be used to compose sub-queries, etc. Take a look at a few of the examples for each method for instruction on use:

**Important:** Supplying knex with an `undefined` value to any of the `where` functions will cause knex to throw an error during sql compilation. This is both for yours and our sake. Knex cannot know what to do with undefined values in a where clause, and generally it would be a programmatic error to supply one to begin with. The error will throw a message containing the type of query and the compiled query-string. Example:

```js
knex('accounts')
  .where('login', undefined)
  .select()
  .toSQL()
```

Object Syntax:

```js
knex('users').where({
  first_name: 'Test',
  last_name:  'User'
}).select('id')
```

Key, Value:

```js
knex('users').where('id', 1)
```

Functions:

```js
knex('users')
.where((builder) =>
  builder.whereIn('id', [1, 11, 15]).whereNotIn('id', [17, 19])
)
.andWhere(function() {
  this.where('id', '>', 10)
})
```

Grouped Chain:

```js
knex('users').where(function() {
  this.where('id', 1).orWhere('id', '>', 10)
}).orWhere({name: 'Tester'})
```

Operator:

```js
knex('users').where('columnName', 'like', '%rowlikeme%')
```

The above query demonstrates the common use case of returning all users for which a specific pattern appears within a designated column.

```js
knex('users').where('votes', '>', 100)
```

```js
const subquery = knex('users').where('votes', '>', 100).andWhere('status', 'active').orWhere('name', 'John').select('id');

knex('accounts').where('id', 'in', subquery)
```

.orWhere with an object automatically wraps the statement and creates an `or (and - and - and)` clause

```js
knex('users').where('id', 1).orWhere({votes: 100, user: 'knex'})
```

**whereNot**

—

`.whereNot(~mixed~)`

Object Syntax:

```js
knex('users').whereNot({
  first_name: 'Test',
  last_name:  'User'
}).select('id')
```

Key, Value:

```js
knex('users').whereNot('id', 1)
```

Grouped Chain:

```js
knex('users').whereNot(function() {
  this.where('id', 1).orWhereNot('id', '>', 10)
}).orWhereNot({name: 'Tester'})
```

Operator:

```js
knex('users').whereNot('votes', '>', 100)
```

CAVEAT: WhereNot is not suitable for "in" and "between" type subqueries. You should use "not in" and "not between" instead.

```js
const subquery = knex('users')
  .whereNot('votes', '>', 100)
  .andWhere('status', 'active')
  .orWhere('name', 'John')
  .select('id');

knex('accounts').where('id', 'not in', subquery)
```

**whereIn**

—

`.whereIn(column|columns, array|callback|builder) / .orWhereIn`

Shorthand for .where('id', 'in', obj), the .whereIn and .orWhereIn methods add a "where in" clause to the query. Note that passing empty array as the value results in a query that never returns any rows (`WHERE 1 = 0`)

```js
knex.select('name').from('users')
  .whereIn('id', [1, 2, 3])
  .orWhereIn('id', [4, 5, 6])
```

```js
knex.select('name').from('users')
  .whereIn('account_id', function() {
    this.select('id').from('accounts');
  })
```

```js
const subquery = knex.select('id').from('accounts');

knex.select('name').from('users')
  .whereIn('account_id', subquery)
```

```js
knex.select('name').from('users')
  .whereIn(['account_id', 'email'], [[3, 'test3@example.com'], [4, 'test4@example.com']])
```

```js
knex.select('name').from('users')
  .whereIn(['account_id', 'email'], knex.select('id', 'email').from('accounts'))
```

**whereNotIn**

—

`.whereNotIn(column, array|callback|builder) / .orWhereNotIn`

```js
knex('users').whereNotIn('id', [1, 2, 3])
```

```js
knex('users').where('name', 'like', '%Test%').orWhereNotIn('id', [1, 2, 3])
```

**whereNull**

—

`.whereNull(column) / .orWhereNull`

```js
knex('users').whereNull('updated_at')
```

**whereNotNull**

—

`.whereNotNull(column) / .orWhereNotNull`

```js
knex('users').whereNotNull('created_at')
```

**whereExists**

—

`.whereExists(builder | callback) / .orWhereExists`

```js
knex('users').whereExists(function() {
  this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
})
```

```js
knex('users').whereExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))
```

**whereNotExists**

—

`.whereNotExists(builder | callback) / .orWhereNotExists`

```js
knex('users').whereNotExists(function() {
  this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
})
```

```js
knex('users').whereNotExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))
```

**whereBetween**

—

`.whereBetween(column, range) / .orWhereBetween`

```js
knex('users').whereBetween('votes', [1, 100])
```

**whereNotBetween**

—

`.whereNotBetween(column, range) / .orWhereNotBetween`

```js
knex('users').whereNotBetween('votes', [1, 100])
```

**whereRaw**

—

`.whereRaw(query, [bindings])`

Convenience helper for .where(knex.raw(query)).

```js
knex('users').whereRaw('id = ?', [1])
```

### Join Methods

Several methods are provided which assist in building joins.

**join**

—

`.join(table, first, [operator], second)`

The join builder can be used to specify joins between tables, with the first argument being the joining table, the next three arguments being the first join column, the join operator and the second join column, respectively.

```js
knex('users')
  .join('contacts', 'users.id', '=', 'contacts.user_id')
  .select('users.id', 'contacts.phone')
```

```js
knex('users')
  .join('contacts', 'users.id', 'contacts.user_id')
  .select('users.id', 'contacts.phone')
```

For grouped joins, specify a function as the second argument for the join query, and use `on` with `orOn` or `andOn` to create joins that are grouped with parentheses.

```js
knex.select('*').from('users').join('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

For nested join statements, specify a function as first argument of `on`, `orOn` or `andOn`

```js
knex.select('*').from('users').join('accounts', function() {
  this.on(function() {
    this.on('accounts.id', '=', 'users.account_id')
    this.orOn('accounts.owner_id', '=', 'users.id')
  })
})
```

It is also possible to use an object to represent the join syntax.

```js
knex.select('*').from('users').join('accounts', {'accounts.id': 'users.account_id'})
```

If you need to use a literal value (string, number, or boolean) in a join instead of a column, use `knex.raw`.

```js
knex.select('*').from('users').join('accounts', 'accounts.type', knex.raw('?', ['admin']))
```

**innerJoin**

—

`.innerJoin(table, ~mixed~)`

```js
knex.from('users').innerJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.table('users').innerJoin('accounts', 'users.id', '=', 'accounts.user_id')
```

```js
knex('users').innerJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**leftJoin**

—

`.leftJoin(table, ~mixed~)`

```js
knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').leftJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**leftOuterJoin**

—

`.leftOuterJoin(table, ~mixed~)`

```js
knex.select('*').from('users').leftOuterJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').leftOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**rightJoin**

—

`.rightJoin(table, ~mixed~)`

```js
knex.select('*').from('users').rightJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').rightJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**rightOuterJoin**

—

`.rightOuterJoin(table, ~mixed~)`

```js
knex.select('*').from('users').rightOuterJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').rightOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**fullOuterJoin**

—

`.fullOuterJoin(table, ~mixed~)`

```js
knex.select('*').from('users').fullOuterJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').fullOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**crossJoin**

—

`.crossJoin(table, ~mixed~)`

Cross join conditions are only supported in MySQL and SQLite3. For join conditions rather use innerJoin.

```js
knex.select('*').from('users').crossJoin('accounts')
```

```js
knex.select('*').from('users').crossJoin('accounts', 'users.id', 'accounts.user_id')
```

```js
knex.select('*').from('users').crossJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
```

**joinRaw**

—

`.joinRaw(sql, [bindings])`

```js
knex.select('*').from('accounts').joinRaw('natural full join table1').where('id', 1)
```

```js
knex.select('*').from('accounts').join(knex.raw('natural full join table1')).where('id', 1)
```

### OnClauses

**onIn**

—

`.onIn(column, values)`

Adds a onIn clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onIn('contacts.id', [7, 15, 23, 41])
})
```

**onNotIn**

—

`.onNotIn(column, values)`

Adds a onNotIn clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onNotIn('contacts.id', [7, 15, 23, 41])
})
```

**onNull**

—

`.onNull(column)`

Adds a onNull clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onNull('contacts.email')
})
```

**onNotNull**

—

`.onNotNull(column)`

Adds a onNotNull clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onNotNull('contacts.email')
})
```

**onExists**

—

`.onExists(builder | callback)`

Adds a onExists clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onExists(function() {
    this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
  })
})
```

**onNotExists**

—

`.onNotExists(builder | callback)`

Adds a onNotExists clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onNotExists(function() {
    this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
  })
})
```

**onBetween**

—

`.onBetween(column, range)`

Adds a onBetween clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onBetween('contacts.id', [5, 30])
})
```

**onNotBetween**

—

`.onNotBetween(column, range)`

Adds a onNotBetween clause to the query.

```js
knex.select('*').from('users').join('contacts', function() {
  this.on('users.id', '=', 'contacts.id').onNotBetween('contacts.id', [5, 30])
})
```

### ClearClauses

**clear**

—

`.clear(statement)`

Clears the specified operator from the query. Avalilables: 'select' alias 'columns', 'with', 'select', 'columns', 'where', 'union', 'join', 'group', 'order', 'having', 'limit', 'offset', 'counter', 'counters'. Counter(s) alias for method .clearCounter()

```js
knex.select('email', 'name').from('users').where('id', '<', 10).clear('select').clear('where')
```

**clearSelect**

—

`.clearSelect()`

Deprecated, use clear('select'). Clears all select clauses from the query, excluding subqueries.

```js
knex.select('email', 'name').from('users').clearSelect()
```

**clearWhere**

—

`.clearWhere()`

Deprecated, use clear('where'). Clears all where clauses from the query, excluding subqueries.

```js
knex.select('email', 'name').from('users').where('id', 1).clearWhere()
```

**clearGroup**

—

`.clearGroup()`

Deprecated, use clear('group'). Clears all group clauses from the query, excluding subqueries.

```js
knex.select().from('users').groupBy('id').clearGroup()
```

**clearOrder**

—

`.clearOrder()`

Deprecated, use clear('order'). Clears all order clauses from the query, excluding subqueries.

```js
knex.select().from('users').orderBy('name', 'desc').clearOrder()
```

**clearHaving**

—

`.clearHaving()`

Deprecated, use clear('having'). Clears all having clauses from the query, excluding subqueries.

```js
knex.select().from('users').having('id', '>', 5).clearHaving()
```

**clearCounters**

—

`.clearCounters()`

Clears all increments/decrements clauses from the query.

```js
knex('accounts')
  .where('id', '=', 1)
  .update({ email: 'foo@bar.com' })
  .decrement({
    balance: 50,
  })
  .clearCounters()
```

**distinct**

—

`.distinct([*columns])`

Sets a distinct clause on the query. If the parameter is falsy or empty array, method falls back to '\*'.

```

knex('customers')
  .distinct('first_name', 'last_name')
```

```

knex('customers')
 .distinct()
```

**distinctOn**

—

`.distinctOn([*columns])`

PostgreSQL only. Adds a distinctOn clause to the query.

```js
knex('users').distinctOn('age')
```

**groupBy**

—

`.groupBy(*names)`

Adds a group by clause to the query.

```js
knex('users').groupBy('count')
```

**groupByRaw**

—

`.groupByRaw(sql)`

Adds a raw group by clause to the query.

```js
knex.select('year', knex.raw('SUM(profit)')).from('sales').groupByRaw('year WITH ROLLUP')
```

**orderBy**

—

`.orderBy(column|columns, [direction])`

Adds an order by clause to the query. column can be string, or list mixed with string and object.

Single Column:

```js
knex('users').orderBy('email')
```

```js
knex('users').orderBy('name', 'desc')
```

Multiple Columns:

```js
knex('users').orderBy(['email', { column: 'age', order: 'desc' }])
```

```js
knex('users').orderBy([{ column: 'email' }, { column: 'age', order: 'desc' }])
```

**orderByRaw**

—

`.orderByRaw(sql)`

Adds an order by raw clause to the query.

```js
knex.select('*').from('table').orderByRaw('col DESC NULLS LAST')
```

### Having Clauses

**having**

—

`.having(column, operator, value)`

Adds a having clause to the query.

```js
knex('users')
  .groupBy('count')
  .orderBy('name', 'desc')
  .having('count', '>', 100)
```

**havingIn**

—

`.havingIn(column, values)`

Adds a havingIn clause to the query.

```js
knex.select('*').from('users').havingIn('id', [5, 3, 10, 17])
```

**havingNotIn**

—

`.havingNotIn(column, values)`

Adds a havingNotIn clause to the query.

```js
knex.select('*').from('users').havingNotIn('id', [5, 3, 10, 17])
```

**havingNull**

—

`.havingNull(column)`

Adds a havingNull clause to the query.

```js
knex.select('*').from('users').havingNull('email')
```

**havingNotNull**

—

`.havingNotNull(column)`

Adds a havingNotNull clause to the query.

```js
knex.select('*').from('users').havingNotNull('email')
```

**havingExists**

—

`.havingExists(builder | callback)`

Adds a havingExists clause to the query.

```js
knex.select('*').from('users').havingExists(function() {
  this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
})
```

**havingNotExists**

—

`.havingNotExists(builder | callback)`

Adds a havingNotExists clause to the query.

```js
knex.select('*').from('users').havingNotExists(function() {
  this.select('*').from('accounts').whereRaw('users.account_id = accounts.id');
})
```

**havingBetween**

—

`.havingBetween(column, range)`

Adds a havingBetween clause to the query.

```js
knex.select('*').from('users').havingBetween('id', [5, 10])
```

**havingNotBetween**

—

`.havingNotBetween(column, range)`

Adds a havingNotBetween clause to the query.

```js
knex.select('*').from('users').havingNotBetween('id', [5, 10])
```

**havingRaw**

—

`.havingRaw(column, operator, value)`

Adds a havingRaw clause to the query.

```js
knex('users')
  .groupBy('count')
  .orderBy('name', 'desc')
  .havingRaw('count > ?', [100])
```

**offset**

—

`.offset(value)`

Adds an offset clause to the query.

```js
knex.select('*').from('users').offset(10)
```

**limit**

—

`.limit(value)`

Adds a limit clause to the query.

```js
knex.select('*').from('users').limit(10).offset(30)
```

**union**

—

`.union([*queries], [wrap])`

Creates a union query, taking an array or a list of callbacks, builders, or raw statements to build the union statement, with optional boolean wrap. If the `wrap` parameter is `true`, the queries will be individually wrapped in parentheses.

```js
knex.select('*').from('users').whereNull('last_name').union(function() {
  this.select('*').from('users').whereNull('first_name')
})
```

```js
knex.select('*').from('users').whereNull('last_name').union([
  knex.select('*').from('users').whereNull('first_name')
])
```

```js
knex.select('*').from('users').whereNull('last_name').union(
  knex.raw('select * from users where first_name is null'),
  knex.raw('select * from users where email is null')
)
```

**unionAll**

—

`.unionAll([*queries], [wrap])`

Creates a union all query, with the same method signature as the union method. If the `wrap` parameter is `true`, the queries will be individually wrapped in parentheses.

```js
knex.select('*').from('users').whereNull('last_name').unionAll(function() {
  this.select('*').from('users').whereNull('first_name');
})
```

```js
knex.select('*').from('users').whereNull('last_name').unionAll([
  knex.select('*').from('users').whereNull('first_name')
])
```

```js
knex.select('*').from('users').whereNull('last_name').unionAll(
  knex.raw('select * from users where first_name is null'),
  knex.raw('select * from users where email is null')
)
```

**intersect**

—

`.intersect([*queries], [wrap])`

Creates an intersect query, taking an array or a list of callbacks, builders, or raw statements to build the intersect statement, with optional boolean wrap. If the `wrap` parameter is `true`, the queries will be individually wrapped in parentheses. The intersect method is unsupported on MySQL.

```js
knex.select('*').from('users').whereNull('last_name').intersect(function() {
  this.select('*').from('users').whereNull('first_name')
})
```

```js
knex.select('*').from('users').whereNull('last_name').intersect([
  knex.select('*').from('users').whereNull('first_name')
])
```

```js
knex.select('*').from('users').whereNull('last_name').intersect(
  knex.raw('select * from users where first_name is null'),
  knex.raw('select * from users where email is null')
)
```

**insert**

—

`.insert(data, [returning], [options])`

Creates an insert query, taking either a hash of properties to be inserted into the row, or an array of inserts, to be executed as a single insert command. If returning array is passed e.g. \['id', 'title'\], it resolves the promise / fulfills the callback with an array of all the added rows with specified columns. It's a shortcut for [returning method](https://knexjs.org/#Builder-returning)

```

knex('books').insert({title: 'Slaughterhouse Five'})
```

```

knex('coords').insert([{x: 20}, {y: 30},  {x: 10, y: 20}])
```

```

knex.insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}], ['id']).into('books')
```

For MSSQL, triggers on tables can interrupt returning a valid value from the standard insert statements. You can add the `includeTriggerModifications` option to get around this issue. This modifies the SQL so the proper values can be returned. This only modifies the statement if you are using MSSQL, a returning value is specified, and the `includeTriggerModifications` option is set.

```


knex('books')
  .insert({title: 'Alice in Wonderland'}, ['id'], { includeTriggerModifications: true })
```

If one prefers that undefined keys are replaced with `NULL` instead of `DEFAULT` one may give `useNullAsDefault` configuration parameter in knex config.

```js
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  useNullAsDefault: true
});

knex('coords').insert([{x: 20}, {y: 30}, {x: 10, y: 20}])
```

**onConflict**

—

`insert(..).onConflict(column) / insert(..).onConflict([column1, column2, ...])`

Implemented for the PostgreSQL, MySQL, and SQLite databases. A modifier for insert queries that specifies alternative behaviour in the case of a conflict. A conflict occurs when a table has a PRIMARY KEY or a UNIQUE index on a column (or a composite index on a set of columns) and a row being inserted has the same value as a row which already exists in the table in those column(s). The default behaviour in case of conflict is to raise an error and abort the query. Using this method you can change this behaviour to either silently ignore the error by using .onConflict().ignore() or to update the existing row with new data (perform an "UPSERT") by using .onConflict().merge().

Note: For PostgreSQL and SQLite, the column(s) specified by this method must either be the table's PRIMARY KEY or have a UNIQUE index on them, or the query will fail to execute. When specifying multiple columns, they must be a composite PRIMARY KEY or have composite UNIQUE index. MySQL will ignore the specified columns and always use the table's PRIMARY KEY. For cross-platform support across PostgreSQL, MySQL, and SQLite you must both explicitly specifiy the columns in .onConflict() and those column(s) must be the table's PRIMARY KEY.

See documentation on .ignore() and .merge() methods for more details.

**ignore**

—

`insert(..).onConflict(..).ignore()`

Implemented for the PostgreSQL, MySQL, and SQLite databases. Modifies an insert query, and causes it to be silently dropped without an error if a conflict occurs. Uses INSERT IGNORE in MySQL, and adds an ON CONFLICT (columns) DO NOTHING clause to the insert statement in PostgreSQL and SQLite.

```js
knex('tableName')
  .insert({
    email: "ignore@example.com",
    name: "John Doe"
  })
  .onConflict('email')
  .ignore()
```

**merge**

—

`insert(..).onConflict(..).merge() / insert(..).onConflict(..).merge(updates)`

Implemented for the PostgreSQL, MySQL, and SQLite databases. Modifies an insert query, to turn it into an 'upsert' operation. Uses ON DUPLICATE KEY UPDATE in MySQL, and adds an ON CONFLICT (columns) DO UPDATE clause to the insert statement in PostgreSQL and SQLite. By default, it merges all columns.

```js
knex('tableName')
  .insert({
    email: "ignore@example.com",
    name: "John Doe"
  })
  .onConflict('email')
  .merge()
```

This also works with batch inserts:

```js
knex('tableName')
  .insert(
    { email: "john@example.com", name: "John Doe" },
    { email: "jane@example.com", name: "Jane Doe" },
    { email: "alex@example.com", name: "Alex Doe" },
  )
  .onConflict('email')
  .merge()
```

It is also possible to specify a subset of the columns to merge when a conflict occurs. For example, you may want to set a 'created\_at' column when inserting but would prefer not to update it if the row already exists:

```js
const timestamp = Date.now();
knex('tableName')
  .insert({
    email: "ignore@example.com",
    name: "John Doe",
    created_at: timestamp,
    updated_at: timestamp,
  })
  .onConflict('email')
  .merge(['email', 'name', 'updated_at'])
```

It is also possible to specify data to update seperately from the data to insert. This is useful if you want to update with different data to the insert. For example, you may want to change a value if the row already exists:

```js
const timestamp = Date.now();
knex('tableName')
  .insert({
    email: "ignore@example.com",
    name: "John Doe",
    created_at: timestamp,
    updated_at: timestamp,
  })
  .onConflict('email')
  .merge({
    name: "John Doe The Second",
  })
```

**For PostgreSQL/SQLite databases only**, it is also possible to add [a WHERE clause](https://knexjs.org/#Builder-wheres) to conditionally update only the matching rows:

```js
const timestamp = Date.now();
knex('tableName')
  .insert({
    email: "ignore@example.com",
    name: "John Doe",
    created_at: timestamp,
    updated_at: timestamp,
  })
  .onConflict('email')
  .merge({
    name: "John Doe",
    updated_at: timestamp,
  })
  .where('updated_at', '<', timestamp)
```

**update**

—

`.update(data, [returning], [options]) / .update(key, value, [returning], [options])`

Creates an update query, taking a hash of properties or a key/value pair to be updated based on the other query constraints. If returning array is passed e.g. \['id', 'title'\], it resolves the promise / fulfills the callback with an array of all the updated rows with specified columns. It's a shortcut for [returning method](https://knexjs.org/#Builder-returning)

```js
knex('books')
  .where('published_date', '<', 2000)
  .update({
    status: 'archived',
    thisKeyIsSkipped: undefined
  })
```

```

knex('books').update('title', 'Slaughterhouse Five')
```

```

knex('books')
  .where({ id: 42 })
  .update({ title: "The Hitchhiker's Guide to the Galaxy" }, ['id', 'title'])
```

For MSSQL, triggers on tables can interrupt returning a valid value from the standard update statements. You can add the `includeTriggerModifications` option to get around this issue. This modifies the SQL so the proper values can be returned. This only modifies the statement if you are using MSSQL, a returning value is specified, and the `includeTriggerModifications` option is set.

```


knex('books')
  .update({title: 'Alice in Wonderland'}, ['id', 'title'], { includeTriggerModifications: true })
```

**del / delete**

—

`.del([returning], [options])`

Aliased to del as delete is a reserved word in JavaScript, this method deletes one or more rows, based on other conditions specified in the query. Resolves the promise / fulfills the callback with the number of affected rows for the query.

```js
knex('accounts')
  .where('activated', false)
  .del()
```

For MSSQL, triggers on tables can interrupt returning a valid value from the standard delete statements. You can add the `includeTriggerModifications` option to get around this issue. This modifies the SQL so the proper values can be returned. This only modifies the statement if you are using MSSQL, a returning value is specified, and the `includeTriggerModifications` option is set.

```


knex('books')
  .where('title', 'Alice in Wonderland')
  .del(['id', 'title'], { includeTriggerModifications: true })
```

**returning**

—

`.returning(column, [options]) / .returning([column1, column2, ...], [options])`

Utilized by PostgreSQL, MSSQL, and Oracle databases, the returning method specifies which column should be returned by the insert, update and delete methods. Passed column parameter may be a string or an array of strings. When passed in a string, makes the SQL result be reported as an array of values from the specified column. When passed in an array of strings, makes the SQL result be reported as an array of objects, each containing a single property for each of the specified columns. The returning method is not supported on Amazon Redshift.

```

knex('books')
  .returning('id')
  .insert({title: 'Slaughterhouse Five'})
```

```

knex('books')
  .returning('id')
  .insert([{title: 'Great Gatsby'}, {title: 'Fahrenheit 451'}])
```

```

knex('books')
  .returning(['id','title'])
  .insert({title: 'Slaughterhouse Five'})
```

For MSSQL, triggers on tables can interrupt returning a valid value from the standard DML statements. You can add the `includeTriggerModifications` option to get around this issue. This modifies the SQL so the proper values can be returned. This only modifies the statement if you are using MSSQL, a returning value is specified, and the `includeTriggerModifications` option is set.

```


knex('books')
  .returning(['id','title'], { includeTriggerModifications: true })
  .insert({title: 'Slaughterhouse Five'})
```

**transacting**

—

`.transacting(transactionObj)`

Used by knex.transaction, the transacting method may be chained to any query and passed the object you wish to join the query as part of the transaction for.

```js
const Promise = require('bluebird');
knex.transaction(function(trx) {
  knex('books').transacting(trx).insert({name: 'Old Books'})
    .then(function(resp) {
      const id = resp[0];
      return someExternalMethod(id, trx);
    })
    .then(trx.commit)
    .catch(trx.rollback);
})
.then(function(resp) {
  console.log('Transaction complete.');
})
.catch(function(err) {
  console.error(err);
});
```

**forUpdate**

—

`.transacting(t).forUpdate()`

Dynamically added after a transaction is specified, the forUpdate adds a FOR UPDATE in PostgreSQL and MySQL during a select statement. Not supported on Amazon Redshift due to lack of table locks.

```js
knex('tableName')
  .transacting(trx)
  .forUpdate()
  .select('*')
```

**skipLocked**

—

`.skipLocked()`

MySQL 8.0+ and PostgreSQL 9.5+ only. This method can be used after a lock mode has been specified with either forUpdate or forShare, and will cause the query to skip any locked rows, returning an empty set if none are available.

```js
knex('tableName')
  .select('*')
  .forUpdate()
  .skipLocked()
```

**noWait**

—

`.noWait()`

MySQL 8.0+ and PostgreSQL 9.5+ only. This method can be used after a lock mode has been specified with either forUpdate or forShare, and will cause the query to fail immediately if any selected rows are currently locked.

```js
knex('tableName')
  .select('*')
  .forUpdate()
  .noWait()
```

**count**

—

`.count(column|columns|raw, [options])`

Performs a count on the specified column or array of columns (note that some drivers do not support multiple columns). Also accepts raw expressions. The value returned from count (and other aggregation queries) is an array of objects like: `[{'COUNT(*)': 1}]`. The actual keys are dialect specific, so usually we would want to specify an alias (Refer examples below). Note that in Postgres, count returns a bigint type which will be a String and not a Number ([more info](https://github.com/brianc/node-pg-types#use)).

```js
knex('users').count('active')
```

```js
knex('users').count('active', {as: 'a'})
```

```js
knex('users').count('active as a')
```

```js
knex('users').count({ a: 'active' })
```

```js
knex('users').count({ a: 'active', v: 'valid' })
```

```js
knex('users').count('id', 'active')
```

```js
knex('users').count({ count: ['id', 'active'] })
```

```js
knex('users').count(knex.raw('??', ['active']))
```

### Usage with TypeScript

The value of count will, by default, have type of `string | number`. This may be counter-intuitive but some connectors (eg. postgres) will automatically cast BigInt result to string when javascript's Number type is not large enough for the value.

```js
knex('users').count('age') 

knex('users').count({count: '*'}) 
```

Working with `string | number` can be inconvenient if you are not working with large tables. Two alternatives are available:

```

knex('users').count<Record<string, number>>('age');



declare module "knex/types/result" {
    interface Registry {
        Count: number;
    }
}
```

Use **countDistinct** to add a distinct expression inside the aggregate function.

```js
knex('users').countDistinct('active')
```

**min**

—

`.min(column|columns|raw, [options])`

Gets the minimum value for the specified column or array of columns (note that some drivers do not support multiple columns). Also accepts raw expressions.

```js
knex('users').min('age')
```

```js
knex('users').min('age', {as: 'a'})
```

```js
knex('users').min('age as a')
```

```js
knex('users').min({ a: 'age' })
```

```js
knex('users').min({ a: 'age', b: 'experience' })
```

```js
knex('users').min('age', 'logins')
```

```js
knex('users').min({ min: ['age', 'logins'] })
```

```js
knex('users').min(knex.raw('??', ['age']))
```

**max**

—

`.max(column|columns|raw, [options])`

Gets the maximum value for the specified column or array of columns (note that some drivers do not support multiple columns). Also accepts raw expressions.

```js
knex('users').max('age')
```

```js
knex('users').max('age', {as: 'a'})
```

```js
knex('users').max('age as a')
```

```js
knex('users').max({ a: 'age' })
```

```js
knex('users').max('age', 'logins')
```

```js
knex('users').max({ max: ['age', 'logins'] })
```

```js
knex('users').max({ max: 'age', exp: 'experience' })
```

```js
knex('users').max(knex.raw('??', ['age']))
```

**sum**

—

`.sum(column|columns|raw)`

Retrieve the sum of the values of a given column or array of columns (note that some drivers do not support multiple columns). Also accepts raw expressions.

```js
knex('users').sum('products')
```

```js
knex('users').sum('products as p')
```

```js
knex('users').sum({ p: 'products' })
```

```js
knex('users').sum('products', 'orders')
```

```js
knex('users').sum({ sum: ['products', 'orders'] })
```

```js
knex('users').sum(knex.raw('??', ['products']))
```

Use **sumDistinct** to add a distinct expression inside the aggregate function.

```js
knex('users').sumDistinct('products')
```

**avg**

—

`.avg(column|columns|raw)`

Retrieve the average of the values of a given column or array of columns (note that some drivers do not support multiple columns). Also accepts raw expressions.

```js
knex('users').avg('age')
```

```js
knex('users').avg('age as a')
```

```js
knex('users').avg({ a: 'age' })
```

```js
knex('users').avg('age', 'logins')
```

```js
knex('users').avg({ avg: ['age', 'logins'] })
```

```js
knex('users').avg(knex.raw('??', ['age']))
```

Use **avgDistinct** to add a distinct expression inside the aggregate function.

```js
knex('users').avgDistinct('age')
```

**increment**

—

`.increment(column, amount)`

Increments a column value by the specified amount. Object syntax is supported for `column`.

```js
knex('accounts')
  .where('userid', '=', 1)
  .increment('balance', 10)
```

```js
knex('accounts')
  .where('id', '=', 1)
  .increment({
    balance: 10,
    times: 1,
  })
```

**decrement**

—

`.decrement(column, amount)`

Decrements a column value by the specified amount. Object syntax is supported for `column`.

```js
knex('accounts').where('userid', '=', 1).decrement('balance', 5)
```

```js
knex('accounts')
  .where('id', '=', 1)
  .decrement({
    balance: 50,
  })
```

**truncate**

—

`.truncate()`

Truncates the current table.

```js
knex('accounts').truncate()
```

**pluck**

—

`.pluck(id)`

This will pluck the specified column from each row in your results, yielding a promise which resolves to the array of values selected.

```js
knex.table('users').pluck('id').then(function(ids) { console.log(ids); });
```

**first**

—

`.first([columns])`

Similar to select, but only retrieves & resolves with the first record from the query.

```js
knex.table('users').first('id', 'name').then(function(row) { console.log(row); });
```

**clone**

—

`.clone()`

Clones the current query chain, useful for re-using partial query snippets in other queries without mutating the original.

**denseRank**

—

`.denseRank(alias, ~mixed~)`

Add a dense\_rank() call to your query. For all the following queries, alias can be set to a falsy value if not needed.

String Syntax — .denseRank(alias, orderByClause, \[partitionByClause\]) :

```js
knex('users').select('*').denseRank('alias_name', 'email', 'firstName')
```

It also accepts arrays of strings as argument :

```js
knex('users').select('*').denseRank('alias_name', ['email', 'address'], ['firstName', 'lastName'])
```

Raw Syntax — .denseRank(alias, rawQuery) :

```js
knex('users').select('*').denseRank('alias_name', knex.raw('order by ??', ['email']))
```

Function Syntax — .denseRank(alias, function) :

Use orderBy() and partitionBy() (both chainable) to build your query :

```js
knex('users').select('*').denseRank('alias_name', function() {
  this.orderBy('email').partitionBy('firstName')
})
```

**rank**

—

`.rank(alias, ~mixed~)`

Add a rank() call to your query. For all the following queries, alias can be set to a falsy value if not needed.

String Syntax — .rank(alias, orderByClause, \[partitionByClause\]) :

```js
knex('users').select('*').rank('alias_name', 'email', 'firstName')
```

It also accepts arrays of strings as argument :

```js
knex('users').select('*').rank('alias_name', ['email', 'address'], ['firstName', 'lastName'])
```

Raw Syntax — .rank(alias, rawQuery) :

```js
knex('users').select('*').rank('alias_name', knex.raw('order by ??', ['email']))
```

Function Syntax — .rank(alias, function) :

Use orderBy() and partitionBy() (both chainable) to build your query :

```js
knex('users').select('*').rank('alias_name', function() {
  this.orderBy('email').partitionBy('firstName')
})
```

**rowNumber**

—

`.rowNumber(alias, ~mixed~)`

Add a row\_number() call to your query. For all the following queries, alias can be set to a falsy value if not needed.

String Syntax — .rowNumber(alias, orderByClause, \[partitionByClause\]) :

```js
knex('users').select('*').rowNumber('alias_name', 'email', 'firstName')
```

It also accepts arrays of strings as argument :

```js
knex('users').select('*').rowNumber('alias_name', ['email', 'address'], ['firstName', 'lastName'])
```

Raw Syntax — .rowNumber(alias, rawQuery) :

```js
knex('users').select('*').rowNumber('alias_name', knex.raw('order by ??', ['email']))
```

Function Syntax — .rowNumber(alias, function) :

Use orderBy() and partitionBy() (both chainable) to build your query :

```js
knex('users').select('*').rowNumber('alias_name', function() {
  this.orderBy('email').partitionBy('firstName')
})
```

**modify**

—

`.modify(fn, *arguments)`

Allows encapsulating and re-using query snippets and common behaviors as functions. The callback function should receive the query builder as its first argument, followed by the rest of the (optional) parameters passed to modify.

```js
const withUserName = function(queryBuilder, foreignKey) {
  queryBuilder.leftJoin('users', foreignKey, 'users.id').select('users.user_name');
};
knex.table('articles').select('title', 'body').modify(withUserName, 'articles_user.id').then(function(article) {
  console.log(article.user_name);
});
```

**columnInfo**

—

`.columnInfo([columnName])`

Returns an object with the column info about the current table, or an individual column if one is passed, returning an object with the following keys:

-   **defaultValue**: the default value for the column
-   **type**: the column type
-   **maxLength**: the max length set for the column
-   **nullable**: whether the column may be null

```js
knex('users').columnInfo().then(function(info) { 
```

**debug**

—

`.debug([enabled])`

Overrides the global debug setting for the current query chain. If enabled is omitted, query debugging will be turned on.

**connection**

—

`.connection(dbConnection)`

The method sets the db connection to use for the query without using the connection pool. You should pass to it the same object that acquireConnection() for the corresponding driver returns

```js
const Pool = require('pg-pool')
const pool = new Pool({ ... })
const connection = await pool.connect();
  try {
    return await knex.connection(connection); 
  } catch (error) {
    
  } finally {
    connection.release();
  }
```

**options**

—

`.options()`

Allows for mixing in additional options as defined by database client specific libraries:

```js
knex('accounts as a1')
  .leftJoin('accounts as a2', function() {
    this.on('a1.email', '<>', 'a2.email');
  })
  .select(['a1.email', 'a2.email'])
  .where(knex.raw('a1.id = 1'))
  .options({ nestTables: true, rowMode: 'array' })
  .limit(2)
  .then(...
```

**queryContext**

—

`.queryContext(context)`

Allows for configuring a context to be passed to the [wrapIdentifier](https://knexjs.org/#Installation-wrap-identifier) and [postProcessResponse](https://knexjs.org/#Installation-post-process-response) hooks:

```js
knex('accounts as a1')
  .queryContext({ foo: 'bar' })
  .select(['a1.email', 'a2.email'])
```

The context can be any kind of value and will be passed to the hooks without modification. However, note that **objects will be shallow-cloned** when a query builder instance is [cloned](https://knexjs.org/#Builder-clone), which means that they will contain all the properties of the original object but will not be the same object reference. This allows modifying the context for the cloned query builder instance.

Calling `queryContext` with no arguments will return any context configured for the query builder instance.

### Extending Query Builder

**Important:** this feature is experimental and its API may change in the future.

It allows to add custom function the the Query Builder.

Example:

```js
const Knex = require('knex');
Knex.QueryBuilder.extend('customSelect', function(value) {
  return this.select(this.client.raw(`${value} as value`));
});

const meaningOfLife = await knex('accounts')
  .customSelect(42);
```

If using TypeScript, you can extend the QueryBuilder interface with your custom method.

1.  Create a `knex.d.ts` file inside a `@types` folder (or any other folder).

```


import { Knex as KnexOriginal } from 'knex';

declare module 'knex' {
  namespace Knex {
    interface QueryBuilder {
      customSelect<TRecord, TResult>(value: number): KnexOriginal.QueryBuilder<TRecord, TResult>;
    }
  }
}
```

2.  Add the new `@types` folder to `typeRoots` in your `tsconfig.json`.

```


{
  "compilerOptions": {
    "typeRoots": [
      "node_modules/@types",
      "@types"
    ],
  }
}
```

## Schema Builder

The `knex.schema` is a **getter function**, which returns a stateful object containing the query. Therefore be sure to obtain a new instance of the `knex.schema` for every query. These methods return [promises](https://knexjs.org/#Interfaces-Promises).

**withSchema**

—

`knex.schema.withSchema([schemaName])`

Specifies the schema to be used when using the schema-building commands.

```js
knex.schema.withSchema('public').createTable('users', function (table) {
  table.increments();
})
```

**createTable**

—

`knex.schema.createTable(tableName, callback)`

Creates a new table on the database, with a callback function to modify the table's structure, using the schema-building commands.

```js
knex.schema.createTable('users', function (table) {
  table.increments();
  table.string('name');
  table.timestamps();
})
```

**dropTable**

—

`knex.schema.dropTable(tableName)`

Drops a table, specified by tableName.

```js
knex.schema.dropTable('users')
```

**hasTable**

—

`knex.schema.hasTable(tableName)`

Checks for a table's existence by tableName, resolving with a boolean to signal if the table exists.

```js
knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.text('bio');
    });
  }
});
```

**hasColumn**

—

`knex.schema.hasColumn(tableName, columnName)`

Checks if a column exists in the current table, resolves the promise with a boolean, true if the column exists, false otherwise.

**dropTableIfExists**

—

`knex.schema.dropTableIfExists(tableName)`

Drops a table conditionally if the table exists, specified by tableName.

```js
knex.schema.dropTableIfExists('users')
```

**table**

—

`knex.schema.table(tableName, callback)`

Chooses a database table, and then modifies the table, using the Schema Building functions inside of the callback.

```js
knex.schema.table('users', function (table) {
  table.dropColumn('name');
  table.string('first_name');
  table.string('last_name');
})
```

**generateDdlCommands**

—

`knex.schema.generateDdlCommands()`

Generates complete SQL commands for applying described schema changes, without executing anything. Useful when knex is being used purely as a query builder. Generally produces same result as .toSQL(), with a notable exception with SQLite, which relies on asynchronous calls to the database for building part of its schema modification statements

```js
const ddlCommands = knex.schema.alterTable(
  'users',
  (table) => {
    table
      .foreign('companyId')
      .references('company.companyId')
      .withKeyName('fk_fkey_company');
  }
).generateDdlCommands();
```

**raw**

—

`knex.schema.raw(statement)`

Run an arbitrary sql query in the schema builder chain.

```js
knex.schema.raw("SET sql_mode='TRADITIONAL'")
  .table('users', function (table) {
    table.dropColumn('name');
    table.string('first_name');
    table.string('last_name');
  })
```

**queryContext**

—

`knex.schema.queryContext(context)`

Allows configuring a context to be passed to the [wrapIdentifier](https://knexjs.org/#Installation-wrap-identifier) hook. The context can be any kind of value and will be passed to `wrapIdentifier` without modification.

```js
knex.schema.queryContext({ foo: 'bar' })
  .table('users', function (table) {
    table.string('first_name');
    table.string('last_name');
  })
```

The context configured will be passed to `wrapIdentifier` for each identifier that needs to be formatted, including the table and column names. However, a different context can be set for the column names via [table.queryContext](https://knexjs.org/#Schema-table-queryContext).

Calling `queryContext` with no arguments will return any context configured for the schema builder instance.

### Schema Building:

**dropColumn**

—

`table.dropColumn(name)`

Drops a column, specified by the column's name

**dropColumns**

—

`table.dropColumns(*columns)`

Drops multiple columns, taking a variable number of column names.

**renameColumn**

—

`table.renameColumn(from, to)`

Renames a column from one name to another.

**increments**

—

`table.increments(name, options={[primaryKey: boolean = true])`

Adds an auto incrementing column. In PostgreSQL this is a serial; in Amazon Redshift an integer identity(1,1). This will be used as the primary key for the table. Also available is a bigIncrements if you wish to add a bigint incrementing number (in PostgreSQL bigserial). Note that a primary key is created by default, but you can override this behaviour by passing the `primaryKey` option.

```

knex.schema.createTable('users', function (table) {
  table.increments('userId');
  table.string('name');
});


knex.schema.createTable('posts', function (table) {
  table.integer('author').unsigned().notNullable();
  table.string('title', 30);
  table.string('content');

  table.foreign('author').references('userId').inTable('users');
});
```

A primaryKey option may be passed, to disable to automatic primary key creation:

```


knex.schema.createTable('users', function (table) {
  table.increments('id');
  table.increments('other_id', { primaryKey: false });
});
```

**integer**

—

`table.integer(name)`

Adds an integer column.

**bigInteger**

—

`table.bigInteger(name)`

In MySQL or PostgreSQL, adds a bigint column, otherwise adds a normal integer. Note that bigint data is returned as a string in queries because JavaScript may be unable to parse them without loss of precision.

**text**

—

`table.text(name, [textType])`

Adds a text column, with optional textType for MySql text datatype preference. textType may be mediumtext or longtext, otherwise defaults to text.

**string**

—

`table.string(name, [length])`

Adds a string column, with optional length defaulting to 255.

**float**

—

`table.float(column, [precision], [scale])`

Adds a float column, with optional precision (defaults to 8) and scale (defaults to 2).

**decimal**

—

`table.decimal(column, [precision], [scale])`

Adds a decimal column, with optional precision (defaults to 8) and scale (defaults to 2). Specifying NULL as precision creates a decimal column that can store numbers of any precision and scale. (Only supported for Oracle, SQLite, Postgres)

**boolean**

—

`table.boolean(name)`

Adds a boolean column.

**date**

—

`table.date(name)`

Adds a date column.

**datetime**

—

`table.datetime(name, options={[useTz: boolean], [precision: number]})`

Adds a datetime column. By default PostgreSQL creates column with timezone (timestamptz type). This behaviour can be overriden by passing the useTz option (which is by default true for PostgreSQL). MySQL and MSSQL do not have useTz option.

A precision option may be passed:

```
table.datetime('some_time', { precision: 6 }).defaultTo(knex.fn.now(6))
```

**time**

—

`table.time(name, [precision])`

Adds a time column, with optional precision for MySQL. Not supported on Amazon Redshift.

In MySQL a precision option may be passed:

```
table.time('some_time', { precision: 6 })
```

**timestamp**

—

`table.timestamp(name, options={[useTz: boolean], [precision: number]})`

Adds a timestamp column. By default PostgreSQL creates column with timezone (timestamptz type) and MSSQL does not (datetime2). This behaviour can be overriden by passing the useTz option (which is by default false for MSSQL and true for PostgreSQL). MySQL does not have useTz option.

```
table.timestamp('created_at').defaultTo(knex.fn.now());
```

In PostgreSQL and MySQL a precision option may be passed:

```
table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
```

In PostgreSQL and MSSQL a timezone option may be passed:

```
table.timestamp('created_at', { useTz: true });
```

**timestamps**

—

`table.timestamps([useTimestamps], [defaultToNow])`

Adds created\_at and updated\_at columns on the database, setting each to datetime types. When true is passed as the first argument a timestamp type is used instead. Both columns default to being not null and using the current timestamp when true is passed as the second argument. Note that on MySQL the .timestamps() only have seconds precision, to get better precision use the .datetime or .timestamp methods directly with precision.

**dropTimestamps**

—

`table.dropTimestamps()`

Drops the columns created\_at and updated\_at from the table, which can be created via timestamps.

**binary**

—

`table.binary(name, [length])`

Adds a binary column, with optional length argument for MySQL.

**enum / enu**

—

`table.enu(col, values, [options])`

Adds a enum column, (aliased to enu, as enum is a reserved word in JavaScript). Implemented as unchecked varchar(255) on Amazon Redshift. Note that the second argument is an array of values. Example:

```
table.enu('column', ['value1', 'value2'])
```

For Postgres, an additional options argument can be provided to specify whether or not to use Postgres's native TYPE:

```
table.enu('column', ['value1', 'value2'], { useNative: true, enumName: 'foo_type' })
```

It will use the values provided to generate the appropriate TYPE. Example:

```
CREATE TYPE "foo_type" AS ENUM ('value1', 'value2');
```

To use an existing native type across columns, specify 'existingType' in the options (this assumes the type has already been created):

Note: Since the enum values aren't utilized for a native && existing type, the type being passed in for values is immaterial.

```
table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type' })
```

If you want to use existing enums from a schema, different from the schema of your current table, specify 'schemaName' in the options:

```
table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type', schemaName: 'public' })
```

**json**

—

`table.json(name)`

Adds a json column, using the built-in json type in PostgreSQL, MySQL and SQLite, defaulting to a text column in older versions or in unsupported databases.

For PostgreSQL, due to incompatibility between native array and json types, when setting an array (or a value that could be an array) as the value of a json or jsonb column, you should use JSON.stringify() to convert your value to a string prior to passing it to the query builder, e.g.

```js
knex.table('users')
  .where({id: 1})
  .update({json_data: JSON.stringify(mightBeAnArray)});
```

**jsonb**

—

`table.jsonb(name)`

Adds a jsonb column. Works similar to table.json(), but uses native jsonb type if possible.

**uuid**

—

`table.uuid(name)`

Adds a uuid column - this uses the built-in uuid type in PostgreSQL, and falling back to a char(36) in other databases.

**engine**

—

`table.engine(val)`

Sets the engine for the database table, only available within a createTable call, and only applicable to MySQL.

**charset**

—

`table.charset(val)`

Sets the charset for the database table, only available within a createTable call, and only applicable to MySQL.

**collate**

—

`table.collate(val)`

Sets the collation for the database table, only available within a createTable call, and only applicable to MySQL.

**inherits**

—

`table.inherits(val)`

Sets the tables that this table inherits, only available within a createTable call, and only applicable to PostgreSQL.

**specificType**

—

`table.specificType(name, type)`

Sets a specific type for the column creation, if you'd like to add a column type that isn't supported here.

**index**

—

`table.index(columns, [indexName], [indexType])`

Adds an index to a table over the given columns. A default index name using the columns is used unless indexName is specified. The indexType can be optionally specified for PostgreSQL and MySQL. Amazon Redshift does not allow creating an index.

**dropIndex**

—

`table.dropIndex(columns, [indexName])`

Drops an index from a table. A default index name using the columns is used unless indexName is specified (in which case columns is ignored). Amazon Redshift does not allow creating an index.

**unique**

—

`table.unique(columns, [indexName])`

Adds an unique index to a table over the given `columns`. A default index name using the columns is used unless indexName is specified.

```js
knex.schema.alterTable('users', function(t) {
  t.unique('email')
})
knex.schema.alterTable('job', function(t) {
  t.unique(['account_id', 'program_id'])
})
```

**foreign**

—

`table.foreign(columns, [foreignKeyName])[.onDelete(statement).onUpdate(statement).withKeyName(foreignKeyName)]`

Adds a foreign key constraint to a table for an existing column using `table.foreign(column).references(column)` or multiple columns using `table.foreign(columns).references(columns).inTable(table)`. A default key name using the columns is used unless foreignKeyName is specified. You can also chain onDelete() and/or onUpdate() to set the reference option (RESTRICT, CASCADE, SET NULL, NO ACTION) for the operation. You can also chain withKeyName() to override default key name that is generated from table and column names (result is identical to specifying second parameter to function foreign()). Note that using foreign() is the same as column.references(column) but it works for existing columns.

```js
knex.schema.table('users', function (table) {
  table.integer('user_id').unsigned()
  table.foreign('user_id').references('Items.user_id_in_items')
})
```

**dropForeign**

—

`table.dropForeign(columns, [foreignKeyName])`

Drops a foreign key constraint from a table. A default foreign key name using the columns is used unless foreignKeyName is specified (in which case columns is ignored).

**dropUnique**

—

`table.dropUnique(columns, [indexName])`

Drops a unique key constraint from a table. A default unique key name using the columns is used unless indexName is specified (in which case columns is ignored).

**dropPrimary**

—

`table.dropPrimary([constraintName])`

Drops the primary key constraint on a table. Defaults to tablename\_pkey unless constraintName is specified.

**queryContext**

—

`table.queryContext(context)`

Allows configuring a context to be passed to the [wrapIdentifier](https://knexjs.org/#Installation-wrap-identifier) hook for formatting table builder identifiers. The context can be any kind of value and will be passed to `wrapIdentifier` without modification.

```js
knex.schema.table('users', function (table) {
  table.queryContext({ foo: 'bar' });
  table.string('first_name');
  table.string('last_name');
})
```

This method also enables overwriting the context configured for a schema builder instance via [schema.queryContext](https://knexjs.org/#Schema-queryContext):

```js
knex.schema.queryContext('schema context')
  .table('users', function (table) {
    table.queryContext('table context');
    table.string('first_name');
    table.string('last_name');
})
```

Note that it's also possible to overwrite the table builder context for any column in the table definition:

```js
knex.schema.queryContext('schema context')
  .table('users', function (table) {
    table.queryContext('table context');
    table.string('first_name').queryContext('first_name context');
    table.string('last_name').queryContext('last_name context');
})
```

Calling `queryContext` with no arguments will return any context configured for the table builder instance.

### Chainable Methods:

The following three methods may be chained on the schema building methods, as modifiers to the column.

**alter**

—

`column.alter()`

Marks the column as an alter / modify, instead of the default add. Note: This only works in .alterTable() and is not supported by SQlite or Amazon Redshift. Alter is _not_ done incrementally over older column type so if you like to add `notNullable` and keep the old default value, the alter statement must contain both `.notNullable().defaultTo(1).alter()`. If one just tries to add `.notNullable().alter()` the old default value will be dropped.

```js
knex.schema.alterTable('user', function(t) {
  t.increments().primary(); // add
  // drops previous default value from column, change type to string and add not nullable constraint
  t.string('username', 35).notNullable().alter();
  // drops both not null constraint and the default value
  t.integer('age').alter();
});
```

**index**

—

`column.index([indexName], [indexType])`

Specifies a field as an index. If an indexName is specified, it is used in place of the standard index naming convention of tableName\_columnName. The indexType can be optionally specified for PostgreSQL and MySQL. No-op if this is chained off of a field that cannot be indexed.

**primary**

—

`column.primary([constraintName]); table.primary(columns, [constraintName])`

When called on a single column it will set that column as the primary key for a table. If you need to create a composite primary key, call it on a table with an array of column names instead. Constraint name defaults to `tablename_pkey` unless `constraintName` is specified. On Amazon Redshift, all columns included in a primary key must be not nullable.

**unique**

—

`column.unique()`

Sets the column as unique. On Amazon Redshift, this constraint is not enforced, but it is used by the query planner.

**references**

—

`column.references(column)`

Sets the "column" that the current column references as a foreign key. "column" can either be "." syntax, or just the column name followed up with a call to inTable to specify the table.

**inTable**

—

`column.inTable(table)`

Sets the "table" where the foreign key column is located after calling column.references.

**onDelete**

—

`column.onDelete(command)`

Sets the SQL command to be run "onDelete".

**onUpdate**

—

`column.onUpdate(command)`

Sets the SQL command to be run "onUpdate".

**defaultTo**

—

`column.defaultTo(value, options={[constraintName: string = undefined]))`

Sets the default value for the column on an insert.

In MSSQL a constraintName option may be passed to ensure a specific constraint name:

```
column.defaultTo('value', { constraintName: 'df_table_value' });
```

**unsigned**

—

`column.unsigned()`

Specifies an integer as unsigned. No-op if this is chained off of a non-integer field.

**notNullable**

—

`column.notNullable()`

Adds a not null on the current column being created.

**nullable**

—

`column.nullable()`

Default on column creation, this explicitly sets a field to be nullable.

**first**

—

`column.first()`

Sets the column to be inserted on the first position, only used in MySQL alter tables.

**after**

—

`column.after(field)`

Sets the column to be inserted after another, only used in MySQL alter tables.

```js
knex.schema.createTable('accounts', function(t) {
  t.increments().primary();
  t.string('email').unique().comment('This is the email field');
});
```

```js
knex.schema.createTable('users', function(t) {
  t.increments();
  t.string('email').unique().collate('utf8_unicode_ci');
});
```

## Migrations

Migrations allow for you to define sets of schema changes so upgrading a database is a breeze.

### Migration CLI

The migration CLI is bundled with the knex install, and is driven by the [node-liftoff](https://github.com/tkellen/node-liftoff) module. To install globally, run:

```
$ npm install knex -g
```

The migration CLI accepts the following general command-line options. You can view help text and additional options for each command using `--help`. E.g. `knex migrate:latest --help`.

-   `--debug`: Run with debugging
-   `--knexfile [path]`: Specify the knexfile path
-   `--knexpath [path]`: Specify the path to the knex instance
-   `--cwd [path]`: Specify the working directory
-   `--client [name]`: Set the DB client without a knexfile
-   `--connection [address]`: Set the DB connection without a knexfile
-   `--migrations-table-name`: Set the migration table name without a knexfile
-   `--migrations-directory`: Set the migrations directory without a knexfile
-   `--env`: environment, default: process.env.NODE\_ENV || development
-   `--esm`: [Enables ESM module interoperability](https://knexjs.org/#esm-interop)
-   `--help`: Display help text for a particular command and exit.

Migrations use a **knexfile**, which specify various configuration settings for the module. To create a new knexfile, run the following:

```
$ knex init

# or for .ts

$ knex init -x ts
```

will create a sample knexfile.js - the file which contains our various database configurations. Once you have a knexfile.js, you can use the migration tool to create migration files to the specified directory (default migrations). Creating new migration files can be achieved by running:

```
$ knex migrate:make migration_name 

# or for .ts

$ knex migrate:make migration_name -x ts
```

-   you can also create your migration using a specific stub file, this serves as a migration template to speed up development for common migration operations
-   if the --stub option is not passed, the CLI will use either the knex default stub for the chosen extension, or the config.stub file

```
$ knex migrate:make --stub 

# or

$ knex migrate:make --stub 
```

-   if a stub path is provided, it must be relative to the knexfile.\[js, ts, etc\] location
-   if a is used, the stub is selected by its file name. The CLI will look for this file in the config.migrations.directory folder. If the config.migrations.directory is not defined, this operation will fail

Once you have finished writing the migrations, you can update the database matching your `NODE_ENV` by running:

```
$ knex migrate:latest
```

You can also pass the `--env` flag or set `NODE_ENV` to select an alternative environment:

```
$ knex migrate:latest --env production

# or

$ NODE_ENV=production knex migrate:latest
```

To rollback the last batch of migrations:

```
$ knex migrate:rollback
```

To rollback all the completed migrations:

```
$ knex migrate:rollback --all
```

To run the next migration that has not yet been run

```
$ knex migrate:up
```

To run the specified migration that has not yet been run

```
$ knex migrate:up 001_migration_name.js
```

To undo the last migration that was run

```
$ knex migrate:down
```

To undo the specified migration that was run

```
$ knex migrate:down 001_migration_name.js
```

To list both completed and pending migrations:

```
$ knex migrate:list
```

## Seed files

Seed files allow you to populate your database with test or seed data independent of your migration files.

### Seed CLI

To create a seed file, run:

```
$ knex seed:make seed_name
```

Seed files are created in the directory specified in your knexfile.js for the current environment. A sample seed configuration looks like:

```
development: {
  client: ...,
  connection: { ... },
  seeds: {
      directory: './seeds/dev'
  }
}
```

If no `seeds.directory` is defined, files are created in `./seeds`. Note that the seed directory needs to be a relative path. Absolute paths are not supported (nor is it good practice).

To run seed files, execute:

```
$ knex seed:run
```

Seed files are executed in alphabetical order. Unlike migrations, _every_ seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.

To run specific seed files, execute:

```
$ knex seed:run --specific=seed-filename.js --specific=another-seed-filename.js
```

### knexfile.js

A knexfile.js generally contains all of the configuration for your database. It can optionally provide different configuration for different environments. You may pass a `--knexfile` option to any of the command line statements to specify an alternate path to your knexfile.

#### Basic configuration:

```
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { user: 'me', database: 'my_app' }
};
```

you can also export an async function from the knexfile. This is useful when you need to fetch credentials from a secure location like vault

```
async function fetchConfiguration() {
  
  return {
    client: 'pg',
    connection: { user: 'me', password: 'my_pass' }
  }
}

module.exports = async () => {
  const configuration = await fetchConfiguration();
  return {
    ...configuration,
    migrations: {}
  }
};
```

#### Environment configuration:

```
module.exports = {
  development: {
    client: 'pg',
    connection: { user: 'me', database: 'my_app' }
  },
  production: { client: 'pg', connection: process.env.DATABASE_URL }
};
```

#### Custom migration:

You may provide a custom migration stub to be used in place of the default option.

```
module.exports = {
  client: 'pg',
  migrations: {
    stub: 'migration.stub'
  }
};
```

#### Generated migration extension:

You can control extension of generated migrations.

```
module.exports = {
  client: 'pg',
  migrations: {
    extension: 'ts'
  }
};
```

#### Knexfile in other languages

Knex uses [Liftoff](https://github.com/js-cli/js-liftoff) to support knexfile written in other compile-to-js languages.

Depending on the language, this may require you to install additional dependencies. The complete list of dependencies for each supported language can be found [here](https://github.com/gulpjs/interpret#extensions).

Most common cases are typescript (for which [typescript](https://www.npmjs.com/package/typescript) and [ts-node](https://www.npmjs.com/package/ts-node) packages are recommended), and coffeescript (for which [coffeescript](https://www.npmjs.com/package/coffeescript) dependency is required).

If you don't specify the extension explicitly, the extension of generated migrations/seed files will be inferred from the knexfile extension

### Migration API

`knex.migrate` is the class utilized by the knex migrations cli.

Each method takes an optional `config` object, which may specify the following properties:

-   `directory`: a relative path to the directory containing the migration files. Can be an array of paths (default `./migrations`)
-   `extension`: the file extension used for the generated migration files (default `js`)
-   `tableName`: the table name used for storing the migration state (default `knex_migrations`)
-   `schemaName`: the schema name used for storing the table with migration state (optional parameter, only works on DBs that support multiple schemas in a single DB, such as PostgreSQL)
-   `disableTransactions`: don't run migrations inside transactions (default `false`)
-   `disableMigrationsListValidation`: do not validate that all the already executed migrations are still present in migration directories (default `false`)
-   `sortDirsSeparately`: if true and multiple directories are specified, all migrations from a single directory will be executed before executing migrations in the next folder (default `false`)
-   `loadExtensions`: array of file extensions which knex will treat as migrations. For example, if you have typescript transpiled into javascript in the same folder, you want to execute only javascript migrations. In this case, set `loadExtensions` to `['.js']` (Notice the dot!) (default `['.co', '.coffee', '.eg', '.iced', '.js', '.litcoffee', '.ls', '.ts']`)
-   `migrationSource`: specify a custom migration source, see [Custom Migration Source](https://knexjs.org/#custom-migration-sources) for more info (default filesystem)

#### Transactions in migrations

By default, each migration is run inside a transaction. Whenever needed, one can disable transactions for all migrations via the common migration config option `config.disableTransactions` or per-migration, via exposing a boolean property `config.transaction` from a migration file:

```
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
       table.increments('id');
       table.string('first_name', 255).notNullable();
       table.string('last_name', 255).notNullable();
    })
    .createTable('products', function (table) {
       table.increments('id');
       table.decimal('price').notNullable();
       table.string('name', 1000).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable("products")
      .dropTable("users");
};

exports.config = { transaction: false };
```

The same config property can be used for enabling transaction per-migration in case the common configuration has `disableTransactions: true`.

**make**

—

`knex.migrate.make(name, [config])`

Creates a new migration, with the name of the migration being added.

**latest**

—

`knex.migrate.latest([config])`

Runs all migrations that have not yet been run.

If you need to run something only after all migrations have finished their execution, you can do something like this:

```js
knex.migrate.latest()
  .then(function() {
    return knex.seed.run();
  })
  .then(function() {
    
  });
```

**rollback**

—

`knex.migrate.rollback([config], [all])`

Rolls back the latest migration group. If the `all` parameter is truthy, all applied migrations will be rolled back instead of just the last batch. The default value for this parameter is `false`.

**up**

—

`knex.migrate.up([config])`

Runs the specified (by `config.name` parameter) or the next chronological migration that has not yet be run.

**down**

—

`knex.migrate.down([config])`

Will undo the specified (by `config.name` parameter) or the last migration that was run.

**currentVersion**

—

`knex.migrate.currentVersion([config])`

Retrieves and returns the current migration version, as a promise. If there aren't any migrations run yet, returns "none" as the value for the currentVersion.

**list**

—

`knex.migrate.list([config])`

Will return list of completed and pending migrations

**unlock**

—

`knex.migrate.forceFreeMigrationsLock([config])`

Forcibly unlocks the migrations lock table, and ensures that there is only one row in it.

### Notes about locks

A lock system is there to prevent multiple processes from running the same migration batch in the same time. When a batch of migrations is about to be run, the migration system first tries to get a lock using a `SELECT ... FOR UPDATE` statement (preventing race conditions from happening). If it can get a lock, the migration batch will run. If it can't, it will wait until the lock is released.

Please note that if your process unfortunately crashes, the lock will have to be _manually_ removed with `knex migrate:unlock` in order to let migrations run again.

The locks are saved in a table called "`tableName`\_lock"; it has a column called `is_locked` that `knex migrate:unlock` sets to `0` in order to release the lock. The `index` column in the lock table exists for compatibility with some database clusters that require a primary key, but is otherwise unused. There must be only one row in this table, or an error will be thrown when running migrations: "Migration table is already locked". Run `knex migrate:unlock` to ensure that there is only one row in the table.

### Custom migration sources

Knex supports custom migration sources, allowing you full control of where your migrations come from. This can be useful for custom folder structures, when bundling with webpack/browserify and other scenarios.

```

class MyMigrationSource {
  
  
  
  getMigrations() {
    
    return Promise.resolve(['migration1'])
  }

  getMigrationName(migration) {
    return migration;
  }

  getMigration(migration) {
    switch(migration) {
      case 'migration1':
        return {
          up(knex)   { 
```

#### Webpack migration source example

An example of how to create a migration source where migrations are included in a webpack bundle.

```js
const path = require('path')

class WebpackMigrationSource {
  constructor(migrationContext) {
    this.migrationContext = migrationContext
  }

  getMigrations() {
    return Promise.resolve(this.migrationContext.keys().sort())
  }

  getMigrationName(migration) {
    return path.parse(migration).base
  }

  getMigration(migration) {
    return this.migrationContext(migration)
  }
}


knex.migrate.latest({
  migrationSource: new WebpackMigrationSource(require.context('./migrations', false, /.js$/))
})




knex.migrate.latest({
  migrationSource: new WebpackMigrationSource(require.context('./migrations', false, /^\.\/.*\.js$/))
})
```

### ECMAScript modules (ESM) Interoperability

ECMAScript Module support for knex CLI's configuration, migration and seeds  
enabled by the `--esm` flag, ECMAScript Interoperability is provided by the [_'esm'_](https://github.com/standard-things/esm) module.  
You can find [here](https://github.com/standard-things/esm) more information about 'esm' superpowers.

Node 'mjs' files are handled by NodeJS own import mechanics  
and do not require the use of the '--esm' flag.  
But you might need it anyway for Node v10 under certain scenarios.  
You can find details about NodeJS ECMAScript modules [here](https://nodejs.org/api/esm.html)

While it is possible to mix and match different module formats (extensions)  
between your knexfile, seeds and migrations,  
some format combinations will require specific NodeJS versions,  
_Notably mjs/cjs files will follow NodeJS import and require restrictions._  
You can see [here](https://github.com/knex/knex/blob/master/test/cli/esm-interop.spec.js) many possible scenarios,  
and [here](https://github.com/knex/knex/tree/master/test/jake-util/knexfile-imports) some sample configurations

Node v10.\* require the use of the '--experimental-module' flag in order to use the 'mjs' or 'cjs' extension.

```
# launching knex on Node v10 to use mjs/cjs modules
node --experimental-modules ./node_modules/.bin/knex $@
```

When using migration and seed files with '.cjs' or '.mjs' extensions, you will need to specify that explicitly:

```

export default {      
  migrations: {
    
    directory: './migrations',
    loadExtensions: ['.mjs'] 
  }
}
```

When using '.mjs' extensions for your knexfile and '.js' for the seeds/migrations, you will need to specify that explicitly.

```

export default {      
  migrations: {
    
    directory: './migrations',
    loadExtensions: ['.js'] 
  }
}
```

For the knexfile you can use a default export,  
it will take precedence over named export.

```
        
export default {
  client: 'sqlite3',
  connection: {
    filename: '../test.sqlite3',
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
}
```

```

const config = {
  client: 'sqlite3',
  connection: {
    filename: '../test.sqlite3',
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default config;

export const { client, connection, migrations, seeds } = config;
```

Seed an migration files need to follow Knex conventions

```


export function seed(next) {
  
}
```

```


export function up(knex) {
  
}
export function down(knex) {

}
```
