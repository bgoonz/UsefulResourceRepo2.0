# rethink-odm

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

[![Build Status](https://travis-ci.org/neoziro/rethink-odm.svg?branch=master)](https://travis-ci.org/neoziro/rethink-odm)
[![Dependency Status](https://david-dm.org/neoziro/rethink-odm.svg?theme=shields.io)](https://david-dm.org/neoziro/rethink-odm)
[![devDependency Status](https://david-dm.org/neoziro/rethink-odm/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/rethink-odm#info=devDependencies)

Simple Object Document Mapper for RethinkDB.

## Install

```
npm install rethink-odm
```

## Usage

```js
var ro = require('rethink-odm')();

// Run command without waiting connection to be ready.
ro.run(ro.r.now()).then(function (now) {
  // ...
});

// Create the model "User".
var User = ro.createModel({
  tableName: 'users'
});

// Create a new User.
var user = new User({
  name: 'Johnny'
});

// Create model.
user.create().then(function (user) {
  // ...
});

```

### rethinkOdm(options) / rethinkOdm.createClient(options)

Create a new rethinkOdm client. To know avalaible options, please refer to [rethinkdb documentation](http://rethinkdb.com/api/javascript/connect/).

```js
var ro = rethinkOdm({host: 'localhost'});
```

#### Events

##### error

Emitted when an error occurs in the connection.

```js
ro.on('error', function (err) {});
```

##### connect

Emitted when the client is connected.

```js
ro.on('connect', function () {});
```

##### close

Emmited when the connection is closed.

```js
ro.on('close', function () {});
```

### ro.r

Expose the rethinkdb module.

```js
ro.r.now();
```

### ro.run(command, [cb])

Run a command using the internal rethink odm connection. The advantage is that you don't have to wait connection to be ready.

```js
ro.run(ro.r.now()).then(function (now) {
  // ... 
});
```

### ro.createModel(options)

Create a new model.

- tableName: Name of the table
- hooks: Hooks

```js
var User = ro.createModel({tableName: 'users'});
```

#### Hooks

It's possible to add some hooks, hook are some listeners automatically applied at initialization.

```js
var User = ro.createModel({
  tableName: 'users',
  hooks: {
    insert: function () {
      if (! this.email) throw new Error('Email is required');
    }
  }
});
```


### Model.table()

Return the table linked to the model.

```js
ro.run(User.table().get('1a487dc0-f6ec-11e3-a3ac-0800200c9a66'));
```

### new Model([data])

Create a new instance of the model.

```js
var user = new User({name: 'Johnny'});
```

### model.insert([cb])

Insert the model.

```js
var user = new User({name: 'Johnny'});
user.insert().then(function (user) {
  // ...
});
```

#### Events

##### insert

Emitted before the insert.

```js
model.on('insert', function (model) {});
```

##### inserted

Emitted after the insert.

```js
model.on('inserted', function (model) {});
```

### model.update([data], [cb])

Update the model.

```js
var user = new User({
  id: '1a487dc0-f6ec-11e3-a3ac-0800200c9a66',
  name: 'Johnny'
});
user.update().then(function (user) {
  // ...
});
```

#### Events

##### update

Emitted before the update.

```js
model.on('update', function (model, data) {});
```

##### updated

Emitted after the update.

```js
model.on('updated', function (model, data) {});
```

### model.delete([cb])

Delete the model.

```js
var user = new User({id: '1a487dc0-f6ec-11e3-a3ac-0800200c9a66'});
user.delete().then(function () {
  // ...
});
```

#### Events

##### delete

Emitted before the deletion.

```js
model.on('delete', function (model) {});
```

##### deleted

Emitted after the deletion.

```js
model.on('deleted', function (model) {});
```

## License

MIT
