# Node Postgres tutorial - PostgreSQL programming in JavaScript with node-postgres module

> The Node Postgres tutorial shows how to work 
with PostgreSQL database in JavaScript with node-postgres.

last modified July 7, 2020

The Node Postgres tutorial shows how to work with PostgreSQL database in JavaScript with node-postgres.

The node-postgres
-----------------

The node-postgres is a collection of Node.js modules for interfacing with the PostgreSQL database. It has support for callbacks, promises, async/await, connection pooling, prepared statements, cursors, and streaming results.

In our examples we also use the Ramda library. See [Ramda tutorial](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/javascript/ramda/) for more information.

Setting up node-postgres
------------------------

First, we install node-postgres.

$ node -v
v11.5.0

We use Node version 11.5.0.

$ npm init -y

We initiate a new Node application.

$ npm i pg

We install node-postgres with `nmp i pg`.

$ npm i ramda

In addition, we install Ramda for beautiful work with data.

cars.sql

DROP TABLE IF EXISTS cars;

CREATE TABLE cars(id SERIAL PRIMARY KEY, name VARCHAR(255), price INT);
INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

In some of the examples, we use this `cars` table.

The node-postgres first example
-------------------------------

In the first example, we connect to the PostgreSQL database and return a simple SELECT query result.

first.js

const pg = require('pg');
const R = require('ramda');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

const client = new pg.Client(cs);
client.connect();

client.query('SELECT 1 + 4').then(res => {

    const result = R.head(R.values(R.head(res.rows)));

    console.log(result);
}).finally(() => client.end());

The example connects to the database and issues a SELECT statement.

const pg = require('pg');
const R = require('ramda');

We include the `pg` and `ramda` modules.

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

This is the PostgreSQL connection string. It is used to build a connection to the database.

const client = new pg.Client(cs);
client.connect();

A client is created. We connect to the database with `connect()`.

client.query('SELECT 1 + 4').then(res => {

    const result = R.head(R.values(R.head(res.rows)));

    console.log(result);
}).finally(() => client.end());

We issue a simple SELECT query. We get the result and output it to the console. The `res.rows` is an array of objects; we use Ramda to get the returned scalar value. In the end, we close the connection with `end()`.

$ node first.js
5

This is the output.

The node-postgres column names
------------------------------

In the following example, we get the columns names of a database.

column\_names.js

const pg = require('pg');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

const client = new pg.Client(cs);

client.connect();

client.query('SELECT \* FROM cars').then(res => {

    const fields = res.fields.map(field => field.name);

    console.log(fields);

}).catch(err => {
    console.log(err.stack);
}).finally(() => {
    client.end()
});

The column names are retrieved with `res.fields` attribute. We also use the `catch` clause to output potential errors.

$ node column\_names.js
\[ 'id', 'name', 'price' \]

The output shows three column names of the `cars` table.

Selecting all rows
------------------

In the next example, we select all rows from the database table.

all\_rows.js

const pg = require('pg');
const R = require('ramda');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

const client = new pg.Client(cs);

client.connect();

client.query('SELECT \* FROM cars').then(res => {

    const data = res.rows;

    console.log('all data');
    data.forEach(row => {
        console.log(\`Id: ${row.id} Name: ${row.name} Price: ${row.price}\`);
    })

    console.log('Sorted prices:');
    const prices = R.pluck('price', R.sortBy(R.prop('price'), data));
    console.log(prices);

}).finally(() => {
    client.end()
});

The example outputs all rows from the `cars` table and a sorted list of car prices.

$ node all\_rows.js
all data
Id: 1 Name: Audi Price: 52642
Id: 2 Name: Mercedes Price: 57127
Id: 3 Name: Skoda Price: 9000
Id: 4 Name: Volvo Price: 29000
Id: 5 Name: Bentley Price: 350000
Id: 6 Name: Citroen Price: 21000
Id: 7 Name: Hummer Price: 41400
Id: 8 Name: Volkswagen Price: 21600
Sorted prices:
\[ 9000, 21000, 21600, 29000, 41400, 52642, 57127, 350000 \]

This is the output.

The node-postgres parameterized query
-------------------------------------

Parameterized queries use placeholders instead of directly writing the values into the statements. Parameterized queries increase security and performance.

parameterized.js

const pg = require('pg');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

const client = new pg.Client(cs);

client.connect();

const sql = 'SELECT \* FROM cars WHERE price > $1';
const values = \[50000\];

client.query(sql, values).then(res => {

    const data = res.rows;

    data.forEach(row => console.log(row));

}).finally(() => {
    client.end()
});

The example uses a parameterized query in a simple SELECT statement.

const sql = 'SELECT \* FROM cars WHERE price > $1';

This is the SELECT query. The `$1` is a placeholder which is later replaced with a value in a secure way.

const values = \[50000\];

These are the values to be inserted into the parameterized query.

client.query(sql, values).then(res => {

The values are passed to the `query()` method as the second parameter.

$ node parameterized.js
{ id: 1, name: 'Audi', price: 52642 }
{ id: 2, name: 'Mercedes', price: 57127 }
{ id: 5, name: 'Bentley', price: 350000 }

This is the output.

The node-postgres with async/await
----------------------------------

Node Postgres supports the async/await syntax.

async\_await.js

const pg = require('pg');
const R = require('ramda');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

async function fetchNow() {

    const client = new pg.Client(cs);

    try {
        await client.connect();

        let result = await client.query('SELECT now()');
        return R.prop('now', R.head(result.rows));
    } finally {
        client.end()
    }
}

fetchNow().then(now => console.log(now));

The example outputs the result of a `SELECT now()` query with async/await.

$ node async\_await.js
2019-02-17T11:53:01.447Z

This is the output.

The node-postgres rowmode
-------------------------

By default, node-postgres returns data as an array of objects. We can tell node-postgres to return the data as an array of arrays.

row\_mode.js

const pg = require('pg');
const R = require('ramda');

const cs = 'postgres://postgres:s$cret@localhost:5432/ydb';

const client = new pg.Client(cs);

client.connect();

const query = {
    text: 'SELECT \* FROM cars',
    rowMode: 'array'
};

client.query(query).then(res => {

    const data = res.rows;

    console.log('all data');
    data.forEach(row => {
        console.log(\`Id: ${row\[0\]} Name: ${row\[1\]} Price: ${row\[2\]}\`);
    })

    console.log('Sorted prices:');

    const prices = data.map(x => x\[2\]);

    const sorted = R.sort(R.comparator(R.lt), prices);
    console.log(sorted);

}).finally(() => {
    client.end()
});

The example shows all rows from the `cars` table. It enables the array row mode.

const query = {
    text: 'SELECT \* FROM cars',
    rowMode: 'array'
};

We use the configuration object where we set the `rowMode` to `array`.

console.log('all data');
data.forEach(row => {
    console.log(\`Id: ${row\[0\]} Name: ${row\[1\]} Price: ${row\[2\]}\`);
})

Now we loop over an array of arrays.

$ node row\_mode.js
all data
Id: 1 Name: Audi Price: 52642
Id: 2 Name: Mercedes Price: 57127
Id: 3 Name: Skoda Price: 9000
Id: 4 Name: Volvo Price: 29000
Id: 5 Name: Bentley Price: 350000
Id: 6 Name: Citroen Price: 21000
Id: 7 Name: Hummer Price: 41400
Id: 8 Name: Volkswagen Price: 21600
Sorted prices:
\[ 9000, 21000, 21600, 29000, 41400, 52642, 57127, 350000 \]

This is the output.

The node-postgres pooling example
---------------------------------

Connection pooling improves performance of a database application. It is especially useful web applications.

pooled.js

const pg = require('pg');

var config = {
    user: 'postgres',
    password: 's$cret',
    database: 'ydb'
}

const pool = new pg.Pool(config);

pool.connect()
    .then(client => {
        return client.query('SELECT \* FROM cars WHERE id = $1', \[1\])
            .then(res => {
                client.release();
                console.log(res.rows\[0\]);
            })
            .catch(e => {
                client.release();
                console.log(e.stack);
            })
  }).finally(() => pool.end());

The example shows how to set up an example which uses connection pooling. When we are done with a query, we call the `client.release()` method to return the connection to the pool.

}).finally(() => pool.end());

The `pool.end()` drains the pool of all active clients, disconnect them, and shut down any internal timers in the pool. This is used in scripts such as this example. In web applications, we can call it when the web server shuts down or don't call it at all.

In this tutorial, we have used `node-postgres` to interact with PostgreSQL in Node.js.

List [all JavaScript tutorials](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/all/#js).


[Source](https://zetcode.com/javascript/nodepostgres/)